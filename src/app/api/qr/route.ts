import { NextRequest, NextResponse } from "next/server";
import { generateQrBuffer, getBatevUrl } from "@/lib/qr";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") ?? getBatevUrl();
  const size = parseInt(searchParams.get("size") ?? "1024", 10);

  try {
    const buffer = await generateQrBuffer(url, Math.min(size, 2048));

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
        "Content-Disposition": 'inline; filename="batev-qr.png"',
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json({ error: "Error al generar QR" }, { status: 500 });
  }
}
