# Acceso rápido — Jaime Smart Advisor

## Local (desarrollo)

```bash
npm run dev
```

**URL correcta:** http://localhost:3001

> ⚠️ El puerto **3000** está ocupado por otra app en esta máquina. Si abrís `localhost:3000` vas a ver otro sitio, no este proyecto.

| Página | URL |
|---|---|
| Landing | http://localhost:3001 |
| BATEV / QR | http://localhost:3001/batev |
| Expo + acreditación | http://localhost:3001/expo-batev |
| Diagnóstico | http://localhost:3001/diagnostico |
| Admin | http://localhost:3001/admin (pass: ver `.env` → `ADMIN_PASSWORD`) |

### Requisitos local

1. PostgreSQL corriendo (Docker):
   ```bash
   docker compose up db -d
   ```
2. Archivo `.env` con `DATABASE_URL` apuntando al puerto **5433**

---

## Producción (Coolify)

**Dominio:** https://mkt.pit.com.ar

Configurar en Coolify → Environment Variables:

```env
DATABASE_URL=postgresql://...   # URL interna del PostgreSQL de Coolify
ADMIN_PASSWORD=tu-contraseña
NEXT_PUBLIC_APP_URL=https://mkt.pit.com.ar
```

Health check (opcional): `GET https://mkt.pit.com.ar/api/health`

### Si ves "demasiadas redirecciones" (redirect loop)

El dominio pasa por **Cloudflare** + **Coolify**. Corregir:

1. **Cloudflare** → SSL/TLS → modo **Full (strict)** (no "Flexible")
2. Desactivar **Always Use HTTPS** en Cloudflare **o** "Force HTTPS" en Coolify (no ambos a la vez)
3. Verificar que el contenedor esté **Running** (logs: `Starting Jaime Smart Advisor...`)
4. Puerto expuesto en Coolify: **3000**

El sitio **no** se ve en `localhost` desde tu PC salvo que Coolify esté en la misma máquina y exponga un dominio.

### Checklist si no carga

1. **Deploy en verde** — Logs sin error de build
2. **PostgreSQL Running** — en el mismo proyecto Coolify
3. **Variables de entorno** en la app:
   - `DATABASE_URL` (URL **interna** del postgres de Coolify)
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_URL=https://tu-dominio-real.com`
4. **Build Pack:** Docker Compose → `/docker-compose.yaml`
5. **Puerto:** `3000` expuesto
6. **Logs al iniciar** deben mostrar:
   ```
   Running Prisma migrations...
   Starting Jaime Smart Advisor...
   ```
7. Hacer **Redeploy** después de cada push a GitHub

### Repo GitHub

https://github.com/msantirso-dev/mkt-pit (rama `main`)
