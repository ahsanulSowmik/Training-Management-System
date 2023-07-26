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
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignedAssignment = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch the userEmail from localStorage or set it if needed
      var userEmail = localStorage.getItem("userEmail");

      const apiUrl = `http://localhost:8080/api/batch/get-trainer's-schedules/${userEmail}`;
      const token = localStorage.getItem("userToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(apiUrl, { headers });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const viewAllAnswers = (assignmentId) => {
  //   // Implement view all answers functionality here
  //   alert(`View all answers for Assignment ID: ${assignmentId}`);
  // };

  const deleteAssignment = async (assignmentId, scheduleId) => {
    try {
      const token = localStorage.getItem("userToken");
      const removeAssignmentRequest = {
        assignmentId: assignmentId,
        scheduleId: scheduleId,
      };

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:8080/api/schedule/remove-assignment",
        removeAssignmentRequest,
        { headers }
      );

      if (response.status === 200) {
        fetchData();
      } else {
        toast.error("Error deleting assignment. Please try again later.");
      }
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Error deleting assignment. Please try again later.");
    }
  };

  return (
    <Box m="20px">
      <h2 style={{ color: "white", marginBottom: "10px" }}>
        Your Assigned Assignments
      </h2>
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Link to="/create-assignment" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="secondary">
            Create Assignment
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
              <TableCell style={{ color: "white" }}>View All Answers</TableCell>
              <TableCell style={{ color: "white" }}>
                Delete Assignment
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((schedule) =>
              schedule.assignments.map((assignment) => (
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
                  <TableCell>
                    <Link
                      to={`/${encodeURIComponent(
                        assignment.assignmentId
                      )}/all-submission`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained" color="secondary">
                        View Answers
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        deleteAssignment(
                          assignment.assignmentId,
                          schedule.scheduleId
                        )
                      }
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssignedAssignment;
