import React from "react";
import "../styles/HomePage.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";

const HomePage = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand text-white" style={{fontWeight:"600",fontSize:"25px"}} to="/">TodoApp</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link btn-login btn btn-outline-light me-2 px-4" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-Sign btn btn-outline-light me-2 px-4" to="/signup">Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <div className="container text-center mt-5">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <h1 className="display-4">Manage Your Tasks Effortlessly</h1>
                    <p className="lead">
                      Stay organized and boost productivity with TodoApp. Create, track, and complete your tasks seamlessly.
                    </p>
                    <ul className="list-unstyled mt-3">
                      <li>✔ Create and manage tasks easily</li>
                      <li>✔ Organize tasks into categories</li>
                      <li>✔ Set deadlines and reminders</li>
                    </ul>
                    <Link className="btn btn-primary btn-lg mt-3" to="/signup">Get Started</Link>
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default HomePage;