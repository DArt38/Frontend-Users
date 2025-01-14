import { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://users-back-production.up.railway.app/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleSaved = () => {
    fetchUsers();
    setSelectedUser(null);
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <UserForm selectedUser={selectedUser} onUserSaved={handleSaved} />
      <UserList users={users} onEdit={handleEdit} onDelete={fetchUsers} />
    </div>
  );
};

export default App;
