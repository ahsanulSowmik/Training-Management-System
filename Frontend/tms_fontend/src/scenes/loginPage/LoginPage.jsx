import React, { useState } from "react";
import axios from "axios";
import { Paper, Typography, TextField, Button, Grid } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ handleLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const userData = {
      email,
      password,
    };

    axios
      .post("http://localhost:8080/auth/login", userData)
      .then((response) => {
        localStorage.setItem("userToken", response.data.jwtToken);
        localStorage.setItem("userRole", response.data.user.role[0].roleName);
        console.log(response.data.user.name);
        localStorage.setItem(
          "userName",
          response.data.user.firstName + " " + response.data.user.lastName
        );
        localStorage.setItem("userEmail", response.data.user.email);
        localStorage.setItem("user", response.data.user.profilePicture);

        toast.success("Login Successful!");
        handleLoginSuccess();
      })
      .catch((error) => {
        console.error("Login error:", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography
            variant="h1"
            style={{ color: "white", fontWeight: "bold" }}
            gutterBottom
          >
            <br />
            BJIT Academy
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            fullWidth
          >
            Log In
          </Button>
        </Paper>
      </Grid>
      <ToastContainer />
    </Grid>
  );
};

export default LoginPage;
