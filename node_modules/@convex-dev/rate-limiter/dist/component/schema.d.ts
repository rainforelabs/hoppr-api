declare const _default: import("convex/server").SchemaDefinition<{
    rateLimits: import("convex/server").TableDefinition<import("convex/values").VObject<{
        key?: string | undefined;
        name: string;
        value: number;
        ts: number;
        shard: number;
    }, {
        name: import("convex/values").VString<string, "required">;
        key: import("convex/values").VString<string | undefined, "optional">;
        shard: import("convex/values").VFloat64<number, "required">;
        value: import("convex/values").VFloat64<number, "required">;
        ts: import("convex/values").VFloat64<number, "required">;
    }, "required", "name" | "key" | "value" | "ts" | "shard">, {
        name: ["name", "key", "shard", "_creationTime"];
    }, {}, {}>;
}, true>;
export default _default;
//# sourceMappingURL=schema.d.ts.map