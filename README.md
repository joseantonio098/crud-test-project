# Reto Técnico: CRUD con Node.js, express, Vue.js y MySQL

## Descripción

Esta aplicación implementa un CRUD para gestionar una entidad llamada Usuarios. El proyecto incluye:

- Un backend desarrollado con Node.js y Express.js.
- Un frontend desarrollado con Vue.js.
- Una base de datos MySQL.

El objetivo es permitir crear, leer, actualizar y eliminar usuarios, cumpliendo con buenas prácticas y estándares de desarrollo.

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **MySQL**: [Descargar MySQL](https://www.mysql.com/)
- **Git**: [Descargar Git](https://git-scm.com/)

---

## Configuración del Proyecto

### 1. Clonar el Repositorio

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/joseantonio098/crud-test-project.git
cd crud-test-project
```

### 2. Backend

#### Instalar Dependencias

Navega a la carpeta del servidor y ejecuta el siguiente comando:

```bash
cd server
npm install
```

#### Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `server` con el siguiente contenido:

```env
PORT=3005
CORS_ORIGINS=http://localhost:8081
CORS_METHODS=GET,POST,PUT,DELETE
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=nombre_base_datos
```

#### Ejecutar el Servidor

Inicia el servidor con el comando:

```bash
npm run serve
```

El backend estará disponible en `http://localhost:3005`.

### 3. Base de Datos

#### Crear la Base de Datos

Utiliza el archivo `database.sql` incluido en el repositorio para crear la base de datos y la tabla `usuarios`. Ejecuta el siguiente comando desde tu cliente MySQL:

```sql
source path/a/database.sql;
```

### 4. Frontend

#### Instalar Dependencias

Navega a la carpeta del cliente y ejecuta:

```bash
cd client
npm install
```

#### Configurar Variables de Entorno

Crea un archivo `.env` en la carpeta `client` con el siguiente contenido:

```env
VITE_API_URL=http://localhost:5000
```

#### Ejecutar el Frontend

Inicia el cliente con el comando:

```bash
npm run serve
```

El frontend estará disponible en `http://localhost:8081`.

---

## Funcionalidades

- **Backend**:

  - API REST con rutas para:
    - Obtener todos los usuarios.
    - Obtener un usuario por su ID.
    - Crear un nuevo usuario.
    - Actualizar un usuario existente.
    - Eliminar un usuario.
  - Validación de datos.
  - Manejo de errores.

- **Frontend**:

  - Vista principal con una lista de usuarios.
  - Formularios para crear y editar usuarios.
  - Botones para eliminar usuarios.
  - Validaciones en formularios.
  - Consumo de API con Axios.

- **Base de Datos**:
  - Tabla `usuarios` con los campos:
    - `id` (entero, autoincremental, clave primaria).
    - `nombre` (cadena, obligatorio).
    - `correo` (cadena, único, obligatorio).
    - `edad` (entero, opcional).

---

## Estructura del Proyecto

```plaintext
├── client/       # Código del frontend (Vue.js)
├── server/       # Código del backend (Node.js, Express)
├── database.sql  # Script para crear la base de datos
├── .gitignore    # Archivos ignorados por Git
├── README.md     # Documentación del proyecto
```

---

## Comandos Útiles

### Backend

- Iniciar el servidor: `npm run serve`

### Frontend

- Iniciar el cliente: `npm run serve`

---

## Extras Implementados

- **Paginación**: La lista de usuarios incluye paginación para manejar grandes volúmenes de datos.
- **Búsqueda**: Campo de búsqueda en el frontend para filtrar usuarios.

---

## Créditos

Desarrollado por José Valencia como parte de un reto técnico.

---

¡Gracias por revisar este proyecto! No dudes en abrir un issue en el repositorio si tienes dudas o sugerencias.
