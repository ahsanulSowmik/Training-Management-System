import React, { useState, useEffect } from "react";
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

const TraineeUpdateProfile = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const [assignmentFile, setAssignmentFile] = useState(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    profilePicture: null,
    role: [
      {
        roleName: userRole,
      },
    ],
    trainee: {
      traineeEmail: "",
      experience: "",
      bloodGroup: "",
      resume: null,
      institute: "",
      cgpa: "",
    },
  });

  // Fetch existing data for the trainee with the given email
  useEffect(() => {
    const fetchTraineeData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/user/get/${userEmail}`, // Replace with the actual endpoint to fetch trainee data by email
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // Update the form fields with fetched data (only if the data exists and is not null)
        if (data && data.userDto) {
          const { userDto } = data;
          setFormData((prevFormData) => ({
            ...prevFormData,
            firstName: userDto.firstName || "",
            lastName: userDto.lastName || "",
            email: userDto.email || "",
            address: userDto.address || "",
            phone: userDto.phone || "",
            dateOfBirth: userDto.dateOfBirth || "",
            gender: userDto.gender || "",
            profilePicture: null,

            trainee: {
              ...prevFormData.trainee,
              traineeEmail: userDto.trainee.traineeEmail || "",
              experience: userDto.trainee.experience || "",
              bloodGroup: userDto.trainee.bloodGroup || "",
              resume: userDto.trainee.resume || null,
              institute: userDto.trainee.institute || "",
              cgpa: userDto.trainee.cgpa || "",
            },
          }));
        }
      } catch (error) {
        console.log("Error fetching trainee data:", error);
      }
    };

    fetchTraineeData();
  }, [token]); // Add token to the dependency array to refetch data if the token changes

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const pictureData = new FormData();
    pictureData.append("file", assignmentFile);

    const uploadResponse = await fetch("http://localhost:8080/api/uploadFile", {
      method: "POST",
      body: pictureData,
      headers: headers,
    });

    const { fileName } = await uploadResponse.json();
    console.log(fileName);
    
    localStorage.setItem("user", fileName);


    try {
      formData.profilePicture = fileName;
      console.log(formData.profilePicture);
      const response = await fetch("http://localhost:8080/api/user/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      toast.success(data.message);
      window.location.reload();
      console.log(data);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Check if the target property is nested within the trainee object
    if (name.startsWith("trainee.")) {
      const traineeField = name.split(".")[1]; // Get the field name within trainee
      setFormData((prevFormData) => ({
        ...prevFormData,
        trainee: {
          ...prevFormData.trainee,
          [traineeField]: value,
        },
      }));
    } else {
      // If not a nested property, update the top-level property directly
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      dateOfBirth: selectedDate,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
    }));
  };

  return (
    <Box m="20px">
      <Header title="UPDATE PROFILE" subtitle="Update Trainee Profile" />

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
          {/* The password field is excluded from this form as you mentioned it's not required */}
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
          {/* Role Field - Disabled */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Role"
            value={formData.role[0].roleName}
            disabled
            sx={{ gridColumn: "span 2" }}
          />
          {/* Other Fields from Trainee Object */}
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Trainee Email"
            onChange={handleChange}
            value={formData.trainee.traineeEmail}
            name="trainee.traineeEmail"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Experience"
            onChange={handleChange}
            value={formData.trainee.experience}
            name="trainee.experience"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Blood Group"
            onChange={handleChange}
            value={formData.trainee.bloodGroup}
            name="trainee.bloodGroup"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Institute"
            onChange={handleChange}
            value={formData.trainee.institute}
            name="trainee.institute"
            sx={{ gridColumn: "span 2" }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="CGPA"
            onChange={handleChange}
            value={formData.trainee.cgpa}
            name="trainee.cgpa"
            sx={{ gridColumn: "span 2" }}
          />
          {/* Profile Picture Input */}
          <Box sx={{ marginBottom: "20px" }}>
            <InputLabel>Assignment File</InputLabel>
            <TextField
              type="file"
              onChange={(e) => setAssignmentFile(e.target.files[0])}
              fullWidth
            />
          </Box>
          =
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button type="submit" color="secondary" variant="contained">
            Update Profile
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default TraineeUpdateProfile;
