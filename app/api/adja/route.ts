import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const messages = body.messages;

    if (!messages) {
      return NextResponse.json({ error: "Missing messages" }, { status: 400 });
    }

    const key = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!key) {
      return NextResponse.json({ error: "API key not configured on server" }, { status: 500 });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        max_tokens: 500,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: `OpenAI error: ${res.status} ${text}` }, { status: 502 });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
