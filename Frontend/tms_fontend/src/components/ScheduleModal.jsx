import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import ScheduleIcon from "@mui/icons-material/Schedule";
import axios from "axios";

const ScheduleModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    scheduleStartTime: "",
    scheduleEndTime: "",
    courseCode: "",
    trainerEmail: "",
    batchCode: "",
  });

  const [trainerOptions, setTrainerOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    // Fetch trainer data from API
    axios
      .get("http://localhost:8080/api/user/get-all-trainer")
      .then((response) => {
        setTrainerOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });

    // Fetch batch data from API
    axios
      .get("http://localhost:8080/api/batch/get/all")
      .then((response) => {
        setBatchOptions(response.data.runningBatches);
      })
      .catch((error) => {
        console.error("Error fetching batches:", error);
      });

    // Fetch course data from API
    axios
      .get("http://localhost:8080/api/course/get/all")
      .then((response) => {
        setCourseOptions(response.data.runningCourses);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);

  const handleSave = () => {
    // Your logic to save the schedule data goes here
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Schedule</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
          <TextField
            label="Start Time"
            type="time"
            name="scheduleStartTime"
            value={formData.scheduleStartTime}
            onChange={handleChange}
            required
          />
          <TextField
            label="End Time"
            type="time"
            name="scheduleEndTime"
            value={formData.scheduleEndTime}
            onChange={handleChange}
            required
          />
          <FormControl>
            <InputLabel>Course Code</InputLabel>
            <Select
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
            >
              {courseOptions.map((course) => (
                <MenuItem key={course.courseCode} value={course.courseCode}>
                  {course.courseCode} - {course.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Trainer Email</InputLabel>
            <Select
              name="trainerEmail"
              value={formData.trainerEmail}
              onChange={handleChange}
              required
            >
              {trainerOptions.map((trainer) => (
                <MenuItem key={trainer.email} value={trainer.email}>
                  {trainer.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Batch Code</InputLabel>
            <Select
              name="batchCode"
              value={formData.batchCode}
              onChange={handleChange}
              required
            >
              {batchOptions.map((batch) => (
                <MenuItem key={batch.batchCode} value={batch.batchCode}>
                  {batch.batchCode} - {batch.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleModal;
