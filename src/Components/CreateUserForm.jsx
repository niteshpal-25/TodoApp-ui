import React, { useState, useEffect } from "react";

const CreateUserForm = ({ onClose, initialData }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    confirmPassword: "",
    ...initialData,
  });


  useEffect(() => {
    if (initialData) {
      setFormData({
        username: initialData.username,
        first_name: initialData.first_name,
        last_name: initialData.last_name,
        email: initialData.email,
        role: initialData.role,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      setError("User Name is required");
      return
    }
    else if (!formData.first_name.trim()) {
      setError("First Name is required");
      return
    } else if (!formData.last_name.trim()) {
      setError("Last Name is required");
      return
    } else if (!formData.email.trim()) {
      setError("Email is required");
      return
    } else if (!formData.username.trim()) {
      setError("Username is required");
      return
    } else if (!formData.password.trim()) {
      setError("Password is required");
      return
    } else if (!formData.confirmPassword.trim()) {
      setError("Confirm Password is required");
      return
    } else if (formData.password.trim() !== formData.confirmPassword.trim()) {
      setError("Passwords must match");
      return
    } else {
      setError("");
      CreateUser();
    };
  }

  const CreateUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://127.0.0.1:8000/admin/user";
      const method = "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`User Created Successfully.`);
        onClose(); // close modal
      } else {
        console.error("Validation Error:", data);
        setError(data.message || "Error while saving To Do.");
      }

    } catch (error) {
      console.error("Request Error:", error);
      setError("Unexpected error occurred.");
    }
  }

  return (
    <div >
      <div >
        {initialData && initialData.username ? (
          <div className="modal-overlay d-flex justify-content-center align-items-center">
            <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ width: "600px", height: "300px" }}>
              <h4 className="mb-3 text-center">Edit User</h4>
              <div style={{ color: "red;" }}>
                <h6 className="mb-3 text-center" style={{ color: "red;" }}>{error}</h6>
              </div>


              <form onSubmit={handleSubmit} className="row">
                {/* User Name Field */}
                <div className="mb-3 col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {/* First Name Field */}
                <div className="mb-3 col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name Field */}
                <div className="mb-3 col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
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
        ) : (
          <div className="modal-overlay d-flex justify-content-center align-items-center">
            <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ width: "600px", height: "380px" }}>
              <h4 className="mb-3 text-center">Create User</h4>
              <div style={{ color: "red;" }}>
                <h6 className="mb-3 text-center" style={{ color: "red;" }}>{error}</h6>
              </div>


              <form onSubmit={handleSubmit} className="row">
                {/* User Name Field */}
                <div className="mb-3 col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>

                {/* First Name Field */}
                <div className="mb-3 col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>

                {/* Last Name Field */}
                <div className="mb-3 col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="last_name"
                    value={formData.last_name}
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
        )}
      </div>

    </div>
  );
};

export default CreateUserForm;
