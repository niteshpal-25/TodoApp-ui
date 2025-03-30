import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserForm from "./CreateUserForm";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch Todos and Users
  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");

      // Fetch Todos
      const todosResponse = await fetch("http://127.0.0.1:8000/admin/all_todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!todosResponse.ok) throw new Error("Failed to fetch todos");
      const todosData = await todosResponse.json();
      setTodos(todosData);

      // Fetch Users
      const usersResponse = await fetch("http://127.0.0.1:8000/admin/read_all_users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!usersResponse.ok) throw new Error("Failed to fetch users");
      const usersData = await usersResponse.json();
      setUsers(usersData);
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error(err);
    }
  };

  // Call the fetch function on component mount
  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3 header">
        <h2>Admin Dashboard</h2>
        <div className="d-flex align-items-center">
          <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}>Create User</button>
          <div className="position-relative">
            <button
              className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
              onClick={() => setShowMenu(!showMenu)}
            >
              A
            </button>
            {showMenu && (
              <div className="position-absolute bg-white text-dark p-2 rounded shadow" style={{ right: 0, top: "45px" }}>
                <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {error && <p className="text-danger">{error}</p>}
        {/* {showForm && <CreateUserForm onClose={() => setShowForm(false)} />} */}

        {showForm && (
          <>
            {/* Backdrop */}
            <div className="modal-backdrop show" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>

            {/* Modal */}
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <CreateUserForm onClose={() => setShowForm(false)} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Table */}
        <div className="mt-4 table-container">
          <h4>Users</h4>
          {users.length > 0 ? (
            <div className="table-responsive scrollable-table">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users available.</p>
          )}
        </div>

        {/* Todos Table */}
        <div className="mt-4 table-container">
          <h4>Todos</h4>
          {todos.length > 0 ? (
            <div className="table-responsive scrollable-table">
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo.id}>
                      <td>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.status}</td>
                      <td>{new Date(todo.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No todos available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
