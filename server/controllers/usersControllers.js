const db = require("../config/connection");

// OBTENER TODOS LOS USUARIOS
const getUsers = (req, res) => {
  const query = "SELECT * FROM usuarios";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
};

// OBTENER USUARIO POR ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM usuarios WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Si no se encuentra el usuario
    if (results.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(results[0]);
  });
};

// CREAR UN NUEVO USUARIO
const createUser = (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = "INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)";

  db.query(query, [name, email, age], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409) // Código de estado 409: Conflicto
          .json({ error: "El correo ya está en uso" });
      }

      console.error("Error al crear el usuario:", err);
      return res.status(500).json({ error: "Error al crear el usuario" });
    }
    res
      .status(201)
      .json({ message: "Usuario creado con éxito", id: results.insertId });
  });
};

// ACTUALIZAR USUARIO
const updateUser = (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const query = `
    UPDATE usuarios
    SET nombre = ?, correo = ?, edad = ?
    WHERE id = ?
  `;

  db.query(query, [name, email, age, id], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res
          .status(409) // Código de estado 409: Conflicto
          .json({ error: "El correo ya está en uso" });
      }
      return res.status(500).json({ error: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado con éxito" });
  });
};

// ELIMINAR USUARIO
const deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
