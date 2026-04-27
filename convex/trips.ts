import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { itineraryValidator, preferencesValidator } from "./validators";

export const insert = mutation({
    args: {
        deviceId: v.string(),
        destination: v.string(),
        duration: v.number(),
        preferences: preferencesValidator,
        itinerary: itineraryValidator,
        createdAt: v.number(),
    },
    handler: async (ctx, args) => ctx.db.insert("trips", args),
});

export const tripsByDevice = query({
    args: { deviceId: v.string() },
    handler: (ctx, { deviceId }) =>
        ctx.db
            .query("trips")
            .withIndex("by_device", (q) => q.eq("deviceId", deviceId))
            .order("desc")
            .take(20),
});

export const tripById = query({
    args: { tripId: v.id("trips") },
    handler: (ctx, { tripId }) => ctx.db.get(tripId),
});
