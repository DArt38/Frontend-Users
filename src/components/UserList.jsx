import axios from "axios";

const UserList = ({ users, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://users-back-production.up.railway.app/api/users/${id}`);
      alert("Usuario eliminado correctamente.");
      onDelete();
    } catch (error) {
      console.error(error);
      alert("Hubo un error al eliminar el usuario.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Lista de Usuarios</h2>
      {users.map((user) => (
        <div key={user.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md mb-3 shadow">
          <div>
            <p className="font-medium">
              {user.name} {user.last_name}
            </p>
            <p className="text-gray-500">{user.mail}</p>
            <p className="text-gray-500">{user.phone}</p>
          </div>
          <div className="space-x-3">
            <button
              onClick={() => onEdit(user)}
              className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
