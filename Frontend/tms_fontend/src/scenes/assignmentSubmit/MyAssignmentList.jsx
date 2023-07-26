import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Modal,
  Typography,
  TextField,
  IconButton,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SendIcon from "@mui/icons-material/Send";

const MyAssignmentList = () => {
  const [data, setData] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [answer, setAnswer] = useState("");
  const [answerFile, setAnswerFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchCode, setBatchCode] = useState("");
  const token = localStorage.getItem("userToken");

  const fetchData = async () => {
    try {
      // Fetch the userEmail from localStorage or set it if needed
      var userEmail = localStorage.getItem("userEmail");

      const apiUrl = `http://localhost:8080/api/batch/get-by-mail/${userEmail}`;
      const token = localStorage.getItem("userToken"); // Fetch the token from localStorage
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });
      setData(response.data);
      if (response.data.length > 0) {
        setBatchCode(response.data[0].batchCode);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleModalOpen = (assignment) => {
    setSelectedAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedAssignment(null);
    setIsModalOpen(false);
    setAnswer("");
    setAnswerFile(null);
  };

  const handleSubmitAssignment = async () => {
    try {
      // Step 1: Upload the file
      const formData = new FormData();
      formData.append("file", answerFile);
      const token = localStorage.getItem("userToken"); // Fetch the token from localStorage
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const uploadResponse = await axios.post(
        "http://localhost:8080/api/uploadFile",
        formData,
        { headers }
      );
      const { fileName } = uploadResponse.data;

      // Step 2: Create the assignment
      const currentDate = new Date();
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      const submitAssignmentRequest = {
        answer: {
          //   answerId: selectedAssignment.assignmentId, // Assign a unique answerId if needed
          answer: answer,
          answerFile: fileName, // Use the file URL returned from the upload API
          evaluation: "Pending",
          traineeEmail: localStorage.getItem("userEmail"), // Replace with the trainee's email
        },
        assignmentId: selectedAssignment.assignmentId,
        batchCode: batchCode,
      };

      // Step 3: Send the POST request to create the assignment
      const createAssignmentResponse = await axios.post(
        "http://localhost:8080/api/schedule/add-assignment-answer",
        submitAssignmentRequest,
        { headers }
      );

      if (createAssignmentResponse.status === 200) {
        // Show the success toast
        toast.success("Assignment created successfully!");

        setSelectedAssignment(null);
        setIsModalOpen(false);
        setAnswer("");
        setAnswerFile(null);
        window.location.href = "/my-assignment";
      } else {
        toast.error("Error creating assignment. Please try again later.");
      }
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Error creating assignment. Please try again later.");
    }
  };

  const isSubmissionOver = (endTime) => {
    const currentTime = new Date();
    const endTimeDate = new Date(endTime);
    return endTimeDate < currentTime;
  };

  return (
    <Box m="20px">
      <h2 style={{ color: "white", marginBottom: "10px" }}>All Assignments</h2>

      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Link to="/my-submission" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            All Submissions
          </Button>
        </Link>
      </div>
      <TableContainer
        component={Paper}
        style={{ backgroundColor: "#3b4558", padding: "15px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Assignment ID</TableCell>
              <TableCell style={{ color: "white" }}>Question</TableCell>
              <TableCell style={{ color: "white" }}>Assignment File</TableCell>
              <TableCell style={{ color: "white" }}>Submission Date</TableCell>
              <TableCell style={{ color: "white" }}>
                Submit Assignment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((schedule) =>
              schedule.schedules.map((scheduleItem) =>
                scheduleItem.assignments.map((assignment) => (
                  <TableRow key={assignment.assignmentId}>
                    <TableCell style={{ color: "white" }}>
                      {assignment.assignmentId}
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      {assignment.question}
                    </TableCell>

                    <TableCell>
                      <div>
                        <p style={{ fontSize: "13px" }}>
                          <a
                            href={`http://localhost:8080/api/downloadFile/${assignment.assignmentFile}`}
                            download
                            style={{ color: "blue" }} // Replace "blue" with your desired color
                          >
                            {assignment.assignmentFile}
                          </a>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell style={{ color: "white" }}>
                      {assignment.endTime}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleModalOpen(assignment)}
                        variant="contained"
                        color={
                          isSubmissionOver(assignment.endTime)
                            ? "secondary"
                            : "primary"
                        } // Change color based on endTime
                        disabled={isSubmissionOver(assignment.endTime)}
                        // Disable button if endTime is over current time
                      >
                        Submit Assignment
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Assignment ID:{" "}
            {selectedAssignment && selectedAssignment.assignmentId}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Question: {selectedAssignment && selectedAssignment.question}
          </Typography>
          <TextField
            label="Answer"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          {/* <input
            type="file"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            onChange={(e) => setAnswerFile(e.target.files[0])}
          /> */}
          <Box sx={{ marginBottom: "20px" }}>
            <InputLabel>Assignment File</InputLabel>
            <TextField
              type="file"
              onChange={(e) => setAnswerFile(e.target.files[0])}
              fullWidth
            />
          </Box>
          <IconButton
            aria-label="submit-assignment"
            onClick={handleSubmitAssignment}
            sx={{ marginTop: 2 }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Modal>
      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default MyAssignmentList;
