import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { itineraryValidator, preferencesValidator } from "./validators";

export default defineSchema({
    trips: defineTable({
        deviceId: v.string(),
        destination: v.string(),
        duration: v.number(),
        preferences: preferencesValidator,
        itinerary: itineraryValidator,
        createdAt: v.number(),
    }).index("by_device", ["deviceId"]),
});
