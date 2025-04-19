import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/UserPage.css";
import CreateTodoForm from "./CreateTodoForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faToggleOff, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from "@fortawesome/free-solid-svg-icons/faFileAlt";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";

const UserPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [editTodo, setEditTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // Fetch todos from the API
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8000/todos/all/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError("Error fetching todos. Please try again.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  const handleProfileDetais = () => {
    window.location.href = "/Profile";
  };

  const handleEditTodo = (id, title, description, priority, status) => {
    setEditTodo({ id, title, description, priority, status });
    setShowForm(true);
  };

  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://127.0.0.1:8000/todos/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      fetchTodos();

    } catch (error) {
      setError("Error deleting todo. Please try again.");
      console.error(error);
    }
  }

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updatedTodos);
  };
  


  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3 header">
        <h2>Todo App</h2>
        
        <div className="d-flex align-items-center">
          <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}><FontAwesomeIcon icon={faPlus} className="me-2" />Create Todo</button>
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
        {showForm && (
          <>
            {/* Backdrop */}
            <div className="modal-backdrop show" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}></div>

            {/* Modal */}
            <div className="modal show d-block" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <CreateTodoForm
                    onClose={() => {
                      setShowForm(false);
                      setEditTodo(null); // Clear edit data on close
                    }}
                    initialData={editTodo}
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
          {/* Search Input */}
          <div className="search-box position-relative">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <div className="d-flex flex-wrap gap-2 filter-buttons">
            {["All", "Pending", "Completed", "High Priority", "Medium", "Low"].map((label) => (
              <button
                key={label}
                className={`btn btn-sm ${filter === label ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 table-container">
          {todos.length > 0 ? (
            <div className="table-responsive scrollable-table">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th style={{textAlign:"center"}}>Status</th>
                    <th style={{ display: "none" }}>ID</th>
                    <th style={{textAlign:"center"}}>Title</th>
                    <th style={{textAlign:"center"}}>Description</th>
                    <th style={{textAlign:"center"}}>Priority</th>
                    <th style={{textAlign:"center"}}>Status</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTodos.map((todo) => (
                    <tr key={todo.id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input custom-checkbox"
                          checked={todo.status}
                          onChange={() => handleToggleComplete(todo.id)}
                        />
                      </td>
                      <td style={{ display: "none" }}>{todo.id}</td>
                      <td>{todo.title}</td>
                      <td>{todo.description}</td>
                      <td>{todo.priority}</td>
                      <td>{todo.status}</td>
                      <td>
                        <FontAwesomeIcon icon={faEdit} className="btn btn-ops btn-outline-success me-2" onClick={() => handleEditTodo(todo.id, todo.title, todo.description, todo.priority, todo.status)} />
                        <FontAwesomeIcon icon={faTrash} className="btn btn-ops btn-outline-danger me-2" onClick={() => handleDeleteTodo(todo.id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-todos-message">
              <FontAwesomeIcon icon={faFileAlt} size="2x" className="me-2" />
              <p style={{ fontWeight: "bold" }}>No todos found.</p>
              <p>get started by creating a new todo</p>
              <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}><FontAwesomeIcon icon={faPlus} className="me-2" />Create your first todo</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
