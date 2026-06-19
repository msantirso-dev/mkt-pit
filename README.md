# Jaime Smart Advisor

Landing premium de captación de leads para **BATEV** · **PI Proyectos Inteligentes**.

Repositorio: [github.com/msantirso-dev/mkt-pit](https://github.com/msantirso-dev/mkt-pit)

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

Repositorio GitHub: **https://github.com/msantirso-dev/mkt-pit** (rama `main`)

### Paso a paso en Coolify

1. **Nuevo proyecto** en Coolify (ej. `PI Marketing` o `BATEV`).

2. **Agregar PostgreSQL**
   - Crear recurso **PostgreSQL** en el mismo proyecto.
   - Anotar la URL interna que genera Coolify (formato `postgresql://user:pass@postgres:5432/database`).

3. **Agregar aplicación desde Git**
   - Tipo: **Public Repository** (o Private si conectaste GitHub).
   - URL del repo: `https://github.com/msantirso-dev/mkt-pit`
   - Rama: `main`
   - **Build Pack:** `Docker Compose`
   - **Docker Compose Location:** `/docker-compose.yaml`
   - **Base Directory:** `/`
   - **Puerto expuesto:** `3000`
   - **Dominio:** asignar uno (ej. `batev.pit.com.ar` o el que uses en la feria).

   > Si preferís un solo contenedor sin Compose, usá Build Pack **Dockerfile** en su lugar.

4. **Variables de entorno** (en el servicio de la app)

```env
DATABASE_URL=postgresql://USER:PASSWORD@NOMBRE-SERVICIO-POSTGRES:5432/DATABASE
ADMIN_PASSWORD=una-contraseña-segura
NEXT_PUBLIC_APP_URL=https://tu-dominio-asignado.com
```

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Copiar desde el servicio PostgreSQL de Coolify (conexión interna) |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |
| `NEXT_PUBLIC_APP_URL` | URL pública **exacta** con `https://` (usada por el QR) |

Opcionales:

```env
AI_ENABLED=false
OLLAMA_URL=http://ollama:11434
AI_MODEL=llama3.2
```

5. **Deploy**
   - Coolify construye la imagen con el `Dockerfile`.
   - Al iniciar, el contenedor ejecuta `prisma migrate deploy` y luego `node server.js`.
   - Verificar logs: debe aparecer `Running Prisma migrations...` y `Starting Jaime Smart Advisor...`.

6. **Probar**
   - Landing: `https://tu-dominio/`
   - QR feria: `https://tu-dominio/batev`
   - Admin: `https://tu-dominio/admin`
   - QR imprimible: `https://tu-dominio/admin/qr` (después de login)

7. **QR del stand**
   - Configurá `NEXT_PUBLIC_APP_URL` **antes** de imprimir el cartel.
   - El QR apunta a `{NEXT_PUBLIC_APP_URL}/batev`.

### Volúmenes opcionales

Montar en Coolify un volumen persistente en `/app/public/resources` si querés actualizar PDFs y audios del kit digital sin redeploy.

### Opción alternativa — Build manual (sin Dockerfile)

Si preferís Nixpacks/Node en lugar del Dockerfile:

- **Build command:** `npx prisma generate && npx prisma migrate deploy && npm run build`
- **Start command:** `npm run start`
- **Puerto:** `3000`

```bash
# Probar localmente con Docker Compose
docker compose up --build

# Con Ollama para Jaime IA
docker compose --profile ai up --build
```

### Notas Coolify

- El servicio PostgreSQL y la app deben estar en el **mismo proyecto** de Coolify para usar la red interna.
- Tras cambiar `NEXT_PUBLIC_APP_URL`, redeployá la app para que el QR use el dominio correcto.
- Ejecutar `npx prisma migrate deploy` en cada deploy con cambios de schema (el Dockerfile ya lo hace al iniciar).

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
