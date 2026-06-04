import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Handle lazy initialization to prevent crashes on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { websiteUrl, keyword, companyDescription } = body;

    if (!websiteUrl) {
      return NextResponse.json(
        { error: "Website URL is required" },
        { status: 400 }
      );
    }

    const brandName = websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, "").split(".")[0].toUpperCase();
    const targetKeyword = keyword || "high-converting web services";
    const brandDesc = companyDescription || "A professional services brand looking for growth.";

    // Get client
    const ai = getAiClient();

    const systemPrompt = `You are a world-class GEO (Generative Engine Optimization) and AEO (Answer Engine Optimization) Search Architect. Your name is Braxton Codes' AI Audit engine.
Your task is to perform an realistic, insightful, and strategic AI and Generative Search Visibility Audit for the target brand and keyword.
Look at the website address provided, analyze its semantic footprint, its GEO rank eligibility, its AEO structured-data entity-readiness, and provide simulated, yet highly constructive insights based on modern search ranking mechanisms.
The user's brand is: ${brandName} (${websiteUrl}).
Their key business description is: ${brandDesc}.
They want to rank for the search term: "${targetKeyword}".

Be critical, rigorous, and highly strategic. Offer high-value, actionable technical schema, citation, and entity guidance that Braxton Codes can implement for them.`;

    const userPrompt = `Generate a comprehensive GEO & AEO Strategy Audit object. Use exactly the provided schema format in the response configuration.
Target Brand: ${brandName}
URL: ${websiteUrl}
Main Target Query: "${targetKeyword}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            websiteUrl: { type: Type.STRING },
            brandName: { type: Type.STRING },
            targetKeyword: { type: Type.STRING },
            overallScore: { type: Type.INTEGER, description: "GEO & AEO overall score from 0 to 100" },
            seoScore: { type: Type.INTEGER, description: "Technical and Content traditional SEO score 0 to 100" },
            aeoScore: { type: Type.INTEGER, description: "Answer Engine Optimization score (schema, snippet factors) 0 to 100" },
            geoScore: { type: Type.INTEGER, description: "Generative Engine Optimization score (citations, entity-graph visibility) 0 to 100" },
            status: { type: Type.STRING, description: "Short summary level status, e.g. 'Critically Invisible', 'Low Optimization', 'Moderate AI Presence', etc." },
            summary: { type: Type.STRING, description: "A detailed professional executive summary explaining why the site is or isn't visible in AI search for the target keyword, and what Braxton Codes can do to solve it." },
            entityGraphStatus: { type: Type.STRING, description: "The strength of this brand's presence in Wikidata, DBpedia, and general AI Knowledge bases" },
            platforms: {
              type: Type.ARRAY,
              description: "Visibility score breakdown of major AI Search engines",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "The AI engine name (e.g. ChatGPT, Claude, Gemini, Perplexity, Google AI Overviews)" },
                  status: { type: Type.STRING, description: "Adjective representing status, e.g. Moderate, Low Visibility, Not Mentioned" },
                  visibilityScore: { type: Type.INTEGER },
                  reason: { type: Type.STRING, description: "Specific technical reason why this LLM search ranks the site low or high for the target query" }
                },
                required: ["name", "status", "visibilityScore", "reason"]
              }
            },
            recommendations: {
              type: Type.ARRAY,
              description: "Actionable GEO/AEO/SEO implementations to rank first",
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "GEO, AEO, Traditional SEO, or Technical" },
                  action: { type: Type.STRING, description: "Action item to optimize the site" },
                  impact: { type: Type.STRING, description: "High, Medium, or Low" },
                  implementationDifficulty: { type: Type.STRING, description: "Easy, Medium, or Hard" }
                },
                required: ["category", "action", "impact", "implementationDifficulty"]
              }
            }
          },
          required: ["websiteUrl", "brandName", "targetKeyword", "overallScore", "seoScore", "aeoScore", "geoScore", "status", "summary", "entityGraphStatus", "platforms", "recommendations"]
        }
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response from Gemini API");
    }

    const auditData = JSON.parse(responseText.trim());
    return NextResponse.json(auditData);

  } catch (err: any) {
    console.error("API Error during GEO audit:", err);
    return NextResponse.json(
      {
        error: err.message || "An error occurred during generative audit",
        details: "Please ensure GEMINI_API_KEY is configured in Settings > Secrets."
      },
      { status: 500 }
    );
  }
}
