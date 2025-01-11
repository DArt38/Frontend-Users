import axios from "axios";

const UserList = ({ users, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      alert("Usuario eliminado correctamente.");
      onDelete();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el usuario.");
    }
  };

  return (
    <div>
      <h2>Lista de Usuarios</h2>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.name} {user.last_name} - {user.mail} - {user.phone}
          </p>
          <button onClick={() => onEdit(user)}>Editar</button>
          <button onClick={() => handleDelete(user.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default UserList;
