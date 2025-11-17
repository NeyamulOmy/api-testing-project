import { NextResponse } from "next/server";
export async function POST(req) {
  const payload = await req.json();

  const token = Buffer.from(
    `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
  ).toString("base64");

  const apiRes = await fetch(`${process.env.API_BASE_URL}/three-step`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await apiRes.json();
  
  console.log("Auth Only Response:", data);
  return NextResponse.json(data);
}
