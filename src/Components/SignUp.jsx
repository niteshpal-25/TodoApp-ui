import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("https://your-api.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign Up successful! Please log in.");
        window.location.href = "/login";
      } else {
        setError(data.message || "Sign Up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ overflow: 'hidden' }}>
      <div className="row shadow-lg rounded overflow-hidden" style={{ width: "800px" }}>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="../images/Todo.jpg"
            alt="SignUp Visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "contain", backgroundColor: "white" }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 p-4 bg-white">
          <h2 className="text-center mb-3">Sign Up</h2>
          <form className="border p-3 rounded" onSubmit={handleSignUp}>
            {/* Username Field */}
            <div className="mb-2 text-start">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* First Name Field */}
            <div className="mb-2 text-start">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="mb-2 text-start">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Address Field */}
            <div className="mb-2 text-start">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-2 text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-3 text-start">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-2">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
