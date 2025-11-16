import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse incoming JSON payload
    const payload = await req.json();

    // Log payload to server console for debugging
    console.log("Payment Payload Received:", payload);

    // Example: return the same payload as response
    return NextResponse.json({ success: true, data: payload });
  } catch (err) {
    console.error("Error in notifications API:", err);
    return NextResponse.json(
      { success: false, error: "Invalid JSON or server error" },
      { status: 500 }
    );
  }
}
