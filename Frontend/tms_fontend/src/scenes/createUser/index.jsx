import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { DatePicker } from "@mui/lab";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem("userToken");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/create-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        toast.success(data.message);
        console.log(data);
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.firstName);
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error);
      console.log("Error creating user:2", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth: selectedDate,
    }));
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <form onSubmit={handleFormSubmit}>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="First Name"
            onChange={handleChange}
            value={formData.firstName}
            name="firstName"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Last Name"
            onChange={handleChange}
            value={formData.lastName}
            name="lastName"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="email"
            label="Email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="tel" // Set the type attribute to "tel" for phone numbers
            label="Phone"
            onChange={handleChange}
            value={formData.phone}
            name="phone"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Address"
            onChange={handleChange}
            value={formData.address}
            name="address"
            sx={{ gridColumn: "span 2" }}
          />

          <TextField
            fullWidth
            variant="filled"
            type="password" // Set the type attribute to "password"
            label="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            id="date-field"
            label="Select a date"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ gridColumn: "span 2" }}
          />
          <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              onChange={handleChange}
              name="gender"
              label="Gender"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Create New User
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default Form;
