import React, { useState } from "react";

const CreateUserForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "", // added the role field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ width: "600px",height:"380px" }}>
        <h4 className="mb-3 text-center">Create User</h4>
        <form onSubmit={handleSubmit} className="row">
          {/* User Name Field */}
          <div className="mb-3 col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="User Name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>

          {/* First Name Field */}
          <div className="mb-3 col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name Field */}
          <div className="mb-3 col-12 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="mb-3 col-12 col-md-6">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="mb-3 col-12 col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3 col-12 col-md-6">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Role Field */}
          <div className="mb-3 col-12 col-md-6">
            <select
              className="form-select"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end col-12">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
