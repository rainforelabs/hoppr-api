import type { FunctionReference } from "convex/server";
import { type GetValueArgs, type GetValueReturns, type RateLimitConfig } from "../shared.js";
export type UseRateLimitOptions = {
    name?: string;
    key?: string;
    count?: number;
    sampleShards?: number;
    getServerTimeMutation?: GetServerTimeMutation;
    config?: RateLimitConfig;
};
export type GetRateLimitValueQuery = FunctionReference<"query", "public", GetValueArgs, GetValueReturns>;
export type GetServerTimeMutation = FunctionReference<"mutation", "public", Record<string, never>, number>;
/**
 * A hook for using rate limits in React components.
 * This hook provides information about the current rate limit status,
 * including the ability to check if an action is allowed and when it can be retried.
 *
 * @param getRateLimitQuery The query function returned by rateLimiter.getter().getRateLimit
 * @param getServerTimeMutation A mutation that returns the current server time (Date.now())
 * @param sampleShards Optional number of shards to sample (default: 1)
 * @returns An object containing:
 *   - status: The current status of the rate limit (ok, retryAt)
 *     If the rate limit value is below the count (or 0 if unspecified), the
 *     retryAt will be set to the time when the client can retry.
 *   - checkValue: A function that returns the current value of the rate limit
 */
export declare function useRateLimit(getRateLimitValueQuery: GetRateLimitValueQuery, opts?: UseRateLimitOptions): {
    status: undefined;
    check: (ts?: number, count?: number) => {
        value: number;
        ts: number;
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
        shard: number;
        ok: boolean;
        retryAt: number | undefined;
    } | undefined;
} | {
    status: {
        ok: false;
        retryAt: number;
    };
    check: (ts?: number, count?: number) => {
        value: number;
        ts: number;
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
        shard: number;
        ok: boolean;
        retryAt: number | undefined;
    } | undefined;
} | {
    status: {
        ok: true;
        retryAt: undefined;
    };
    check: (ts?: number, count?: number) => {
        value: number;
        ts: number;
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
        shard: number;
        ok: boolean;
        retryAt: number | undefined;
    } | undefined;
};
//# sourceMappingURL=index.d.ts.map