import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const LogoutButton = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleLogout = () => {
    // Clear user authentication-related data from localStorage
    localStorage.removeItem("userToken");
    // localStorage.removeItem("userDetails");
    // localStorage.removeItem("role");

    // Navigate to the login page
    navigate("/login"); // Use navigate instead of history.push
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
