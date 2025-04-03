import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  //   const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://olawoyin-multistepform.onrender.com/register/"
      );
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
      await axios.delete(
        `https://olawoyin-multistepform.onrender.com/users/${id}`
      );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <div className="container m-auto mt-4">
      <h2 className="fw-bold text-center">Admin User Management</h2>
      <small>
        <Link className="nav-link text-center my-4" to="/">Back to HomePage</Link>
      </small>

      <div className="co">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
