"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4 text-sm">
      <Link href="/admin" className="text-muted hover:text-white transition-colors">
        Dashboard
      </Link>
      <Link
        href="/admin/leads"
        className="text-muted hover:text-white transition-colors"
      >
        Leads
      </Link>
      <Link
        href="/admin/qr"
        className="text-muted hover:text-white transition-colors"
      >
        QR BATEV
      </Link>
      <button
        onClick={handleLogout}
        className="text-muted hover:text-warning transition-colors"
      >
        Salir
      </button>
    </div>
  );
}
