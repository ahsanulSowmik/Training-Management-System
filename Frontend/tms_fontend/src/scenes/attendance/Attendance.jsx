import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Attendance = () => {
    const [batchCode, setBatchCode] = useState("");
    const [batchOptions, setBatchOptions] = useState([]);
    const [traineeList, setTraineeList] = useState([]);
    const token = localStorage.getItem("userToken");

    useEffect(() => {
        // Fetch batch code options from the API
        axios
            .get("http://localhost:8080/api/batch/get/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setBatchOptions(
                    response.data.runningBatches.map((batch) => batch.batchCode)
                );
            })
            .catch((error) => {
                console.error("Error fetching batch codes:", error);
            });
    }, [token]);

    useEffect(() => {
        console.log("Fetching trainee list for batch:", batchCode);
        if (batchCode) {
            axios
                .get(`http://localhost:8080/api/batch/get/${batchCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("Trainee list response:", response.data);
                    if (response.data && response.data.batch && response.data.batch.trainees) {
                        setTraineeList(response.data.batch.trainees);
                    } else {
                        console.error("Unexpected response format:", response.data);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching trainees:", error);
                });
        }
    }, [batchCode, token]);

    const handleAttendance = (traineeEmail, isPresent) => {
        const attendanceData = {
            traineeName: traineeEmail,
            attendanceDate: new Date().toISOString().split('T')[0],
            batchCode: batchCode,
            present: isPresent,
        };

        // Send the data to the backend API
        axios.post("http://localhost:8080/api/attendance/add", attendanceData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("Attendance marked successfully:", response.data);
                toast.success(`Attendance marked for ${traineeEmail}`);
            })
            .catch((error) => {
                console.error("Error marking attendance:", error);
                toast.error("Error marking attendance");
            });
    };

    return (
        <Box m="20px">
            <h2>Attendance</h2>
            <form>
                <Box display="grid" gap="30px" gridTemplateColumns="1fr">
                    <Box>
                        <FormControl fullWidth variant="filled">
                            <InputLabel>Batch Code</InputLabel>
                            <Select
                                value={batchCode}
                                onChange={(e) => setBatchCode(e.target.value)}
                                label="Batch Code"
                            >
                                <MenuItem value="">
                                    <em>Select Batch Code</em>
                                </MenuItem>
                                {batchOptions.map((code) => (
                                    <MenuItem key={code} value={code}>
                                        {code}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </form>
            {traineeList.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Trainee Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {traineeList.map((traineeEmail) => (
                                <TableRow key={traineeEmail}>
                                    <TableCell>{traineeEmail}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleAttendance(traineeEmail, true)}
                                        >
                                            Attend
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleAttendance(traineeEmail, false)}
                                            style={{ backgroundColor: "red", color: "white" }}
                                        >
                                            Absence
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <ToastContainer />
        </Box>
    );
};

export default Attendance;
