import { isAdminAuthenticated } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminNav } from "@/components/admin/AdminNav";
import { PiLogo } from "@/components/brand/PiLogo";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <AdminLoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <PiLogo size="sm" href="/admin" showText />
            <div className="hidden sm:block h-8 w-px bg-white/10" />
            <div className="hidden sm:block min-w-0">
              <p className="text-xs text-pi-red uppercase tracking-widest">Admin</p>
              <p className="font-semibold truncate">Jaime Smart Advisor</p>
            </div>
          </div>
          <AdminNav />
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
