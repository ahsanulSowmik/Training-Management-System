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
  Typography,
} from "@mui/material";
import Header from "../../components/Header";

const MySubmission = () => {
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const userEmail = localStorage.getItem("userEmail");
        const response = await axios.get(
          `http://localhost:8080/api/user/submission/${userEmail}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div style={{ margin: "20px" }}>
      <Header title="Your Submission" />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  backgroundColor: "#3b4558",
                  color: "white",
                  fontSize: "13px",
                }}
              >
                Answer ID
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3b4558",
                  color: "white",
                  fontSize: "13px",
                }}
              >
                Answer
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3b4558",
                  color: "white",
                  fontSize: "13px",
                }}
              >
                Answer File
              </TableCell>
              <TableCell
                style={{
                  backgroundColor: "#3b4558",
                  color: "white",
                  fontSize: "13px",
                }}
              >
                Evaluation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.answerId}>
                <TableCell style={{ fontSize: "13px" }}>
                  {assignment.answerId}
                </TableCell>
                <TableCell style={{ fontSize: "13px" }}>
                  {assignment.answer}
                </TableCell>
                <TableCell>
                  <p style={{ fontSize: "13px" }}>
                    <a
                      href={`http://localhost:8080/api/downloadFile/${assignment.answerFile}`}
                      download
                    >
                      {assignment.answerFile}
                    </a>
                  </p>
                </TableCell>
                <TableCell>
                  <p style={{ fontSize: "13px" }}>{assignment.evaluation}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MySubmission;
