import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

//   const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://olawoyin-multistepform.onrender.com/register/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  

 
//   const handleEdit = (user) => {
//     setFormData(user);
//     setEditingUser(user);
//   };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://olawoyin-multistepform.onrender.com/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin User Management</h2>
      
      <table className="table table-bordered w-100">
        <thead>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.phone}</td>
              <td className="d-flex align-items-center gap-2">
                <button className="bg-secondary px-4 p-2 text-white" disabled>Edit</button>
                <button className="bg-danger px-4 p-2 text-white" onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
