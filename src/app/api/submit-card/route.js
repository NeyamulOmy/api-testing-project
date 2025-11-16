import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { consumerUrl, ...cardData } = await req.json();

    if (!consumerUrl) return NextResponse.json({ error: "Missing consumerUrl" }, { status: 400 });

    const res = await fetch(consumerUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
    },
      body: JSON.stringify(cardData),
    });

    const data = await res.json().catch(() => ({}));
    console.log("Submit Card Response:", data);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error submitting card:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
