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

const CardListView = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("running");
  const [batchData, setBatchData] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [batchForm, setBatchForm] = useState({
    batchCode: "",
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/batch/get/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBatchData(data);
    } catch (error) {
      console.error("Error fetching batch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleCreateBatch = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/batch/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(batchForm),
      });

      const createBatchResponse = await response.json();

      if (response.ok) {
        console.log("Batch created successfully!");
        toast.success("Batch created successfully!");
        fetchData();
        handleCreateModalClose();
      } else {
        console.error("Error creating batch:", response.statusText);
        toast.error(createBatchResponse.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  if (!batchData) {
    return <div>Loading...</div>;
  }

  const { runningBatches, previousBatches, upcomingBatches } = batchData;

  const filteredData =
    selectedOption === "running"
      ? runningBatches
      : selectedOption === "previous"
      ? previousBatches
      : upcomingBatches;

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
            Create New Batch
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
          Running Batch
        </Button>
        <Button
          type="submit"
          color={selectedOption === "previous" ? "primary" : "secondary"}
          variant={selectedOption === "previous" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("previous")}
          sx={{ mr: 1 }}
        >
          Previous Batch
        </Button>
        <Button
          type="submit"
          color={selectedOption === "upcoming" ? "primary" : "secondary"}
          variant={selectedOption === "upcoming" ? "contained" : "outlined"}
          onClick={() => handleOptionChange("upcoming")}
        >
          Upcoming Batch
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredData.map((item) => (
          <Grid item key={item.batchCode} xs={12} sm={6} md={4} lg={3}>
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
                    Start: {item.startDate}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    End: {item.endDate}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />

      {/* Create Form Modal */}
      <Dialog open={isCreateModalOpen} onClose={handleCreateModalClose}>
        <DialogTitle>Create New Batch</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Batch Code"
              fullWidth
              value={batchForm.batchCode}
              onChange={(e) =>
                setBatchForm({ ...batchForm, batchCode: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Batch Name"
              fullWidth
              value={batchForm.name}
              onChange={(e) =>
                setBatchForm({ ...batchForm, name: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={batchForm.description}
              onChange={(e) =>
                setBatchForm({ ...batchForm, description: e.target.value })
              }
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Box mr={1} flexGrow={1}>
              <TextField
                label="Start Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={batchForm.startDate}
                onChange={(e) =>
                  setBatchForm({ ...batchForm, startDate: e.target.value })
                }
              />
            </Box>
            <Box ml={1} flexGrow={1}>
              <TextField
                label="End Date"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                value={batchForm.endDate}
                onChange={(e) =>
                  setBatchForm({ ...batchForm, endDate: e.target.value })
                }
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateModalClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateBatch}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CardListView;
