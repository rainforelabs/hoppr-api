import { v } from "convex/values";

export const activityValidator = v.object({
    name: v.string(),
    description: v.string(),
    category: v.union(
        v.literal("culture"),
        v.literal("food"),
        v.literal("nature"),
        v.literal("entertainment"),
        v.literal("shopping"),
    ),
    address: v.string(),
});

export const preferencesValidator = v.object({
    style: v.union(
        v.literal("adventure"),
        v.literal("cultural"),
        v.literal("relaxation"),
        v.literal("nature"),
        v.literal("nightlife"),
    ),
    budget: v.union(
        v.literal("budget"),
        v.literal("moderate"),
        v.literal("luxury"),
    ),
    group: v.union(
        v.literal("solo"),
        v.literal("couple"),
        v.literal("family"),
        v.literal("friends"),
    ),
    pace: v.union(
        v.literal("slow"),
        v.literal("moderate"),
        v.literal("packed"),
    ),
});

export const itineraryValidator = v.array(
    v.object({
        day: v.number(),
        morning: activityValidator,
        afternoon: activityValidator,
        evening: activityValidator,
    }),
);
