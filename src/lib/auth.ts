import { cookies } from "next/headers";

const ADMIN_COOKIE = "jaime_admin_session";

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  return password === adminPassword;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return session?.value === "authenticated";
}

export function getAdminCookieName(): string {
  return ADMIN_COOKIE;
}
