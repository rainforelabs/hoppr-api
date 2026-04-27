import type { Infer } from "convex/values";
/**
 * A token bucket limits the rate of requests by continuously adding tokens to
 * be consumed when servicing requests.
 * The `rate` is the number of tokens added per `period`.
 * The `capacity` is the maximum number of tokens that can accumulate.
 * The `maxReserved` is the maximum number of tokens that can be reserved ahead
 * of time.
 */
export declare const tokenBucketValidator: import("convex/values").VObject<{
    capacity?: number | undefined;
    maxReserved?: number | undefined;
    shards?: number | undefined;
    start?: null | undefined;
    kind: "token bucket";
    rate: number;
    period: number;
}, {
    kind: import("convex/values").VLiteral<"token bucket", "required">;
    rate: import("convex/values").VFloat64<number, "required">;
    period: import("convex/values").VFloat64<number, "required">;
    capacity: import("convex/values").VFloat64<number | undefined, "optional">;
    maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
    shards: import("convex/values").VFloat64<number | undefined, "optional">;
    start: import("convex/values").VNull<null | undefined, "optional">;
}, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">;
/**
 * A fixed window rate limit limits the rate of requests by adding a set number
 * of tokens (the `rate`) at the start of each fixed window of time (the
 * `period`) up to a maxiumum number of tokens (the `capacity`).
 * Requests consume tokens (1 by default).
 * The `start` determines what the windows are relative to in utc time.
 * If not provided, it will be a random number between 0 and `period`.
 */
export declare const fixedWindowValidator: import("convex/values").VObject<{
    capacity?: number | undefined;
    maxReserved?: number | undefined;
    shards?: number | undefined;
    start?: number | undefined;
    kind: "fixed window";
    rate: number;
    period: number;
}, {
    kind: import("convex/values").VLiteral<"fixed window", "required">;
    rate: import("convex/values").VFloat64<number, "required">;
    period: import("convex/values").VFloat64<number, "required">;
    capacity: import("convex/values").VFloat64<number | undefined, "optional">;
    maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
    shards: import("convex/values").VFloat64<number | undefined, "optional">;
    start: import("convex/values").VFloat64<number | undefined, "optional">;
}, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">;
export declare const configValidator: import("convex/values").VUnion<{
    capacity?: number | undefined;
    maxReserved?: number | undefined;
    shards?: number | undefined;
    start?: null | undefined;
    kind: "token bucket";
    rate: number;
    period: number;
} | {
    capacity?: number | undefined;
    maxReserved?: number | undefined;
    shards?: number | undefined;
    start?: number | undefined;
    kind: "fixed window";
    rate: number;
    period: number;
}, [import("convex/values").VObject<{
    capacity?: number | undefined;
    maxReserved?: number | undefined;
    shards?: number | undefined;
    start?: null | undefined;
    kind: "token bucket";
    rate: number;
    period: number;
}, {
    kind: import("convex/values").VLiteral<"token bucket", "required">;
    rate: import("convex/values").VFloat64<number, "required">;
    period: import("convex/values").VFloat64<number, "required">;
    capacity: import("convex/values").VFloat64<number | undefined, "optional">;
    maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
    shards: import("convex/values").VFloat64<number | undefined, "optional">;
    start: import("convex/values").VNull<null | undefined, "optional">;
}, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">, import("convex/values").VObject<{
    capacity?: number | undefined;
    maxReserved?: number | undefined;
    shards?: number | undefined;
    start?: number | undefined;
    kind: "fixed window";
    rate: number;
    period: number;
}, {
    kind: import("convex/values").VLiteral<"fixed window", "required">;
    rate: import("convex/values").VFloat64<number, "required">;
    period: import("convex/values").VFloat64<number, "required">;
    capacity: import("convex/values").VFloat64<number | undefined, "optional">;
    maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
    shards: import("convex/values").VFloat64<number | undefined, "optional">;
    start: import("convex/values").VFloat64<number | undefined, "optional">;
}, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">], "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">;
/**
 * One of the supported rate limits.
 * See {@link tokenBucketValidator} and {@link fixedWindowValidator} for more
 * information.
 */
