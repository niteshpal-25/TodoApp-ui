import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import AdminPage from "./Components/AdminPage";
import NotFound from "./Components/NotFound";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import ProtectedRoute from "./Components/ProtectedRoute";
import UserPage from "./Components/UserPage";
import Profile from "./Components/Profile";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
