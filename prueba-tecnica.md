# Procesamiento y Enriquecimiento de Datos de Clientes en JSON

## 🏢 Empresa ficticia: DataPlus Solutions

**DataPlus Solutions** ayuda a empresas a integrar y enriquecer datos crudos de sus clientes. Recibimos información en formato JSON, que debe ser normalizada, validada y enriquecida para su posterior análisis o visualización.

## 🎯 Objetivo del reto

Desarrollar una API RESTful con un frontend simple que permita:

- Subida de lotes JSON con datos de clientes.
- Validación y enriquecimiento de los datos (edad, nivel de ingresos, ID único).
- Consulta y filtrado de clientes desde la API.

## 🔧 Requerimientos Backend

### Endpoints requeridos

```md
| Método | Ruta              | Descripción                                       |
| ------ | ----------------- | ------------------------------------------------- |
| POST   | `/clients/upload` | Subir un lote (array) de clientes en formato JSON |
| GET    | `/clients`        | Listar todos los clientes, con filtros            |
| GET    | `/clients/:id`    | Ver detalles de un cliente específico             |
```

## Reglas de enriquecimiento

1. `age` (edad) → Calcular a partir de `birthdate` (fecha de nacimiento).

2. `income_level` (nivel de ingresos), según los ingresos (`income`):

- Menor a 2000 → `"bajo"`.
- Entre 2000 y 6000 → `"medio"`.
- Mayor a 6000 → `"alto"`.

3. `id` generado automáticamente, formato:

- `nombre-apellido-YYYYMMDD`.
- Ejemplo: `"maria-lopez-19900520"`.
- Nota: convertir a minúsculas, remover tildes y caracteres especiales si es necesario.

## Entrada esperada (POST /clients/upload)

```json
[
  {
    "name": "María López",
    "birthdate": "1990-05-20",
    "income": 4200.5,
    "email": "maria@example.com"
  }
]
```

## Salida esperada (objeto enriquecido)

```json
{
  "id": "maria-lopez-19900520",
  "name": "María López",
  "age": 34,
  "income": 4200.5,
  "income_level": "medio",
  "email": "maria@example.com"
}
```

## 🗃️ Esquema de base de datos

```sql
clients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  age INTEGER NOT NULL,
  income DECIMAL NOT NULL,
  income_level TEXT NOT NULL,
  email TEXT NOT NULL
)
```

## ✅ Criterios de evaluación

- Cálculo correcto de edad (`age`).
- Clasificación adecuada de nivel de ingresos (`income_level`).
- Validaciones robustas:

- Formato de fecha (`birthdate`) válido.

  - `income` numérico positivo.
  - `email` con formato correcto.

- Generación precisa y única de `id`.
- Filtros funcionales en la API (`GET /clients`):

  - Rango de edad.
  - Rango de ingreso.
  - Búsqueda por nombre o email (parcial).

- Código limpio, modular y documentado.

## 🖥️ Requisitos Frontend

### Objetivo: Explorador de clientes

Pantallas Requeridas:

1. Formulario de carga JSON

- Área de texto o subida de archivo `.json`.
- Mostrar resultado tras enviar (éxito o errores).
- Validación básica en frontend antes del envío.

2. Tabla de clientes

- Listado de todos los clientes enriquecidos.

- Filtros:

  - Edad mínima / máxima.
  - Rango de ingresos.
  - Nivel de ingreso (bajo, medio, alto).

- Ordenar por edad o ingreso (asc/desc).

3. Detalle individual

- Al hacer clic en un cliente en la tabla, mostrar su información completa.

## 💡 Bonus (no obligatorio, suma puntos)

- Validación del JSON en el frontend antes de enviarlo.
- Vista previa del enriquecimiento antes de guardar los datos.
- Exportar tabla como archivo CSV.
- Pruebas unitarias o de integración.
- Dockerización básica del backend o frontend.
