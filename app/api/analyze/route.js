import { NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/systemPrompt";
import { flattenAnswers } from "@/lib/questions";

export const runtime = "nodejs";

function extractJson(text) {
  const cleaned = text.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found in model response");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function POST(req) {
  try {
    const { answers } = await req.json();

    if (!answers || typeof answers !== "object") {
      return NextResponse.json({ error: "Missing questionnaire answers." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server is missing GROQ_API_KEY. Add it in your hosting provider's environment variables." },
        { status: 500 }
      );
    }

    const userContent = `Here are the company's questionnaire answers:\n\n${flattenAnswers(
      answers
    )}\n\nProduce the gap analysis now, following the required JSON output format exactly.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        max_tokens: 4000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: userContent },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: `AI provider error: ${response.status} ${errText}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "Model returned no text content." }, { status: 502 });
    }

    const report = extractJson(text);
    return NextResponse.json({ report });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not generate the report. Please try again." },
      { status: 500 }
    );
  }
}