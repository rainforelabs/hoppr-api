/**
 * A simple mutation that returns the current server time.
 * This is used by the useRateLimit hook to calculate clock skew.
 *
 * @returns The current server time (Date.now())
 */
export declare const getServerTime: import("convex/server").RegisteredMutation<"public", {}, Promise<number>>;
//# sourceMappingURL=time.d.ts.map