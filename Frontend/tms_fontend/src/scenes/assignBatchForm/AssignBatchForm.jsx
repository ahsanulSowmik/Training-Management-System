import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";

const AssignBatchForm = () => {
  const [trainees, setTrainees] = useState([]);
  const [batches, setBatches] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState("");
  const [selectedBatchCode, setSelectedBatchCode] = useState("");
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Fetch trainee data
    axios
      .get("http://localhost:8080/api/user/get-all-trainee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTrainees(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Fetch batch data
    axios
      .get("http://localhost:8080/api/batch/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBatches(response.data.runningBatches);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleTraineeChange = (event) => {
    setSelectedTrainee(event.target.value);
  };

  const handleBatchCodeChange = (event) => {
    setSelectedBatchCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      email: selectedTrainee,
      batchCode: selectedBatchCode,
    };
    // Make the API POST request to http://localhost:8080/api/batch/add-trainee
    axios
      .post("http://localhost:8080/api/batch/add-trainee", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors if any
        console.error(error);
      });
  };

  //   const cardColor = theme.palette.mode === "light" ? "#FFFFFF" : "#313b4f";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card
        sx={{
          width: "400px",
          padding: "16px",
          backgroundColor: "#313b4f",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Assign Batch Student
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel>Select Trainee</InputLabel>
              <Select
                value={selectedTrainee}
                onChange={handleTraineeChange}
                label="Select Trainee"
              >
                <MenuItem value="">
                  <em>Select Trainee</em>
                </MenuItem>
                {trainees.map((trainee) => (
                  <MenuItem key={trainee} value={trainee}>
                    {trainee}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: "16px" }}>
              <InputLabel>Select Batch Code</InputLabel>
              <Select
                value={selectedBatchCode}
                onChange={handleBatchCodeChange}
                label="Select Batch Code"
              >
                <MenuItem value="">
                  <em>Select Batch Code</em>
                </MenuItem>
                {batches.map((batch) => (
                  <MenuItem key={batch.batchCode} value={batch.batchCode}>
                    {batch.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AssignBatchForm;
