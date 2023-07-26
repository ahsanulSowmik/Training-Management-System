import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);

  // Function to fetch data from the API
  const fetchData = async (token) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/batch/get/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.runningBatches;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log(token);
    if (token) {
      fetchData(token)
        .then((runningBatches) => {
          setData(runningBatches);
        })
        .catch((error) => {});
    } else {
    }
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="10px">
      <Header title="BJIT Academy" subtitle="Empower Your Future with Us" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "130px",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            width: "400px",
            height: "200px",
            marginRight: "10px",
            backgroundColor: colors.primary[400],
          }}
        >
          <Table
            size="small"
            style={{ borderBottom: `1px solid ${colors.grey[800]}` }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: colors.grey[100],
                    backgroundColor: "#3e4396",
                    fontSize: "1.2em",
                    borderBottom: "none",
                  }}
                >
                  Batch Code
                </TableCell>
                <TableCell
                  style={{
                    color: colors.grey[100],
                    backgroundColor: "#3e4396",
                    fontSize: "1.2em",
                    borderBottom: "none",
                  }}
                >
                  Trainees' Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((batch) => (
                <TableRow
                  key={batch.batchCode}
                  style={{ borderBottom: `1px solid ${colors.grey[500]}` }}
                >
                  <TableCell
                    style={{
                      color: colors.grey[100],
                      borderBottom: "none",
                    }}
                  >
                    {batch.batchCode}
                  </TableCell>
                  <TableCell
                    style={{
                      color: colors.grey[100],
                      borderBottom: "none",
                    }}
                  >
                    {batch.trainees.map((trainee) => (
                      <div key={trainee} style={{ whiteSpace: "pre-line" }}>
                        {trainee}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Second Table - Course code wise trainers' email */}
        <TableContainer
          component={Paper}
          style={{
            width: "400px",
            height: "200px",
            marginLeft: "10px",
            backgroundColor: colors.primary[400],
          }}
        >
          <Table
            size="small"
            style={{ borderBottom: `1px solid ${colors.grey[800]}` }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    color: colors.grey[100],
                    backgroundColor: "#3e4396",
                    fontSize: "1.2em",
                    borderBottom: "none",
                  }}
                >
                  Course Code
                </TableCell>
                <TableCell
                  style={{
                    color: colors.grey[100],
                    backgroundColor: "#3e4396",
                    fontSize: "1.2em",
                    borderBottom: "none",
                  }}
                >
                  Trainers' Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.flatMap((batch) =>
                batch.schedules.map((schedule) => (
                  <TableRow
                    key={schedule.scheduleId}
                    style={{ borderBottom: `1px solid ${colors.grey[500]}` }}
                  >
                    <TableCell
                      style={{
                        color: colors.grey[100],
                        borderBottom: "none",
                      }}
                    >
                      {schedule.courseCode}
                    </TableCell>
                    <TableCell
                      style={{
                        color: colors.grey[100],
                        borderBottom: "none",
                      }}
                    >
                      {schedule.trainerEmail}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Box>
  );
};

export default Dashboard;
