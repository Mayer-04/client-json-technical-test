FROM node:lts-slim AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm ci

COPY . .

RUN npm run build

# ---------- STAGE 2: Runtime ----------
FROM node:lts-slim

WORKDIR /app

# Instalar pg_isready
RUN apt-get update && \
    apt-get install -y postgresql-client && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

# Copiar lo necesario del builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/src ./src
COPY wait-for-db.sh ./wait-for-db.sh

# Drizzle Kit runtime (si usas migraciones en tiempo de ejecución)
RUN npm install drizzle-kit

RUN chmod +x wait-for-db.sh

EXPOSE 5000

CMD ["./wait-for-db.sh"]

