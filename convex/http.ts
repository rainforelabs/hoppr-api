import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { rateLimiter } from "./ratelimiter";
import { generateItinerary } from "./lib/genai";
import { api } from "./_generated/api";

const http = httpRouter();

// POST /generate
// Body: { deviceId, destination, duration, preferences }
http.route({
    path: "/generate",
    method: "POST",
    handler: httpAction(async (ctx, req) => {
        const {
            deviceId,
            destination,
            duration,
            preferences,
        } = await req.json();

        if (!deviceId || !destination || !duration || !preferences) {
            return new Response("Missing required fields", { status: 400 });
        }

        const { ok, retryAfter } = await rateLimiter
            .limit(ctx, "generateTrip", { key: deviceId });

        if (!ok) {
            return Response.json(
                { error: "Rate limit exceeded", retryAfter },
                { status: 429 },
            );
        }

        const itinerary = await generateItinerary(
            destination,
            duration,
            preferences,
        );

        const tripId = await ctx.runMutation(
            api.trips.insert,
            {
                deviceId,
                destination,
                duration,
                preferences,
                itinerary,
                createdAt: Date.now(),
            },
        );

        const trip = await ctx.runQuery(api.trips.tripById, { tripId });
        return Response.json(trip);
    }),
});

// GET /trips?deviceId=xxx
http.route({
    path: "/trips",
    method: "GET",
    handler: httpAction(async (ctx, req) => {
        const url = new URL(req.url);
        const deviceId = url.searchParams.get("deviceId");
        if (!deviceId) return new Response("Missing deviceId", { status: 400 });

        const { ok, retryAfter } = await rateLimiter
            .limit(ctx, "fetchTrips", { key: deviceId });

        if (!ok) {
            return Response.json(
                { error: "Rate limit exceeded", retryAfter },
                { status: 429 },
            );
        }

        const trips = await ctx.runQuery(api.trips.tripsByDevice, { deviceId });
        return Response.json(trips);
    }),
});

export default http;
