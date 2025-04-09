import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserForm from "./CreateUserForm";
import "../styles/AdminPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';

const AdminPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [edituser, setedituser] = useState(null);

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

  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/admin/todo/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      fetchAdminData();

    } catch (error) {
      setError("Error deleting todo. Please try again.");
      console.error(error);
    }
  }

  const handleEdituser = (id, username,first_name,last_name, email, role) => {
    setedituser({ id, username,first_name,last_name, email, role });
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/admin/user/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      fetchAdminData();

    } catch (error) {
      setError("Error deleting user. Please try again.");
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle Logout
  const handleProfileDetais = () => {
    window.location.href = "/Profile";
  };

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
              {localStorage.getItem("username").substring(0, 1).toUpperCase()}
            </button>
            {showMenu && (
              <div className="position-absolute bg-white text-dark p-3 rounded shadow-lg border" style={{ right: 10, top: "45px", minWidth: "160px" }}>
                <button className="btn btn-light w-100 mb-2 text-primary fw-semibold d-flex align-items-center justify-content-center border rounded-pill shadow-sm"
                  onClick={handleProfileDetais}>
                  <i className="bi bi-person-circle me-2 fs-5 text-primary"></i> Profile
                </button>
                <button className="btn btn-light w-100 text-danger fw-semibold d-flex align-items-center justify-content-center border rounded-pill shadow-sm"
                  onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2 fs-5 text-danger"></i> Logout
                </button>
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
                  <CreateUserForm onClose={() => {
                      setShowForm(false);
                      setedituser(null); // Clear edit data on close
                    }}
                    initialData={edituser} />
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
                    <th style={{display:"none"}}>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td style={{display:"none"}}>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-ops btn-outline-success" onClick={() => handleEdituser(user.id, user.username,user.first_name,user.last_name, user.email, user.role)}>
                          <FontAwesomeIcon icon={faEdit} className="me-2" />
                          Edit
                        </button>

                        <button className="btn btn-ops btn-outline-danger"  onClick={() => handleDeleteUser(user.id)}>
                          <FontAwesomeIcon icon={faTrash} className="me-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-todos-message">No users available.</p>
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
                  <th style={{display:"none"}}>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Complete</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((todo) => (
                    <tr key={todo.id}>
                      <td style={{display:"none"}}>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.priority}</td>
                      <td>{todo.complete.toString()}</td>
                      <td>
                        <button className="btn btn-ops btn-outline-danger"  onClick={() => handleDeleteTodo(todo.id)}>
                          <FontAwesomeIcon icon={faTrash} className="me-2" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="no-todos-message">No todos available.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
