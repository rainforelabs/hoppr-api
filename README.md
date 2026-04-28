# Hoppr API

Backend API for [Hoppr App](https://github.com/rainforelabs/hoppr), an AI trip itinerary planner.

---

## Overview

Hoppr API enables clients to generate and fetch trip itineraries via RESTful API endpoints built on top of Convex.
- **Itinerary generation** leverages Google Gemini 3 Flash (LLM) for rich, context-aware suggestions.
- **Data partitioning** is by device. All data is isolated per deviceId.
- **No user authentication** is currently required. All access is rate-limited per device.

---

## Table of Contents

- [Architecture](#architecture)
- [Endpoints](#endpoints)
- [Data Model](#data-model)
- [Itinerary Generation & Validation](#itinerary-generation--validation)
- [Rate Limiting](#rate-limiting)
- [Environment & Deployment](#environment--deployment)
- [Development](#development)
- [Testing](#testing)
- [References](#references)

---

## Architecture

- **Backend:** [Convex](https://convex.dev/) — code lives in [`convex/`](./convex/)
- **LLM Integration:** [Google Gemini 3 Flash](https://deepmind.google/models/gemini/flash/)
- **Endpoints:** Implemented as Convex [HTTP Actions](https://docs.convex.dev/functions/http-actions) in [`convex/http.ts`](./convex/http.ts)
- **Domain Logic:** Itinerary building logic lives in [`convex/lib/genai.ts`](./convex/lib/genai.ts)
- **Rate Limiting:** Provided by [`@convex-dev/rate-limiter`](https://www.npmjs.com/package/@convex-dev/rate-limiter) (configured in [`convex/ratelimiter.ts`](./convex/ratelimiter.ts))
- **Schema and Validation:** All inputs/outputs validated in [`convex/validators.ts`](./convex/validators.ts) and [`convex/schema.ts`](./convex/schema.ts)

---

## Endpoints

### POST `/generate`

Generate a multi-day trip itinerary by destination, preferences, and duration.

- **Body:**  
    ```json
    {
      "deviceId": "string",      // required
      "destination": "string",   // required
      "duration": 3,             // required, integer > 0 (days)
      "preferences": {           // required, see below for options
        "style": "adventure" | "cultural" | "relaxation" | "nature" | "nightlife",
        "budget": "budget" | "moderate" | "luxury",
        "group": "solo" | "couple" | "family" | "friends",
        "pace": "slow" | "moderate" | "packed"
      }
    }
    ```
- **Returns:**  
    200 OK with the new trip itinerary object.  
    Example:
    ```json
    {
      "_id": "<ConvexId>",
      "deviceId": "string",
      "destination": "Osaka, Japan",
      "duration": 5,
      "preferences": { ... },
      "itinerary": [
        {
          "day": 1,
          "morning": { "name": "...", "description": "...", ... },
          "afternoon": { ... },
          "evening": { ... }
        }
        // more days...
      ],
      "createdAt": 1710000000000
    }
    ```
- **Errors:**
    - `400`: Missing required fields
    - `429`: Rate limit exceeded (`{ error: "...", retryAfter: <seconds> }`)
- **Notes:**
    - All arguments validated for type and allowed values.
    - Will save the generated itinerary immediately under this device.

---

### GET `/trips?deviceId=...`

Return (most recent up to 20) itineraries for a given device.

- **Query parameter:**  
  `deviceId` (required)
- **Returns:**  
    200 OK array of trip objects (see above).
- **Errors:**
    - `400`: Missing deviceId
    - `429`: Rate limit exceeded

---

## Data Model

Defined via [`convex/schema.ts`](./convex/schema.ts).

Single table: `trips`

| Field       | Type                      | Description                                          |
| :---------- | :------------------------ | :--------------------------------------------------- |
| deviceId    | string                    | Required; Device in which the itinerary was created  |
| destination | string                    | Required; City or region for the itinerary           |
| duration    | number                    | Required; Number of days                             |
| preferences | object                    | Required; See above                                  |
| itinerary   | array<DayPlan>            | Required; Output of LLM, validated                   |
| createdAt   | number (ms since epoch)   | Required; Creation timestamp                         |

See [`convex/validators.ts`](./convex/validators.ts) for the detailed itinerary and preferences schema.

**Day plan validator:**
```json
{
  "day": 1,
  "morning": { "name": "...", "description": "...", "category": "...", "address": "..." },
  "afternoon": { ... },
  "evening": { ... }
}
```

---

## Itinerary Generation & Validation

- Generation handled in [`convex/lib/genai.ts`](./convex/lib/genai.ts) via Google Gemini 3 Flash.
- Prompts and schemas are strict: only specific, geocodable place names and addresses.
- `generateItinerary()` returns a DayPlan[] struct, JSON-parsed from Gemini output.
- All AI output is type-checked before being saved.

---

## Rate Limiting

Set in [`convex/ratelimiter.ts`](./convex/ratelimiter.ts):

| Action         | Limit per device (per hour) |
| :------------- | --------------------------: |
| generateTrip   | 10                          |
| fetchTrips     | 100                         |

If exceeded, endpoints return HTTP 429 with a retryAfter value.

---

## Environment & Deployment

- **Prerequisites:** Node.js 18+, `@google/genai` NPM package, Convex CLI
- **API Key:** Set GEMINI_API_KEY for Google AI Studio in your Convex project environment variables.
- **Convex config:** Pre-wired for [rate-limiter component](./convex/convex.config.ts)

```bash
npx convex dev            # Deploy to Convex cloud (hot-reload)
```

---

## Development

- **Endpoints:** [`convex/http.ts`](./convex/http.ts)
- **Trip DB Queries:** [`convex/trips.ts`](./convex/trips.ts)
- **Validation:** [`convex/validators.ts`](./convex/validators.ts)
- **Schema:** [`convex/schema.ts`](./convex/schema.ts)
- **LLM Logic:** [`convex/lib/genai.ts`](./convex/lib/genai.ts)

See [Convex function & HTTP docs](https://docs.convex.dev/functions/http-actions) for more.

---

## Testing

You can test endpoints with curl, e.g.

```bash
curl -X POST <your-dep-url>/generate -H "Content-Type: application/json" -d '{
  "deviceId": "A1B2C3D4-5E6F-4789-ABCD-1234567890EF",
  "destination": "Tokyo, Japan",
  "duration": 5,
  "preferences": {
    "style": "cultural",
    "budget": "moderate",
    "group": "solo",
    "pace": "packed"
  }
}'
```

```bash
curl "<your-dep-url>/trips?deviceId=A1B2C3D4-5E6F-4789-ABCD-1234567890EF"
```

---

## References

- [Convex HTTP Actions](https://docs.convex.dev/functions/http-actions)
- [Convex Functions](https://docs.convex.dev/functions/overview)
- [convex/validators.ts](./convex/validators.ts)
- [convex/schema.ts](./convex/schema.ts)
- [convex/http.ts](./convex/http.ts)
- [Convex Rate Limiter Component](https://www.convex.dev/components/rate-limiter)
- [Google AI Studio Docs](https://ai.google.dev/gemini-api/docs)

---

## Support & Contact

- Open an issue for bugs, feature requests, or discussions.
- You can reach the team via [rainforelabs](https://github.com/rainforelabs).

---

## License

*Currently, no license file detected — please clarify licensing with the repository maintainers before reusing in commercial or open source projects.*

---

Built with ❤️ by [rainforelabs](https://github.com/rainforelabs)