export type RateLimitConfig = Infer<typeof tokenBucketValidator> | Infer<typeof fixedWindowValidator>;
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
export declare const rateLimitArgs: {
    name: import("convex/values").VString<string, "required">;
    key: import("convex/values").VString<string | undefined, "optional">;
    count: import("convex/values").VFloat64<number | undefined, "optional">;
    reserve: import("convex/values").VBoolean<boolean | undefined, "optional">;
    throws: import("convex/values").VBoolean<boolean | undefined, "optional">;
    config: import("convex/values").VUnion<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    } | {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    }, [import("convex/values").VObject<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    }, {
        kind: import("convex/values").VLiteral<"token bucket", "required">;
        rate: import("convex/values").VFloat64<number, "required">;
        period: import("convex/values").VFloat64<number, "required">;
        capacity: import("convex/values").VFloat64<number | undefined, "optional">;
        maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
        shards: import("convex/values").VFloat64<number | undefined, "optional">;
        start: import("convex/values").VNull<null | undefined, "optional">;
    }, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">, import("convex/values").VObject<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    }, {
        kind: import("convex/values").VLiteral<"fixed window", "required">;
        rate: import("convex/values").VFloat64<number, "required">;
        period: import("convex/values").VFloat64<number, "required">;
        capacity: import("convex/values").VFloat64<number | undefined, "optional">;
        maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
        shards: import("convex/values").VFloat64<number | undefined, "optional">;
        start: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">], "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">;
};
export type RateLimitArgs = {
    /** The name of the rate limit. */
    name: string;
    /** The key to use for the rate limit. If not provided, the rate limit
     * is a single shared value.  */
    key?: string;
    /**  The number of tokens to consume. Defaults to 1. */
    count?: number;
    /**  Whether to reserve the tokens ahead of time. Defaults to false. */
    reserve?: boolean;
    /**  Whether to throw an error if the rate limit is exceeded.
     * By default, check/consume will just return { ok: false, retryAfter: number }.
     */
    throws?: boolean;
    /** The rate limit configuration. See {@link RateLimitConfig}. */
    config: RateLimitConfig;
};
export declare const rateLimitReturns: import("convex/values").VUnion<{
    retryAfter?: number | undefined;
    ok: true;
} | {
    ok: false;
    retryAfter: number;
}, [import("convex/values").VObject<{
    retryAfter?: number | undefined;
    ok: true;
}, {
    ok: import("convex/values").VLiteral<true, "required">;
    retryAfter: import("convex/values").VFloat64<number | undefined, "optional">;
}, "required", "ok" | "retryAfter">, import("convex/values").VObject<{
    ok: false;
    retryAfter: number;
}, {
    ok: import("convex/values").VLiteral<false, "required">;
    retryAfter: import("convex/values").VFloat64<number, "required">;
}, "required", "ok" | "retryAfter">], "required", "ok" | "retryAfter">;
export type RateLimitReturns = Infer<typeof rateLimitReturns>;
export type RateLimitError = {
    kind: "RateLimited";
    name: string;
    retryAfter: number;
};
export declare const getValueArgs: import("convex/values").VObject<{
    name?: string | undefined;
    key?: string | undefined;
    sampleShards?: number | undefined;
    config?: {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    } | {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    } | undefined;
}, {
    name: import("convex/values").VString<string | undefined, "optional">;
    key: import("convex/values").VString<string | undefined, "optional">;
    sampleShards: import("convex/values").VFloat64<number | undefined, "optional">;
    config: import("convex/values").VUnion<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    } | {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    } | undefined, [import("convex/values").VObject<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    }, {
        kind: import("convex/values").VLiteral<"token bucket", "required">;
        rate: import("convex/values").VFloat64<number, "required">;
        period: import("convex/values").VFloat64<number, "required">;
        capacity: import("convex/values").VFloat64<number | undefined, "optional">;
        maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
        shards: import("convex/values").VFloat64<number | undefined, "optional">;
        start: import("convex/values").VNull<null | undefined, "optional">;
    }, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">, import("convex/values").VObject<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    }, {
        kind: import("convex/values").VLiteral<"fixed window", "required">;
        rate: import("convex/values").VFloat64<number, "required">;
        period: import("convex/values").VFloat64<number, "required">;
        capacity: import("convex/values").VFloat64<number | undefined, "optional">;
        maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
        shards: import("convex/values").VFloat64<number | undefined, "optional">;
        start: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">], "optional", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">;
}, "required", "name" | "key" | "sampleShards" | "config" | "config.kind" | "config.rate" | "config.period" | "config.capacity" | "config.maxReserved" | "config.shards" | "config.start">;
export type GetValueArgs = Infer<typeof getValueArgs>;
export declare const getValueReturns: import("convex/values").VObject<{
    config: {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    } | {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    };
    value: number;
    ts: number;
    shard: number;
}, {
    value: import("convex/values").VFloat64<number, "required">;
    ts: import("convex/values").VFloat64<number, "required">;
    shard: import("convex/values").VFloat64<number, "required">;
    config: import("convex/values").VUnion<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    } | {
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    }, [import("convex/values").VObject<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: null | undefined;
        kind: "token bucket";
        rate: number;
        period: number;
    }, {
        kind: import("convex/values").VLiteral<"token bucket", "required">;
        rate: import("convex/values").VFloat64<number, "required">;
        period: import("convex/values").VFloat64<number, "required">;
        capacity: import("convex/values").VFloat64<number | undefined, "optional">;
        maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
        shards: import("convex/values").VFloat64<number | undefined, "optional">;
        start: import("convex/values").VNull<null | undefined, "optional">;
    }, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">, import("convex/values").VObject<{
        capacity?: number | undefined;
        maxReserved?: number | undefined;
        shards?: number | undefined;
        start?: number | undefined;
        kind: "fixed window";
        rate: number;
        period: number;
    }, {
        kind: import("convex/values").VLiteral<"fixed window", "required">;
        rate: import("convex/values").VFloat64<number, "required">;
        period: import("convex/values").VFloat64<number, "required">;
        capacity: import("convex/values").VFloat64<number | undefined, "optional">;
        maxReserved: import("convex/values").VFloat64<number | undefined, "optional">;
        shards: import("convex/values").VFloat64<number | undefined, "optional">;
        start: import("convex/values").VFloat64<number | undefined, "optional">;
    }, "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">], "required", "kind" | "rate" | "period" | "capacity" | "maxReserved" | "shards" | "start">;
}, "required", "config" | "config.kind" | "config.rate" | "config.period" | "config.capacity" | "config.maxReserved" | "config.shards" | "config.start" | "value" | "ts" | "shard">;
export type GetValueReturns = Infer<typeof getValueReturns>;
/**
 * Calculate rate limit values based on the current state and configuration.
 * This function is exported so it can be used in both client and server code.
 */
export declare function calculateRateLimit(existing: {
    value: number;
    ts: number;
} | null, config: RateLimitConfig, now?: number, count?: number): {
    value: number;
    ts: number;
    retryAfter: number | undefined;
    windowStart: number | undefined;
};
//# sourceMappingURL=shared.d.ts.map