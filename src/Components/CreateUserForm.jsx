import React from "react";

const CreateUserForm = ({ onClose }) => {
  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ width: "400px" }}>
        <h4 className="mb-3">Create User</h4>
        <form>
          <div className="mb-3 text-start">
            <label className="form-label d-block">Name</label>
            <input type="text" className="form-control" placeholder="Enter name" />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label d-block">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label d-block">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary me-2" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-success">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
