import { NextResponse } from "next/server";
import { Transaction, initDB } from "@/lib/sequelize";
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
  const transactionId = data["transaction-id"];
  // ensure DB initialized (lightweight; initDB does authenticate + sync)
    try {
      await initDB();
    } catch (err) {
      // optional: log init error but continue
      console.error('DB init error:', err);
    }
  if (transactionId) {
    try {
      await Transaction.create({
        transactionId,
      });
    } catch (err) {
      // handle duplicate key or DB errors as needed
      console.error('Failed to save transaction:', err);
    }
  }
  console.log("Add Customer Response:", data);
  return NextResponse.json(data);
}
