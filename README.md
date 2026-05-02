# InkHub

# Tattoo Consent API

API RESTful para la gestión digital de consentimientos informados en estudios de tatuajes.

---

## Descripción

Este proyecto ha sido desarrollado como Trabajo de Fin de Máster y tiene como objetivo digitalizar el proceso de gestión de consentimientos en estudios de tatuaje.

La API permite:

- Registrar estudios de tatuaje
- Gestionar artistas asociados a un estudio
- Registrar clientes
- Crear y almacenar consentimientos informados

---

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

## Base URL

https://tu-api.onrender.com

---

## Instalación local

git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
npm install
npm run dev

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Nota: Cada usuario debe configurar sus propias variables. No se incluyen credenciales reales por motivos de seguridad.

---

## Autenticación

La API utiliza autenticación basada en JWT.

### Login

```http
POST /auth/login
```

Devuelve un token que debe enviarse en las rutas protegidas:

```http
Authorization: Bearer <token>
```

---

## Autorización

Se implementa control de acceso mediante roles usando dos middlewares:

- `auth`: verifica el token JWT
- `roleMidd`: restringe acceso según el rol

### Roles disponibles

- `studio`
- `artist` (gestionado por estudios)

---

## Modelos de datos

### Studio

Representa un estudio de tatuajes.

### Artist

Artista asociado a un estudio.

⚠️ Solo puede ser creado por usuarios con rol `studio`.

### Client

Cliente que firma consentimientos.

### Consent

Documento de consentimiento firmado.

### User

Gestiona autenticación y roles.

⚠️ Nota importante:
La creación de `studio` y `artist` está centralizada en el modelo `User`, lo que simplifica la gestión de identidad pero acopla parcialmente la lógica de dominio.

---

## Endpoints

### Auth

- `POST /auth/register/studio`
- `POST /auth/register/artist` (requiere autenticación + rol studio)
- `POST /auth/login`
- `GET /auth/profile`

---

### Studios

- `GET /studios`
- `GET /studios/:id`
- `GET /studios/:studioId/artists`
- `GET /studios/:studioId/clients`
- `GET /studios/:studioId/consents`
- `PUT /studios/:id`
- `DELETE /studios/:id`

---

### Artists

- `GET /artists`
- `GET /artists/:id`
- `PUT /artists/:id`
- `DELETE /artists/:id`

---

### Clients

- `POST /clients/create`
- `GET /clients`
- `GET /clients/:id`
- `PUT /clients/:id`
- `DELETE /clients/:id`

---

### Consents

- `POST /consents/create`
- `GET /consents`
- `GET /consents/:id`
- `PUT /consents/:id`
- `PUT /consents/:id/sign` (endpoint especifico para la firma del consentimiento)
- `DELETE /consents/:id`

---

## Flujo de uso

1. Un estudio se registra en la plataforma
2. El estudio crea artistas asociados
3. Se registran clientes
4. Se generan consentimientos vinculados a cliente, artista y estudio

---

## Decisiones de diseño

- Se ha optado por rutas explícitas como `/create` en algunos recursos para mejorar claridad en contexto académico.
- La creación de artistas está restringida a usuarios con rol `studio`.
- La lógica de creación de entidades (`studio` y `artist`) está parcialmente centralizada en el modelo `User`.

---

## Documentación de la API

### Swagger (OpenAPI)

### Colección de Postman

## Estructura del proyecto

```
/src
  /controllers
  /models
  /routes
  /middlewares
  /utils
  /server
/config
```

---

## Licencia

MIT
