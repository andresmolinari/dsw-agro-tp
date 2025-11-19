# tp-dsw-agro
TP Desarrollo de Software - Agro
- Molinari Andrés - 43700<br>

Aplicación de gestión de trabajos del sector agropecuario para la materia Desarrollo de Software de la UTN Frro.<br><br>

Toda la documentación completa se encuentra aquí: [docs/README.md](docs/README.md)<br><br>


## DER

```mermaid
erDiagram
    roles {
        int rolId PK
        varchar rolNombre
    }

    usuarios {
        int usuarioId PK
        int rolId FK
        varchar usuarioNombre
        varchar usuarioEmail
        varchar usuarioContrasena
    }

    clientes {
        int clienteId PK
        int usuarioId FK
        varchar clienteNombre
        varchar clienteEmail
        varchar clienteTelefono
        varchar clienteDireccion
        varchar clienteLocalidad
        varchar clienteProvincia
    }

    campos {
        int campoId PK
        int clienteId FK
        varchar campoNombre
        varchar campoUbicacion
    }

    lotes {
        int loteId PK
        int campoId FK
        int loteNro
        int loteHectareas
    }

    ordenestrabajo {
        int nroOrdenTrabajo PK
        int loteId FK
        int usuarioId FK
        datetime fecha
        float costototal
        enum tipo "cosecha, siembra, fumigacion"
    }

    cosechas {
        int id PK
        int OrdenTrabajoId FK
        float rendimiento
        float precio
    }

    siembras {
        int id PK
        int OrdenTrabajoId FK
        varchar variedad
        float kilos
        float precio
    }

    fumigaciones {
        int id PK
        int OrdenTrabajoId FK
        varchar producto
        float dosis
        float precio
    }

    roles ||--o{ usuarios : "tiene asignados"
    usuarios ||--o{ clientes : "gestiona"
    usuarios ||--o{ ordenestrabajo : "registra"
    clientes ||--o{ campos : "posee"
    campos ||--o{ lotes : "se divide en"
    lotes ||--o{ ordenestrabajo : "recibe labor"
    ordenestrabajo ||--o{ cosechas : "detalla (si es cosecha)"
    ordenestrabajo ||--o{ siembras : "detalla (si es siembra)"
    ordenestrabajo ||--o{ fumigaciones : "detalla (si es fumigacion)"
```


## Regularidad

| Tipo             | Descripción                                                                                       |
|------------------|---------------------------------------------------------------------------------------------------|
| **CRUD Simple**  | CRUD Cliente<br>CRUD Campo                                                                        |
| **CRUD dependiente** | CRUD Lote depende de Campo                                                                    |
| **Listado**      | Listado de trabajos realizados, filtrado por tipo de trabajo. Mostrando los detalles de los trabajos |
| **CUU/Epic**     | Nuevo Trabajo                                                                                     |

## Aprobación Directa

| Tipo             | Descripción                                                                                       |
|------------------|---------------------------------------------------------------------------------------------------|
| **CRUD Simple**  | CRUD Cliente<br>CRUD Campo                                                                        |
| **CRUD dependiente** | CRUD Lote depende de Campo                                                                    |
| **Listado**      | Listado de trabajos realizados, filtrado por tipo de trabajo. Mostrando los detalles de los trabajos |
| **CUU/Epic**     | Nuevo Trabajo<br>Facturación y Cobranza                                                           |
