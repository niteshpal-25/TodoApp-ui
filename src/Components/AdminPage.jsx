import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateUserForm from "./CreateUserForm";
import "../styles/AdminPage.css";

const AdminPage = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container-fluid">
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3 header">
        <h2></h2>
        <div className="d-flex align-items-center">
          <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}>Create User</button>
          <div className="position-relative">
            <button
              className="btn btn-secondary rounded-circle d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
              onClick={() => setShowMenu(!showMenu)}
            >
              P
            </button>
            {showMenu && (
              <div className="position-absolute bg-white text-dark p-2 rounded shadow" style={{ right: 0, top: "45px" }}>
                <button className="btn btn-danger btn-sm w-100">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="p-4">
        <p>Welcome to the Admin Dashboard!</p>
        {showForm && <CreateUserForm onClose={() => setShowForm(false)} />}
      </main>
    </div>
  );
};

export default AdminPage;
