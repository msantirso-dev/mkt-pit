import QRCode from "qrcode";

export function getBatevUrl(): string {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/batev`;
}

export async function generateQrDataUrl(
  url: string,
  size = 512
): Promise<string> {
  return QRCode.toDataURL(url, {
    width: size,
    margin: 2,
    color: {
      dark: "#05070A",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "H",
  });
}

export async function generateQrSvg(url: string, size = 512): Promise<string> {
  return QRCode.toString(url, {
    type: "svg",
    width: size,
    margin: 2,
    color: {
      dark: "#05070A",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "H",
  });
}

export async function generateQrBuffer(
  url: string,
  size = 1024
): Promise<Buffer> {
  return QRCode.toBuffer(url, {
    width: size,
    margin: 2,
    color: {
      dark: "#05070A",
      light: "#FFFFFF",
    },
    errorCorrectionLevel: "H",
  });
}
