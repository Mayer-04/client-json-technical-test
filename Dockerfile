# -------- Etapa 1: Build --------
FROM node:lts-slim AS builder

WORKDIR /app

# Copiar solo lo esencial para instalar dependencias
COPY package.json package-lock.json ./

# Instalar todas las dependencias (incluye dev)
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Ejecutar generación de migraciones (opcional: solo si haces esto en build)
RUN npm run migrate:generate

# Compilar con tsup (usa tu configuración personalizada)
RUN npm run build


# -------- Etapa 2: Producción --------
FROM node:lts-slim AS production

WORKDIR /app

# Definir variables de entorno
ENV NODE_ENV=production

# Copiar solo dependencias necesarias
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copiar la salida de build
COPY --from=builder /app/dist ./dist

# Copiar cualquier archivo necesario para Drizzle en tiempo de ejecución (si aplica)
COPY drizzle ./drizzle

# Exponer el puerto de tu API (ajusta si usas otro)
EXPOSE 5000

# Iniciar el servidor compilado
CMD ["node", "dist/server.js"]
