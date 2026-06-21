import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "jaime-smart-advisor",
    timestamp: new Date().toISOString(),
  });
}
