# 🧪 Prueba Técnica – Backend Developer

## Proyecto: Procesamiento y Enriquecimiento de Datos de Clientes

### Empresa ficticia: DataPlus Solutions

**DataPlus Solutions** es una empresa especializada en la integración y enriquecimiento de datos crudos en formato JSON, provenientes de diversas fuentes. Nuestro objetivo es transformar estos datos en bruto en información estructurada, validada y útil para su análisis o visualización.

## 🎯 Objetivo del Reto

Desarrollar una API RESTful que permita:

- Subir lotes de datos JSON con información de clientes.
- Validar y enriquecer los datos (edad, nivel de ingresos, ID único).
- Consultar y filtrar clientes desde la API.

## Requisitos del Backend

### Endpoints requeridos

| Método | Ruta            | Descripción                                            |
| ------ | --------------- | ------------------------------------------------------ |
| POST   | /clients/upload | Cargar un lote (array) de clientes en formato JSON.    |
| GET    | /clients        | Listar clientes con soporte de filtros.                |
| GET    | /clients/:id    | Obtener el detalle de un cliente específico por su ID. |

## Reglas de enriquecimiento

1. Edad (`age`)

- Calcular a partir de la fecha de nacimiento (`birthdate`).

2. Nivel de ingresos (`income_level`)

Clasificación según el valor de `income`:

- Menor a 2000 → `"bajo"`.
- Entre 2000 y 6000 → `"medio"`.
- Mayor a 6000 → `"alto"`.

3. ID único (`id`)

Generar automáticamente con el formato:

- `nombre-apellido-YYYYMMDD`
  Ejemplo: "maria-lopez-19900520"

- Reglas:
  - Convertir a minúsculas.
  - Eliminar tildes y caracteres especiales.
  - Asegurar unicidad.

## 📤 Entrada esperada (POST /clients/upload)

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

## 📤 Salida esperada (objeto enriquecido)

```json
{
  "id": "maria-lopez-19900520",
  "name": "María López",
  "birthdate": "1990-05-20",
  "age": 34,
  "income": 4200.5,
  "income_level": "medio",
  "email": "maria@example.com"
}
```

## 🔍 Filtros Permitidos en `GET /clients`

Se aceptan los siguientes filtros opcionales:

- `name`:

  - Búsqueda parcial, insensible a mayúsculas, tildes o caracteres especiales.
  - **Ejemplo:** `/clients?name=lopez`.

- `income_level`:

  - Filtra por `"bajo"`, `"medio"` o `"alto"`.
  - **Ejemplo:** `/clients?income_level=medio`.

- Ambos filtros pueden usarse juntos o por separado.
  - **Ejemplo combinado:** `/clients?name=ana&income_level=alto`.

> [!IMPORTANT]
> La respuesta incluirá todos los registros que coincidan con los filtros.

## ✅ Validaciones Requeridas

- `birthdate`: formato válido (`YYYY-MM-DD`)
- `income`: valor numérico positivo
- `email`: formato de correo electrónico válido
- Generación correcta de:

  - `age`
  - `income_level`
  - `id` único

- Filtros funcionales según los parámetros especificados

## Requisitos Técnicos Adicionales

El proyecto debe incluir:

- Al menos una **prueba unitaria** o de **integración**.
- Contenedorización del entorno con **Docker**.
- Documentación automática de la API (preferentemente con **Swagger** o equivalente).

## Criterios de Evaluación

- Correcta implementación de los requerimientos funcionales.
- Legibilidad y mantenibilidad del código.
- Buenas prácticas de desarrollo.
- Cobertura de pruebas (al menos 1).
- Uso adecuado de herramientas de documentación y contenedorización.
