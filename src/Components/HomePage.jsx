import React from "react";
import "../styles/HomePage.css"; 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp";


const HomePage = () => {
  return (
    <Router>
      <div className="homepage">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-light">
          <div className="container">
            <Link className="navbar-brand text-primary fw-bold fs-4" to="/">
              TodoApp
            </Link>
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
                  <Link className="nav-link btn btn-outline-light me-2 px-4 btn-login" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-outline-light px-4 btn-Sign" to="/signup">
                    Sign Up
                  </Link>
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
              <div className="container text-center mt-5 text-white homepage-content">
                <h1 className="display-4 fw-bold task-heading" style={{ textAlign: "left"}}>Manage Your Tasks Effortlessly</h1>
                <p className="lead task-subheading" style={{ textAlign: "left" }}>
                  Stay organized and boost productivity with TodoApp. Create, track, and complete your tasks seamlessly.
                </p>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-5" style={{ paddingBottom: "40px" }}>
                  {[
                    { title: "Goal Tracking", img: "/images/GoalTracking.jpg" },
                    { title: "Time Management", img: "/images/TimeManagement.jpg" },
                    { title: "Focused", img: "/images/Focused.png" },
                    { title: "Reduce Stress", img: "/images/ReduceStress.jpg" }
                  ].map((card, index) => (
                    <div key={index} className="col">
                      <div className="card h-100 custom-card shadow-lg">
                        <div className="card-img-container">
                        <img src={card.img} className="card-img-top" alt={card.title} style={{ maxWidth: "80%", display: "block", paddingTop:"5px" }} />
                        </div>
                        <div className="card-body text-center card-body-custom" style={{ paddingTop: "10px", margin:"0px"}}>
                          <h6 className="card-title">{card.title}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
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
