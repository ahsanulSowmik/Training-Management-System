import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseScheduling = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [scheduleStartTime, setScheduleStartTime] = useState("");
  const [scheduleEndTime, setScheduleEndTime] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [batchCode, setBatchCode] = useState("");
  const [trainerEmailOptions, setTrainerEmailOptions] = useState([]);
  const [batchCodeOptions, setBatchCodeOptions] = useState([]);
  const [courseCodeOptions, setCourseCodeOptions] = useState([]);
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Fetch trainer email options from the API
    axios
      .get("http://localhost:8080/api/user/get-all-trainer", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTrainerEmailOptions(response.data); // Assuming the API response is an array of trainer emails
      })
      .catch((error) => {
        console.error("Error fetching trainer emails:", error);
      });

    // Fetch batch code options from the API
    axios
      .get("http://localhost:8080/api/batch/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBatchCodeOptions(
          response.data.runningBatches.map((batch) => batch.batchCode)
        );
      })
      .catch((error) => {
        console.error("Error fetching batch codes:", error);
      });

    // Fetch course code options from the API
    axios
      .get("http://localhost:8080/api/course/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourseCodeOptions(
          response.data.runningCourses.map((course) => course.courseCode)
        );
      })
      .catch((error) => {
        console.error("Error fetching course codes:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can handle the form submission and send the data to the backend API
    const formData = {
      startDate,
      endDate,
      scheduleStartTime,
      scheduleEndTime,
      courseCode,
      trainerEmail,
      batchCode,
    };
    console.log(formData);

    axios
      .post("http://localhost:8080/api/batch/add-schedule", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Schedule added successfully!");
        console.log(response.data);
        toast.success(response.data.message);
        setStartDate("");
        setEndDate("");
        setScheduleStartTime("");
        setScheduleEndTime("");
        setCourseCode("");
        setTrainerEmail("");
        setBatchCode("");
      })
      .catch((error) => {
        console.log("Error adding schedule:", error);
        toast.error(error.response.data.message);
        console.error("Error adding schedule:", error);
      });
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="center" mt="20px">
        <Link to="/schedules">
          <Button type="submit" color="secondary" variant="contained">
            <FormatListBulletedIcon />
            List of all Schedule
          </Button>
        </Link>
      </Box>
      <h2>Course Scheduling</h2>

      <form onSubmit={handleSubmit}>
        <Box display="grid" gap="30px" gridTemplateColumns="1fr 1fr">
          <Box>
            <TextField
              fullWidth
              id="date-field"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              id="date-field"
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              variant="filled"
              type="time"
              label="Schedule Start Time"
              value={scheduleStartTime}
              onChange={(e) => setScheduleStartTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              variant="filled"
              type="time"
              label="Schedule End Time"
              value={scheduleEndTime}
              onChange={(e) => setScheduleEndTime(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box>
            <FormControl fullWidth variant="filled">
              <InputLabel>Course Code</InputLabel>
              <Select
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                label="Course Code"
              >
                <MenuItem value="">
                  <em>Select Course Code</em>
                </MenuItem>
                {courseCodeOptions.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl fullWidth variant="filled">
              <InputLabel>Trainer Email</InputLabel>
              <Select
                value={trainerEmail}
                onChange={(e) => setTrainerEmail(e.target.value)}
                label="Trainer Email"
              >
                <MenuItem value="">
                  <em>Select Trainer Email</em>
                </MenuItem>
                {trainerEmailOptions.map((email) => (
                  <MenuItem key={email} value={email}>
                    {email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
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
                {batchCodeOptions.map((code) => (
                  <MenuItem key={code} value={code}>
                    {code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  );
};

export default CourseScheduling;
