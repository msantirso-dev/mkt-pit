"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { PiLogo } from "@/components/brand/PiLogo";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });

      if (!res.ok) {
        setError("Contraseña incorrecta");
        return;
      }

      router.refresh();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md w-full">
      <div className="glass-card rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <PiLogo size="md" href={null} align="center" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-2">Panel Admin</h1>
        <p className="text-sm text-muted text-center mb-6">Jaime Smart Advisor</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresá la contraseña admin"
            required
          />
          {error && <p className="text-sm text-warning">{error}</p>}
          <Button type="submit" fullWidth loading={loading}>
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}
