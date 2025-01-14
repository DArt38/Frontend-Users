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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name || "",
        last_name: selectedUser.last_name || "",
        mail: selectedUser.mail || "",
        phone: selectedUser.phone || "",
        password: "", // No cargar contraseña para la edición
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

  const validateForm = () => {
    const newErrors = {};

    if (!/\S+@\S+\.\S+/.test(form.mail)) {
      newErrors.mail = "El correo debe ser válido.";
    }

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "El teléfono debe tener exactamente 10 dígitos.";
    }

    if (form.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
      <div>
        <input
          type="email"
          name="mail"
          placeholder="Correo"
          value={form.mail}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.mail && <p className="text-red-500 text-sm">{errors.mail}</p>}
      </div>
      <div>
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
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
