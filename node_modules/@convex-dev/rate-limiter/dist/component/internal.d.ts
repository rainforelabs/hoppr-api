import { type RateLimitArgs, type RateLimitConfig, type RateLimitReturns } from "../shared.js";
import type { Doc } from "./_generated/dataModel.js";
import type { DatabaseReader } from "./_generated/server.js";
export declare const MIN_CHOOSE_TWO = 3;
export declare function checkRateLimitOrThrow(db: DatabaseReader, args: RateLimitArgs): Promise<{
    status: RateLimitReturns;
    updates: {
        existing: Doc<"rateLimits"> | null;
        value: number;
        ts: number;
        shard: number;
    }[];
}>;
export declare function configWithDefaults(config: RateLimitConfig): {
    shards: number;
    capacity: number;
    maxReserved?: number | undefined;
    start?: null | undefined;
    kind: "token bucket";
    rate: number;
    period: number;
} | {
    shards: number;
    capacity: number;
    maxReserved?: number | undefined;
    start?: number | undefined;
    kind: "fixed window";
    rate: number;
    period: number;
};
export declare function getShard(db: DatabaseReader, name: string, key: string | undefined, shard: number): Promise<{
    _id: import("convex/values").GenericId<"rateLimits">;
    _creationTime: number;
    key?: string | undefined;
    name: string;
    value: number;
    ts: number;
    shard: number;
} | null>;
export declare function _checkRateLimitInternal(existing: {
    value: number;
    ts: number;
} | null, config: RateLimitConfig, count?: number, reserve?: boolean): {
    status: {
        readonly ok: false;
        readonly retryAfter: number;
    };
    value: number;
    ts: number;
} | {
    status: {
        readonly ok: true;
        readonly retryAfter: number | undefined;
    };
    value: number;
    ts: number;
};
//# sourceMappingURL=internal.d.ts.map