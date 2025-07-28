# Notas

- Error: triggerUncaughtException.
- Error: ENOENT: no such file or directory, open '.env'.

- Prueba técnica fullstack: API y frontend para validar, enriquecer y explorar datos de clientes en formato JSON.
- client-enrichment-technical-test.

## Docker

- Antes de ejecutar docker para que nuestra aplicación funcione correctamente debemos hacer un: `node --run migrate:generate` ya que las migraciones deben ser generadas manualmente antes de hacer `docker build`.

Errores:

No config path provided, using default 'drizzle.config.ts'
app          | Reading config file '/app/drizzle.config.ts'
app          | Using 'pg' driver for database querying
app          | DrizzleQueryError: Failed query: CREATE SCHEMA IF NOT EXISTS "drizzle"
app          | params: 
app          |     at NodePgPreparedQuery.queryWithCache (/app/node_modules/src/pg-core/session.ts:74:11)
app          |     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
app          |     at async PgDialect.migrate (/app/node_modules/src/pg-core/dialect.ts:85:3)
app          |     at async migrate (/app/node_modules/src/node-postgres/migrator.ts:10:2) {
app          |   query: 'CREATE SCHEMA IF NOT EXISTS "drizzle"',
app          |   params: [],
app          |   cause: Error: connect ECONNREFUSED 127.0.0.1:5432
app          |       at /app/node_modules/pg-pool/index.js:45:11
app          |       at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
app          |       at async <anonymous> (/app/node_modules/src/node-postgres/session.ts:149:14)
app          |       at async NodePgPreparedQuery.queryWithCache (/app/node_modules/src/pg-core/session.ts:72:12)
app          |       at async PgDialect.migrate (/app/node_modules/src/pg-core/dialect.ts:85:3)
app          |       at async migrate (/app/node_modules/src/node-postgres/migrator.ts:10:2) {
app          |     errno: -111,
app          |     code: 'ECONNREFUSED',
app          |     syscall: 'connect',
app          |     address: '127.0.0.1',
app          |     port: 5432
app          |   }
app          | }
app          | [⣷] applying migrations...
app exited with code 1