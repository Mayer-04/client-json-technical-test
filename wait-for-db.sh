#!/bin/sh

set -e

echo "⏳ Esperando a que la base de datos esté disponible..."

# Espera hasta que Postgres esté disponible
until pg_isready -h db -p 5432 -U "$POSTGRES_USER" > /dev/null 2>&1; do
  sleep 2
done

echo "✅ Base de datos disponible."

echo "🚀 Ejecutando migraciones..."
npx drizzle-kit migrate

echo "🟢 Iniciando servidor..."
exec node dist/server.js
