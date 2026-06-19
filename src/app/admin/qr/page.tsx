import { generateQrDataUrl, getBatevUrl } from "@/lib/qr";
import { QrPrintPage } from "@/components/admin/QrPrintPage";

export const dynamic = "force-dynamic";

export default async function AdminQrPage() {
  const batevUrl = getBatevUrl();
  const qrDataUrl = await generateQrDataUrl(batevUrl, 800);
  const downloadUrl = `/api/qr?size=2048&url=${encodeURIComponent(batevUrl)}`;

  return (
    <QrPrintPage
      qrDataUrl={qrDataUrl}
      batevUrl={batevUrl}
      downloadUrl={downloadUrl}
    />
  );
}
