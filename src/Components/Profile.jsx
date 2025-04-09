// Profile.jsx
import React, { useEffect, useState } from 'react';
import '../styles/Profile.css'; // Import the CSS file

function Profile() {
    const [results, setResult] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        role: '',
        email: '',
    });

    const getDetails = async () => {
        const token = localStorage.getItem("token");
        const userDetail = await fetch("http://127.0.0.1:8000/auth/user_details/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const result = await userDetail.json();
        setResult(result);
        setFormData({
            username: result.username || '',
            first_name: result.first_name || '',
            last_name: result.last_name || '',
            role: result.role || '',
            email: result.email || '',
        });
    };

    useEffect(() => {
        getDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsEditing(false);  
        console.log(formData)      
        try {
            const token = localStorage.getItem("token");
            const url = "http://127.0.0.1:8000/auth/user/updateprofile";
            const method = "PUT";
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
              alert(`user updated successfully.`);              
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
        <>
            <header className="d-flex justify-content-between align-items-center bg-dark text-white p-2 header">
                <h2>Profile Page</h2>
            </header>
            <div className="profile-container">
                <div className="profile-section">
                    <div className='content-item'>
                        <div className="form-group">
                            <label>User Name:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group">
                            <label>Role:</label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                disabled={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="text"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={true}
                            />
                        </div>
                        <div className="button-group">
                            <button onClick={handleEdit}>Edit</button>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
}

export default Profile;