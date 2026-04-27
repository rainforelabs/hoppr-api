import { v } from "convex/values";
/**
 * A token bucket limits the rate of requests by continuously adding tokens to
 * be consumed when servicing requests.
 * The `rate` is the number of tokens added per `period`.
 * The `capacity` is the maximum number of tokens that can accumulate.
 * The `maxReserved` is the maximum number of tokens that can be reserved ahead
 * of time.
 */
export const tokenBucketValidator = v.object({
    kind: v.literal("token bucket"),
    rate: v.number(),
    period: v.number(),
    capacity: v.optional(v.number()),
    maxReserved: v.optional(v.number()),
    shards: v.optional(v.number()),
    start: v.optional(v.null()),
});
/**
 * A fixed window rate limit limits the rate of requests by adding a set number
 * of tokens (the `rate`) at the start of each fixed window of time (the
 * `period`) up to a maxiumum number of tokens (the `capacity`).
 * Requests consume tokens (1 by default).
 * The `start` determines what the windows are relative to in utc time.
 * If not provided, it will be a random number between 0 and `period`.
 */
export const fixedWindowValidator = v.object({
    kind: v.literal("fixed window"),
    rate: v.number(),
    period: v.number(),
    capacity: v.optional(v.number()),
    maxReserved: v.optional(v.number()),
    shards: v.optional(v.number()),
    start: v.optional(v.number()),
});
export const configValidator = v.union(tokenBucketValidator, fixedWindowValidator);
/**
 * Arguments for rate limiting.
 * @param name The name of the rate limit.
 * @param key The key to use for the rate limit. If not provided, the rate limit
 * is a single shared value.
 * @param count The number of tokens to consume. Defaults to 1.
 * @param reserve Whether to reserve the tokens ahead of time. Defaults to false.
 * @param throws Whether to throw an error if the rate limit is exceeded.
 * By default, check/consume will just return { ok: false, retryAfter: number }.
 * @param config The rate limit configuration, if specified inline.
 * If you use {@link defineRateLimits} to define the named rate limit, you don't
 * specify the config inline.
 */
export const rateLimitArgs = {
    name: v.string(),
    key: v.optional(v.string()),
    count: v.optional(v.number()),
    reserve: v.optional(v.boolean()),
    throws: v.optional(v.boolean()),
    config: configValidator,
    // TODO: allow specifying the shard to use here
};
export const rateLimitReturns = v.union(v.object({
    ok: v.literal(true),
    retryAfter: v.optional(v.number()),
}), v.object({
    ok: v.literal(false),
    // TODO: include the shard here they should retry with
    retryAfter: v.number(),
}));
export const getValueArgs = v.object({
    name: v.optional(v.string()),
    key: v.optional(v.string()),
    sampleShards: v.optional(v.number()),
    config: v.optional(configValidator),
});
export const getValueReturns = v.object({
    value: v.number(),
    ts: v.number(),
    shard: v.number(),
    config: configValidator,
});
/**
 * Calculate rate limit values based on the current state and configuration.
 * This function is exported so it can be used in both client and server code.
 */
export function calculateRateLimit(existing, config, now = Date.now(), count = 0) {
    const max = config.capacity ?? config.rate;
    const state = existing ?? {
        value: max,
        ts: config.kind === "fixed window"
            ? config.start ?? now - Math.floor(Math.random() * config.period)
            : now,
    };
    let ts;
    let value;
    let retryAfter = undefined;
    let windowStart = undefined;
    if (config.kind === "token bucket") {
        const elapsed = now - state.ts;
        const rate = config.rate / config.period;
        value = Math.min(state.value + elapsed * rate, max) - count;
        ts = now;
        if (value < 0) {
            retryAfter = -value / rate;
        }
    }
    else {
        windowStart = state.ts;
        const elapsedWindows = Math.floor((now - state.ts) / config.period);
        const rate = config.rate;
        value = Math.min(state.value + rate * elapsedWindows, max) - count;
        ts = state.ts + elapsedWindows * config.period;
        if (value < 0) {
            const windowsNeeded = Math.ceil(-value / rate);
            retryAfter = ts + config.period * windowsNeeded - now;
        }
    }
    return { value, ts, retryAfter, windowStart };
}
//# sourceMappingURL=shared.js.map