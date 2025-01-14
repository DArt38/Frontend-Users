import { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://users-back-production.up.railway.app/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  if(!setUsers){
  useEffect(() => {
    fetchUsers();
  }, []);
}

  const handleUserSaved = () => {
    fetchUsers();
    setSelectedUser(null);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null); 
  };

  const handleUserDeleted = () => {
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Gestión de Usuarios</h1>
       <div className="mt-6">
          <UserForm selectedUser={selectedUser} onUserSaved={handleUserSaved} />
          {selectedUser && (
        <button
          onClick={handleCancelEdit}
          className="w-full px-4 py-2 bg-gray-500 text-white rounded mt-4"
        >
          Cancelar Edición
        </button>
      )}
        </div>
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-lg">
        {loading ? (
          <p className="text-center text-gray-500">...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No hay usuarios disponibles.</p>
        ) : (
          <UserList users={users} onEdit={setSelectedUser} onDelete={handleUserDeleted} />
        )}
      </div>
    </div>
  );
};

export default App;
