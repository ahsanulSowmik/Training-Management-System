import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("running");
  const [courseData, setCourseData] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");
  const [courseForm, setCourseForm] = useState({
    courseCode: "",
    name: "",
    description: "",
    status: "",
  });
  const [editCourseForm, setEditCourseForm] = useState({
    courseCode: "",
    name: "",
    description: "",
    status: "",
  });

  const fetchCourseData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/course/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalOpen = (course) => {
    setEditCourseForm(course);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleCreateCourse = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/course/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseForm),
      });

      const createCourseResponse = await response.json();

      if (response.ok) {
        console.log("Course created successfully!");
        toast.success("Course created successfully!");
        fetchCourseData();
        handleCreateModalClose();
      } else {
        console.error("Error creating course:", response.statusText);
        toast.error(createCourseResponse.message);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  const handleUpdateCourse = async () => {
    console.log(editCourseForm);
    try {
      const response = await fetch(`http://localhost:8080/api/course/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editCourseForm),
      });

      const updateCourseResponse = await response.json();

      if (response.ok) {
        console.log("Course updated successfully!");
        toast.success("Course updated successfully!");
        fetchCourseData();
        handleEditModalClose();
      } else {
        console.error("Error updating course:", response.statusText);
        toast.error(updateCourseResponse.message);
      }
    } catch (error) {
      console.log("Network error:", error);
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  const { runningCourses, previousCourses, upcomingCourses } = courseData;

  const filteredData =
    selectedOption === "running"
      ? runningCourses
      : selectedOption === "previous"
      ? previousCourses
      : upcomingCourses;

  const cardColor = theme.palette.mode === "light" ? "#FFFFFF" : "#313b4f";

  return (
    <Box m="0 20px" display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="end" mt="20px">
        {userRole === "ADMIN" && (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleCreateModalOpen}
          >
            Create New Course
          </Button>
        )}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="20px" mb="20px">
        <Button
          type="submit"
          color={selectedOption === "running" ? "primary" : "secondary"}
          variant={selectedOption === "running" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("running")}
          sx={{ mr: 1 }}
        >
          Running Course
        </Button>
        <Button
          type="submit"
          color={selectedOption === "previous" ? "primary" : "secondary"}
          variant={selectedOption === "previous" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("previous")}
          sx={{ mr: 1 }}
        >
          Previous Course
        </Button>
        <Button
          type="submit"
          color={selectedOption === "upcoming" ? "primary" : "secondary"}
          variant={selectedOption === "upcoming" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("upcoming")}
        >
          Upcoming Course
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredData.map((item) => (
          <Grid item key={item.courseCode} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: cardColor }}>
              <CardContent>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.description}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt="5px"
                >
                  <Typography variant="body2" color="textSecondary">
                    Status: {item.status}
                  </Typography>
                  {userRole === "ADMIN" && (
                    <Button
                      onClick={() => handleEditModalOpen(item)}
                      color="primary"
                      variant="outlined"
                    >
                      Edit
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />

      {/* Create Form Modal */}
      <Dialog open={isCreateModalOpen} onClose={handleCreateModalClose}>
        <DialogTitle>Create New Course</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Course Code"
              fullWidth
              value={courseForm.courseCode}
              onChange={(e) =>
                setCourseForm({ ...courseForm, courseCode: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Course Name"
              fullWidth
              value={courseForm.name}
              onChange={(e) =>
                setCourseForm({ ...courseForm, name: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={courseForm.description}
              onChange={(e) =>
                setCourseForm({ ...courseForm, description: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Status"
              fullWidth
              value={courseForm.status}
              onChange={(e) =>
                setCourseForm({ ...courseForm, status: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateModalClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateCourse}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Form Modal */}
      <Dialog open={isEditModalOpen} onClose={handleEditModalClose}>
        <DialogTitle>Edit Course</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Course Code"
              fullWidth
              value={editCourseForm.courseCode}
              disabled
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Course Name"
              fullWidth
              value={editCourseForm.name}
              onChange={(e) =>
                setEditCourseForm({ ...editCourseForm, name: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editCourseForm.description}
              onChange={(e) =>
                setEditCourseForm({
                  ...editCourseForm,
                  description: e.target.value,
                })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Status"
              fullWidth
              value={editCourseForm.status}
              onChange={(e) =>
                setEditCourseForm({ ...editCourseForm, status: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCourse}
            color="primary"
            variant="contained"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Courses;
