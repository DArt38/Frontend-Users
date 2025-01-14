import { useState, useEffect } from "react";
import axios from "axios";

const UserForm = ({ selectedUser, onUserSaved }) => {
  const [form, setForm] = useState({
    name: "",
    last_name: "",
    mail: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || "",
        last_name: selectedUser.last_name || "",
        mail: selectedUser.mail || "",
        phone: selectedUser.phone || "",
        password: "", // No cargamos la contraseña para la edición
      });
    } else {
      // Si no hay usuario seleccionado, restablecer el formulario
      setForm({
        name: "",
        last_name: "",
        mail: "",
        phone: "",
        password: "",
      });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Actualizar usuario
        await axios.put(`https://users-back-production.up.railway.app/api/users/${selectedUser.id}`, form);
        alert("Usuario actualizado correctamente.");
      } else {
        // Crear usuario
        await axios.post("https://users-back-production.up.railway.app/api/users", form);
        alert("Usuario creado correctamente.");
      }
      onUserSaved();
      setForm({
        name: "",
        last_name: "",
        mail: "",
        phone: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el usuario.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={form.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="last_name"
        placeholder="Apellido"
        value={form.last_name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="email"
        name="mail"
        placeholder="Correo"
        value={form.mail}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {selectedUser ? "Actualizar Usuario" : "Agregar Usuario"}
      </button>
    </form>
  );
};

export default UserForm;
