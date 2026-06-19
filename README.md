# Jaime Smart Advisor

Landing premium de captación de leads para **BATEV** · **PI Proyectos Inteligentes**.

Visitantes escanean un QR, completan sus datos, realizan un diagnóstico tecnológico de su obra, reciben un kit digital gratuito y quedan registrados en un panel administrativo.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Deploy preparado para Coolify

## Instalación

```bash
# Clonar e instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env

# Configurar DATABASE_URL y ADMIN_PASSWORD en .env
```

## Variables de entorno

```env
DATABASE_URL=postgresql://user:password@host:5432/jaime_smart_advisor
ADMIN_PASSWORD=tu-contraseña-segura
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Conexión PostgreSQL para Prisma |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |
| `NEXT_PUBLIC_APP_URL` | URL pública de la app (QR, links) |

## Migraciones Prisma

```bash
# Generar cliente Prisma
npx prisma generate

# Crear/aplicar migraciones
npx prisma migrate dev --name init

# (Opcional) Seed con 3 leads de ejemplo
npm run db:seed
```

## Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Landing principal |
| `/batev` | Página QR feria BATEV |
| `/diagnostico` | Formulario + test |
| `/resultado/[leadId]` | Resultado personalizado |
| `/biblioteca/[leadId]` | Kit digital |
| `/admin` | Dashboard (protegido) |
| `/admin/leads` | Listado de leads |
| `/admin/leads/[id]` | Detalle del lead |
| `/admin/qr` | QR imprimible para el stand BATEV |

## Deploy en Coolify

### Opción A — Dockerfile (recomendado)

El proyecto incluye `Dockerfile` con output standalone de Next.js y migraciones automáticas al iniciar.

1. Crear servicio en Coolify usando **Dockerfile** de este repositorio.
2. Agregar PostgreSQL y vincular `DATABASE_URL`.
3. Variables de entorno obligatorias:
   - `DATABASE_URL`
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_URL`
4. Puerto expuesto: `3000`
5. El entrypoint ejecuta `prisma migrate deploy` antes de `node server.js`.

```bash
# Probar localmente con Docker Compose
docker compose up --build

# Con Ollama para Jaime IA
docker compose --profile ai up --build
```

### Opción B — Build manual

1. Crear un servicio **Next.js** en Coolify apuntando a este repositorio.
2. Agregar una base de datos **PostgreSQL** en el mismo proyecto.
3. Configurar variables de entorno:
   - `DATABASE_URL` (desde el servicio PostgreSQL de Coolify)
   - `ADMIN_PASSWORD`
   - `NEXT_PUBLIC_APP_URL` (dominio asignado)
4. Comando de build:

```bash
npx prisma generate && npx prisma migrate deploy && npm run build
```

5. Comando de inicio:

```bash
npm run start
```

6. Exponer el puerto `3000` (o el que configure Coolify).

### Notas Coolify

- Montar la carpeta `public/resources/` como volumen persistente si querés actualizar PDFs/audios sin redeploy.
- Ejecutar `npx prisma migrate deploy` en cada deploy con cambios de schema.

## Cargar recursos digitales

Colocá los archivos en `public/resources/`:

```
public/resources/
├── libro.pdf
├── audiolibro.mp3
├── podcast.mp3
├── checklist.pdf
├── canalizaciones.pdf
└── errores.pdf
```

Los links de la biblioteca apuntan a `/resources/[archivo]`. Reemplazá los placeholders por tus archivos reales manteniendo los mismos nombres, o editá `src/lib/constants.ts` → `DIGITAL_RESOURCES`.

## Cambiar contraseña admin

1. Actualizá `ADMIN_PASSWORD` en las variables de entorno (`.env` local o Coolify).
2. Reiniciá la aplicación.
3. Los usuarios con sesión activa deberán volver a iniciar sesión.

## Seed opcional

```bash
npm run db:seed
```

Crea 3 leads de ejemplo con respuestas de test para probar el panel admin.

## QR imprimible para el stand

1. Ingresá a `/admin` con tu contraseña.
2. Andá a **QR BATEV** (`/admin/qr`).
3. Elegí formato **A4** (cartel de stand) o **A5** (mesa / mostrador).
4. Usá **Imprimir** o **Descargar PNG**.
5. El QR apunta a `{NEXT_PUBLIC_APP_URL}/batev` — configurá esa variable antes de imprimir.

**Logo PI:** ícono en `public/logo-pi-icon.png`. El texto de marca (Proyectos Inteligentes / pit.com.ar) se renderiza en código vía el componente `PiLogo`.

También podés obtener el PNG directo: `/api/qr?size=2048`

## Integración Jaime IA / Ollama

Jaime genera un consejo personalizado en `/resultado/[leadId]` usando Ollama cuando está habilitado. Si Ollama no responde, usa un consejo automático de respaldo.

### Activar Ollama

1. Instalá y ejecutá [Ollama](https://ollama.com/) en el servidor o localmente.
2. Descargá el modelo:

```bash
ollama pull llama3.2
```

3. Configurá las variables:

```env
AI_ENABLED=true
OLLAMA_URL=http://localhost:11434
AI_MODEL=llama3.2
```

4. Verificá el estado en `GET /api/ai` (devuelve `enabled` y `ollamaHealthy`).

### Docker Compose con IA

```bash
AI_ENABLED=true docker compose --profile ai up --build
# Luego dentro del contenedor ollama:
docker compose exec ollama ollama pull llama3.2
```

Variables opcionales futuras para OpenAI:

```env
OPENAI_API_KEY=
```

## Licencia

Proyecto privado · PI Proyectos Inteligentes
