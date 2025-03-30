import React, { useState } from "react";
import '../styles/CreateTodoForm.css'

const CreateTodoForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    Priority: "",
    Complete: false
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
    console.log(formData);
  };

  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ width: "300px" }}>
        <h4 className="mb-4 text-center">Create Todo</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Title"
              name="Title"
              value={formData.Title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Description"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Priority"
              name="Priority"
              value={formData.Priority}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <select
              className="form-control text-center"
              name="Complete"
              value={formData.Complete}
              onChange={handleChange}
            >
              <option value={false}>Flase</option>
              <option value={true}>True</option>
            </select>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            
            <button 
              type="submit" 
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTodoForm;