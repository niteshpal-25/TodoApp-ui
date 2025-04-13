import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserForm from "./CreateUserForm";
import "../styles/AdminPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faUser, faListCheck, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [edituser, setedituser] = useState(null);
  const [activeTab, setActiveTab] = useState("users");

  const fetchAdminData = async () => {
    try {
      const token = localStorage.getItem("token");

      const [todosRes, usersRes] = await Promise.all([
        fetch("http://127.0.0.1:8000/admin/all_todos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }),
        fetch("http://127.0.0.1:8000/admin/read_all_users/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }),
      ]);

      if (!todosRes.ok) throw new Error("Failed to fetch todos");
      if (!usersRes.ok) throw new Error("Failed to fetch users");

      setTodos(await todosRes.json());
      setUsers(await usersRes.json());
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm("Are you sure you want to delete this todo?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/admin/todo/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete todo");
      fetchAdminData();
    } catch (err) {
      setError("Error deleting todo.");
      console.error(err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://127.0.0.1:8000/admin/user/${id}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete user");
      fetchAdminData();
    } catch (err) {
      setError("Error deleting user.");
      console.error(err);
    }
  };

  const handleEdituser = (id, username, first_name, last_name, email, role) => {
    setedituser({ id, username, first_name, last_name, email, role });
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const handleProfileDetais = () => {
    window.location.href = "/Profile";
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (

    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="sidebar bg-dark text-white p-3">
        <h4 className="text-white mb-4">Admin Panel</h4>
        <nav className="nav flex-column">
          <button className={`nav-link text-start btn ${activeTab === "users" ? "active-menu" : "text-white"}`} onClick={() => setActiveTab("users")}>
            <FontAwesomeIcon icon={faUser} className="me-2" /> Users
          </button>
          <button className={`nav-link text-start btn ${activeTab === "todos" ? "active-menu" : "text-white"}`} onClick={() => setActiveTab("todos")}>
            <FontAwesomeIcon icon={faListCheck} className="me-2" /> Todos
          </button>
          <button className="nav-link text-start btn text-white" onClick={() => setShowForm(true)}>
            <FontAwesomeIcon icon={faUserPlus} className="me-2" /> Create User
          </button>
          <hr className="text-white" />
          <button className="nav-link text-start btn text-white" onClick={handleProfileDetais}>
            <i className="bi bi-person-circle me-2"></i> Profile
          </button>
          <button className="nav-link text-start btn text-white" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        <h2>{activeTab === "users" ? "List of Users" : "List of Todos"}</h2>
        {error && <p className="text-danger">{error}</p>}

        {/* Modal for Create/Edit User */}
        {showForm && (
          <>
            <div className="modal-backdrop show" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <CreateUserForm onClose={() => {
                    setShowForm(false);
                    setedituser(null);
                  }}
                    initialData={edituser}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="table-responsive mt-3 scrollable-table" style={{ maxHeight: "400px" }}>
            {users.length > 0 ? (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th style={{textAlign:"center"}}>Username</th>
                    <th style={{textAlign:"center"}}>Email</th>
                    <th style={{textAlign:"center"}}>Role</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td style={{textAlign:"center"}}>
                        <FontAwesomeIcon icon={faEdit} className="btn btn-ops btn-outline-success me-2" onClick={() => handleEdituser(user.id, user.username, user.first_name, user.last_name, user.email, user.role)} />
                        <FontAwesomeIcon icon={faTrash} className="btn btn-ops btn-outline-danger me-2" onClick={() => handleDeleteUser(user.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-todos-message">
                <FontAwesomeIcon icon={faUser} size="2x" className="me-2" />
                <p style={{ fontWeight: "bold" }}>No user found.</p>
                <p>get started by creating a new user</p>
                <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}><FontAwesomeIcon icon={faUser} className="me-2" />Create your first user</button>
              </div>
            )}
          </div>
        )}

        {/* Todos Tab */}
        {activeTab === "todos" && (
          <div className="table-responsive mt-3 scrollable-table" style={{ maxHeight: "400px" }}>
            {todos.length > 0 ? (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th style={{textAlign:"center"}}>Title</th>
                    <th style={{textAlign:"center"}}>Description</th>
                    <th style={{textAlign:"center"}}>Priority</th>
                    <th style={{textAlign:"center"}}>Complete</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo.id}>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.priority}</td>
                      <td>{todo.complete.toString()}</td>
                      <td style={{textAlign:"center"}}>
                          <FontAwesomeIcon icon={faTrash} className="btn btn-ops btn-outline-danger me-2"
                          onClick={() => handleDeleteTodo(todo.id)} />                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No todos available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
