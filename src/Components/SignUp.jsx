import React from "react";

const SignUp = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="row shadow-lg rounded overflow-hidden" style={{ width: "800px" }}>
        {/* Image Section */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src="../images/Todo.jpg"
            alt="SignUp Visual"
            className="img-fluid h-100 w-100"            
          />
        </div>

        {/* Form Section */}
        <div className="col-md-6 p-4 bg-white">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form className="border p-3 rounded">
          <div className="row mb-3 text-start">
              
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input type="password" className="form-control" placeholder="Enter First Name" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input type="password" className="form-control" placeholder="Last Name" required />
              </div>
            </div>

            {/* Email Address Field */}
            <div className="mb-3 text-start">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" placeholder="Enter email" required />
            </div>

            {/* Password and Confirm Password in the same row */}
            <div className="row mb-3 text-start">
              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter password" required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" placeholder="Confirm password" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <p className="text-center mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
