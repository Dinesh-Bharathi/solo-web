import React, { useEffect, useState } from "react";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [users, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Update existing user
      try {
        const response = await fetch(
          `http://localhost:5000/api/users/update/${editingUserId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log("User updated:", result);
          setFormData({ name: "", email: "" });
          setIsEditMode(false);
          setEditingUserId(null);
          fetchUsers();
        } else {
          console.error("Error updating user:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      // Create a new user
      try {
        const response = await fetch("http://localhost:5000/api/users/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const result = await response.json();
          console.log("User created:", result);
          setFormData({ name: "", email: "" });
          fetchUsers();
        } else {
          console.error("Error creating user:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (response.ok) {
        const result = await response.json();
        setUsers(result);
        console.log("Fetched users:", result);
      } else {
        console.error("Error fetching users:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteUsers = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/delete/${userId.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("User updated:", result);
        setFormData({ name: "", email: "" });
        setIsEditMode(false);
        setEditingUserId(null);
        fetchUsers();
      } else {
        console.error("Error updating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setIsEditMode(true);
    setEditingUserId(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {isEditMode ? "Update User" : "Create User"}
        </button>
      </form>

      <h2>List of Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => deleteUsers(user)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateUserForm;
