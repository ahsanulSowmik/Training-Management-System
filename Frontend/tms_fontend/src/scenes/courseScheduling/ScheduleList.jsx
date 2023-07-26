import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  useTheme,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ScheduleList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [batchData, setBatchData] = useState(null);
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/batch/get/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBatchData(response.data);
    } catch (error) {
      console.error("Error fetching batch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (scheduleId, batchCode) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/batch/remove-schedule",
        {
          scheduleId: scheduleId,
          batchCode: batchCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming the API returns a success message
      if (response.data.success) {
        console.log("Deleted Schedule ID:", scheduleId);
        console.log("Batch Code:", batchCode);

        // Show a toast to confirm the deletion
        toast.info(
          `Deleted Schedule ID: ${scheduleId}, Batch Code: ${batchCode}`
        );
      } else {
        // Handle deletion failure if needed
        toast.error("Failed to delete the schedule.");
      }
      fetchData();
    } catch (error) {
      // Handle any API call errors
      console.error("Error deleting the schedule:", error);
      toast.error("Error deleting the schedule.");
    }
  };

  if (!batchData) {
    return <div>Loading...</div>;
  }

  const { runningBatches } = batchData;

  const cardColor = theme.palette.mode === "light" ? "#FFFFFF" : "#313b4f";

  return (
    <Box m="0 20px" display="flex" flexDirection="column" alignItems="center">
      <Grid container spacing={2}>
        {runningBatches.map((batch) => (
          <Grid item key={batch.batchCode} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ backgroundColor: cardColor }}>
              <CardContent>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  component="div"
                >
                  Batch Name: {batch.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {batch.description}
                </Typography>
              </CardContent>
              {batch.schedules && batch.schedules.length > 0 ? (
                batch.schedules.map((schedule) => (
                  <Card
                    key={schedule.scheduleId}
                    variant="outlined"
                    sx={{ margin: "8px", position: "relative" }}
                  >
                    <CardContent>
                      {userRole === "ADMIN" && (
                        <IconButton
                          style={{
                            position: "absolute",
                            top: "4px",
                            right: "4px",
                          }}
                          onClick={() =>
                            handleDelete(schedule.scheduleId, batch.batchCode)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h6"
                        component="div"
                      >
                        Schedule ID: {schedule.scheduleId}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Start Date: {schedule.startDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        End Date: {schedule.endDate}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Trainer Email: {schedule.trainerEmail}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Course Code: {schedule.courseCode}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Start Time: {schedule.scheduleStartTime}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        End Time: {schedule.scheduleEndTime}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card variant="outlined" sx={{ margin: "8px" }}>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      No schedule available.
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </Box>
  );
};

export default ScheduleList;
