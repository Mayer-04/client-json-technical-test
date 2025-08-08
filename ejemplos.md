FROM node:lts-slim AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm ci

COPY . .

RUN npm run build

# ---------- STAGE 2: Runtime ----------
FROM node:lts-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copiar lo necesario del builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/src ./src

# Drizzle Kit runtime (si usas migraciones en tiempo de ejecución)
RUN npm install drizzle-kit

EXPOSE 5000

# Ejecutar migraciones y luego iniciar el servidor
CMD ["sh", "-c", "npx drizzle-kit migrate && node dist/server.js"]
