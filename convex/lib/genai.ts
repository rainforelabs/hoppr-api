import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

interface Activity {
    name: string;
    description: string;
    category: "culture" | "food" | "nature" | "entertainment" | "shopping";
    address: string;
}

interface DayPlan {
    day: number;
    morning: Activity;
    afternoon: Activity;
    evening: Activity;
}

interface Preferences {
    style: string;
    budget: string;
    group: string;
    pace: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class GeminiRateLimitError extends Error {
    constructor() {
        super("AI service is busy. Please wait a moment and try again.");
        this.name = "GeminiRateLimitError";
    }
}

const activitySchema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            description: "Specific, geocodable place name",
        },
        description: {
            type: "string",
            description: "1-2 sentence activity tip",
        },
        category: {
            type: "string",
            enum: ["culture", "food", "nature", "entertainment", "shopping"],
        },
        address: {
            type: "string",
            description: "Minimal geocodable address",
        },
    },
    required: ["name", "description", "category"],
    additionalProperties: false,
};

const itinerarySchema = {
    type: "object",
    properties: {
        days: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    day: {
                        type: "integer",
                        description: "Day number starting from 1",
                    },
                    morning: activitySchema,
                    afternoon: activitySchema,
                    evening: activitySchema,
                },
                required: ["day", "morning", "afternoon", "evening"],
                additionalProperties: false,
            },
        },
    },
    required: ["days"],
    additionalProperties: false,
};

export async function generateItinerary(
    destination: string,
    duration: number,
    preferences: Preferences,
): Promise<DayPlan[]> {
    try {
        const prompt = `
            You are a travel itinerary planner. Generate a ${duration}-day travel itinerary for ${destination}.

            TRIP PROFILE:
            - Style: ${preferences.style}
            - Budget: ${preferences.budget}
            - Group: ${preferences.group}
            - Pace: ${preferences.pace}

            RULES — follow every rule strictly:
            1. Use specific, geocodable place names only. Never use "hotel check-in", "arrive & settle", or any generic phrase as a name.
            2. Append city or district for any venue with multiple global locations (restaurants, cafes, hotels, shops, chain museums). Unique landmarks like "Eiffel Tower" or "Sagrada Familia" are exempt. 
               Good: "Mozaic Restaurant Ubud", "Park Hyatt Tokyo", "Blue Bottle Coffee Shinjuku"
               Bad: "Mozaic Restaurant", "Park Hyatt", "Blue Bottle Coffee"
            3. Every description must be a complete 1-2 sentence tip specific to that place. Never use placeholder text.
            4. Every activity must fit the trip profile — budget affects venue tier, pace affects how many details per slot, group affects suitability.
            5. Every "address" field must be a minimal, geocodable address for that specific venue.
               Format: street or area, district, city, country.
               Examples:
               - "Jl. Raya Ubud, Kelusa, Kec. Payangan, Kabupaten Gianyar, Bali, Indonesia"
               - "Tampaksiring, Gianyar Regency, Bali 80552"
               - "1-1 Yoyogikamizonocho, Shibuya, Tokyo 151-8557, Japan"
               - "1 Chome-6-18 Dotonbori, Chuo Ward, Osaka, 542-0071, Japan"
               Never use vague addresses like "Ubud, Bali" alone. Always include the street or area.

            CATEGORY GUIDE:
            culture = temples, museums, landmarks
            food = restaurants, markets, cafes
            nature = parks, gardens, outdoor spaces
            entertainment = shows, aquariums, theme parks
            shopping = markets, malls, boutiques
        `.trim();

        const res = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                temperature: 0.4,
                thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
                responseMimeType: "application/json",
                responseJsonSchema: itinerarySchema,
            },
        });

        console.log(res);
        console.log(res.text);

        const raw = res.text!
            .trim()
            .replace(/^```(?:json)?\s*/i, "")
            .replace(/\s*```$/i, "")
            .trim();
        console.log(raw);

        const parsed = JSON.parse(raw);
        const days: DayPlan[] = parsed.days;

        if (!Array.isArray(days) || days.length === 0) {
            throw new Error("Model returned unexpected shape");
        }

        return days;
    } catch (e: any) {
        if (e?.status === 429) throw new GeminiRateLimitError();
        throw e;
    }
}
