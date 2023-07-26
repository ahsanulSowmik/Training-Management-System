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
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const AllSubmission = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState("");
  const [mark, setMark] = useState("");
  const tableStyle = {
    marginLeft: "20px",
    marginRight: "20px",
  };
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchData(assignmentId);
  }, [assignmentId]);

  const fetchData = async (assignmentId) => {
    try {
      const apiUrl = `http://localhost:8080/api/schedule/assignment/${assignmentId}/all-answer`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(apiUrl, { headers });
      setSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddMarkClick = (answerId) => {
    setSelectedAnswerId(answerId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleMarkChange = (event) => {
    setMark(event.target.value);
  };

  const handleMarkSubmit = async () => {
    try {
      const apiUrl = `http://localhost:8080/api/schedule/add-assignment-answer-evaluate`;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        answerId: selectedAnswerId,
        evaluation: mark,
      };

      const response = await axios.post(apiUrl, data, { headers });

      if (response.status === 200) {
        // Mark successfully submitted

        setShowModal(false);
        setMark("");
        fetchData(assignmentId); // Refresh the table data after submitting the mark
      } else {
        alert("Failed to submit mark. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting mark:", error);
      alert("An error occurred while submitting the mark. Please try again.");
    }
  };

  return (
    <div style={tableStyle}>
      <Header title="Submitted Answer" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Answer ID</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Answer File</TableCell>
              <TableCell>Evaluation</TableCell>
              <TableCell>Trainee Email</TableCell>
              <TableCell>Add Mark</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.answerId}>
                <TableCell>{submission.answerId}</TableCell>
                <TableCell>{submission.answer}</TableCell>
                <TableCell>
                  <div>
                    <p style={{ fontSize: "13px" }}>
                      <a
                        href={`http://localhost:8080/api/downloadFile/${submission.answerFile}`}
                        download
                        style={{ color: "blue" }}
                      >
                        {submission.answerFile}
                      </a>
                    </p>
                  </div>
                </TableCell>
                <TableCell>{submission.evaluation}</TableCell>
                <TableCell>{submission.traineeEmail}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleAddMarkClick(submission.answerId)}
                    variant="contained"
                    color="secondary"
                  >
                    Add Mark
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding mark */}
      <Modal open={showModal} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Add Mark for Answer ID: {selectedAnswerId}</h2>
          <TextField
            label="Mark"
            variant="outlined"
            value={mark}
            onChange={handleMarkChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleMarkSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AllSubmission;
