import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const [username, setEmail] = useState("vishal");
  // const [password, setPassword] = useState("vishal@06");
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        // Store token and role in localStorage
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("role", result.userdata.role);
        localStorage.setItem("username", result.userdata.username);

        // Redirect based on role
        if (result.userdata.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError(result.detail || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row shadow-lg rounded overflow-hidden" style={{ width: "800px" }}>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="../images/Todo.jpg"
            alt="Login Visual"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 p-4 bg-white">
          <h2 className="text-center mb-4">Login</h2>
          <form className="border p-3 rounded" onSubmit={handleLogin}>
            <div className="mb-3 col-12">
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 col-12">
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-danger text-center">{error}</p>}

            {/* Submit Button */}
            <div className="d-flex justify-content-end col-12">
              <button type="submit" className="btn btn-primary w-100">
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="text-center mt-3">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
