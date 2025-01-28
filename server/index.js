// Configuración del servidor
require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const usersRoutes = require("./routes/usersRoutes");

// Middleware para la configurarción de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGINS,
    methods: process.env.CORS_METHODS.split(","),
    credentials: true,
  })
);

// Middleware para mostrar información de solicitudes http entrantes
app.use(morgan("dev"));

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Middleware para analizar el cuerpo de las solicitudes en formato de URL codificada
app.use(express.urlencoded({ extended: true }));

// Settings (configurar puerto)
app.set("port", process.env.PORT || 3000);

// Start the server (Ejecutar servidor en el puerto)
const server = app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});

// Rutas
app.use("/users", usersRoutes);
