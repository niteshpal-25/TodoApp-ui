import React, { useState, useEffect } from "react";
import '../styles/CreateTodoForm.css'

const CreateTodoForm = ({ onClose, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    complete: false,
    ...initialData,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        complete: initialData.complete === "true" || initialData.complete === true
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate priority
    const validPriorities = ["Low", "Medium", "High"];
    if (!validPriorities.includes(formData.priority)) {
      setError("Priority must be one of: Low, Medium, High.");
      return;
    }else{
      setError("")
    }

    try {
      const token = localStorage.getItem("token");
      const url = initialData?.id
        ? `http://127.0.0.1:8000/todos/${initialData.id}/`
        : "http://127.0.0.1:8000/todos/todo/";
      const method = initialData?.id ? "PUT" : "POST";
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
        alert(`To Do ${initialData?.id ? "updated" : "created"} successfully.`);
        onClose(); // close modal
      } else {
        console.error("Validation Error:", data);
        setError(data.message || "Error while saving To Do.");
      }

    } catch (error) {
      console.error("Request Error:", error);
      setError("Unexpected error occurred.");
    }
  };


  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center">
      <div className="modal-content bg-white p-4 rounded shadow-lg" style={{ width: "300px" }}>
        {error && <p className="text-danger text-center">{error}</p>}
        <h4 className="mb-4 text-center">Create Todo</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange} required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control text-center"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange} required
            />
          </div>

          <div className="mb-3">
            <select
              className="form-control text-center"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="mb-3">
            <select
              className="form-control text-center"
              name="complete"
              value={formData.complete}
              onChange={handleChange}
            >
              <option value={false}>False</option>
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