import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateAssignment = () => {
  const [data, setData] = useState([]);
  const [selectedScheduleCode, setSelectedScheduleCode] = useState("");
  const [assignmentQuestion, setAssignmentQuestion] = useState("");
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [lastDateOfSubmission, setLastDateOfSubmission] = useState("");

  const token = localStorage.getItem("userToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    // Fetch the userEmail from localStorage or set it if needed
    var userEmail = localStorage.getItem("userEmail");

    const apiUrl = `http://localhost:8080/api/batch/get-trainer's-schedules/${userEmail}`;

    // Create an options object with the necessary headers
    const options = {
      headers: {
        Authorization: `Bearer ${token}`, // Make sure to replace "token" with the actual token value
      },
    };

    fetch(apiUrl, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        if (data.length > 0) {
          setSelectedScheduleCode(data[0].batchCode);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSubmit = async () => {
    try {
      // Step 1: Upload the file
      const formData = new FormData();
      formData.append("file", assignmentFile);

      const uploadResponse = await fetch(
        "http://localhost:8080/api/uploadFile",
        {
          method: "POST",
          body: formData,
          headers: headers,
        }
      );

      const { fileName } = await uploadResponse.json();

      // Step 2: Create the assignment
      const assignmentData = {
        assignment: {
          question: assignmentQuestion,
          assignmentFile: fileName,
          endTime: lastDateOfSubmission,
        },
        schedule: selectedScheduleCode,
      };

      console.log(assignmentData);

      // Step 3: Send the POST request to create the assignment
      const createAssignmentResponse = await fetch(
        "http://localhost:8080/api/schedule/add-assignment",
        {
          method: "POST",
          body: JSON.stringify(assignmentData),
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        }
      );

      if (createAssignmentResponse.ok) {
        // Show the success toast
        toast.success("Assignment created successfully!");

        setSelectedScheduleCode("");
        setAssignmentQuestion("");
        setAssignmentFile(null);
        setLastDateOfSubmission("");
        window.location.href = "/assigned-assignment";
      } else {
        toast.error("Error creating assignment. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Error creating assignment. Please try again later.");
    }
  };

  return (
    <Box m="20px">
      <h2>Create Assignment</h2>
      <FormControl fullWidth variant="filled" sx={{ marginBottom: "20px" }}>
        <InputLabel>Batch Code</InputLabel>
        <Select
          value={selectedScheduleCode}
          onChange={(e) => setSelectedScheduleCode(e.target.value)}
        >
          {data.map((schedule) => (
            <MenuItem key={schedule.scheduleId} value={schedule.scheduleId}>
              {schedule.batchCode}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        variant="filled"
        fullWidth
        label="Assignment Question"
        value={assignmentQuestion}
        onChange={(e) => setAssignmentQuestion(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        variant="filled"
        fullWidth
        label="Last Date of Submission"
        type="datetime-local" // Using 'datetime-local' to capture date and time
        value={lastDateOfSubmission}
        onChange={(e) => setLastDateOfSubmission(e.target.value)}
        sx={{ marginBottom: "20px" }}
      />
      <Box sx={{ marginBottom: "20px" }}>
        <InputLabel>Assignment File</InputLabel>
        <TextField
          type="file"
          onChange={(e) => setAssignmentFile(e.target.files[0])}
          fullWidth
        />
      </Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Create Assignment
        </Button>
      </Box>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default CreateAssignment;
