export declare const rateLimit: import("convex/server").RegisteredMutation<"public", {
    key?: string | undefined;
    count?: number | undefined;
    reserve?: boolean | undefined;
    throws?: boolean | undefined;
    name: string;
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
}, Promise<{
    retryAfter?: number | undefined;
    ok: true;
} | {
    ok: false;
    retryAfter: number;
}>>;
export declare const checkRateLimit: import("convex/server").RegisteredQuery<"public", {
    key?: string | undefined;
    count?: number | undefined;
    reserve?: boolean | undefined;
    throws?: boolean | undefined;
    name: string;
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
}, Promise<{
    retryAfter?: number | undefined;
    ok: true;
} | {
    ok: false;
    retryAfter: number;
}>>;
export declare const getValue: import("convex/server").RegisteredQuery<"public", {
    key?: string | undefined;
    sampleShards?: number | undefined;
    name: string;
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
}, Promise<{
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
}>>;
export declare const resetRateLimit: import("convex/server").RegisteredMutation<"public", {
    key?: string | undefined;
    name: string;
}, Promise<void>>;
export declare const clearAll: import("convex/server").RegisteredMutation<"public", {
    before?: number | undefined;
}, Promise<void>>;
export { getServerTime } from "./time.js";
//# sourceMappingURL=lib.d.ts.map