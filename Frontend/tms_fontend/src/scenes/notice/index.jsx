import { useEffect, useState } from "react";
import {
  Box,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the delete icon
import { tokens } from "../../theme";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [noticeData, setNoticeData] = useState([]);
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  // State variables for the modal
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [noticeForm, setNoticeForm] = useState({
    noticeTitle: "",
    noticeText: "",
  });

  // Function to fetch all notices
  const fetchNotices = () => {
    fetch("http://localhost:8080/api/batch/get-all-notice", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setNoticeData(data))
      .catch((error) => console.error("Error fetching notice data:", error));
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleCreateNotice = () => {
    fetch("http://localhost:8080/api/batch/create-notice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noticeForm),
    }).then((response) => {
      if (response.ok) {
        toast.success("Notice created successfully!");
        setCreateModalOpen(false);
        fetchNotices();
      }
      return response.json();
    });
  };

  const handleDeleteNotice = (noticeId) => {
    console.log(noticeId);
    fetch(`http://localhost:8080/api/batch/remove-notice/${noticeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        toast.success("Notice deleted successfully!");
        fetchNotices();
      }
      return response.json();
    });
  };

  return (
    <Box m="20px">
      <Header
        title="Notice"
        subtitle="Attention Captured: Notable Notice Demands Recognition!"
      />

      <Box display="flex" justifyContent="end" mt="20px" mb="20px">
        {userRole === "ADMIN" && (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Notice
          </Button>
        )}
      </Box>

      {noticeData.map((notice) => (
        <Accordion key={notice.noticeId} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {notice.noticeTitle}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{notice.noticeText}</Typography>
            {userRole === "ADMIN" && (
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDeleteNotice(notice.noticeId)}
              >
                Delete
              </Button>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

      <Dialog
        open={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      >
        <DialogTitle>Create New Notice</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <TextField
              label="Notice Title"
              fullWidth
              value={noticeForm.noticeTitle}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, noticeTitle: e.target.value })
              }
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Notice Content"
              fullWidth
              multiline
              rows={4}
              value={noticeForm.noticeText}
              onChange={(e) =>
                setNoticeForm({ ...noticeForm, noticeText: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleCreateNotice}
            color="primary"
            variant="contained"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* React-toastify Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default Notice;
