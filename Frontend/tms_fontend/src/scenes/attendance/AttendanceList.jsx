import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Box,
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

const AttendanceList = () => {
    const [batchCode, setBatchCode] = useState("");
    const [batchOptions, setBatchOptions] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const token = localStorage.getItem("userToken"); // Assuming you have the token stored in local storage

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
        if (batchCode) {
            // Fetch attendance list for the selected batch from the API
            axios
                .get(`http://localhost:8080/api/attendance/all?batchCode=${batchCode}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setAttendanceList(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching attendance:", error);
                });
        }
    }, [batchCode, token]);

    return (
        <Box m="20px">
            <h2>Attendance List</h2>
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
            {attendanceList.length > 0 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Trainee Email</TableCell>
                                <TableCell>Attendance Date</TableCell>
                                <TableCell>Present</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {attendanceList.map((attendance) => (
                                <TableRow key={attendance.id}>
                                    <TableCell>{attendance.traineeName}</TableCell>
                                    <TableCell>{attendance.attendanceDate}</TableCell>
                                    <TableCell>{attendance.present ? "Yes" : "No"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default AttendanceList;
