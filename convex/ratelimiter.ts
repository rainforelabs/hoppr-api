import { HOUR, RateLimiter } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

export const rateLimiter = new RateLimiter(components.rateLimiter, {
    generateTrip: { kind: "fixed window", rate: 10, period: HOUR },
    fetchTrips: { kind: "fixed window", rate: 100, period: HOUR },
});
