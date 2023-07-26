import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import "./UserList.css";
const UserList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockDataContacts, setMockDataContacts] = useState([]);
  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/user/${encodeURIComponent(params.row.email)}`} // Pass the email as a URL parameter
          onClick={() => handleProfileView(params)}
        >
          View Profile
        </Button>
      ),
    },
  ];

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/get-all-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const contacts = data.users.map((user, index) => ({
        id: index + 1,
        name: `${user.firstName} ${user.lastName}`,
        phone: user.phone,
        email: user.email,
        role: user.role.length > 0 ? user.role[0].roleName : "",
      }));
      setMockDataContacts(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const handleProfileView = (params) => {
    console.log("Profile Video clicked for row:", params.row);
  };

  // State to manage the modal
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Dummy data for user roles
  const userRoles = ["ADMIN", "TRAINER", "TRAINEE"];

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSelectUser = (email) => {
    setSelectedEmail(email);
    setSelectedRole("");
  };

  // Function to handle setting the user role
  const handleSetUserRole = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/user/assign-role",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: selectedEmail,
            roleName: selectedRole,
          }),
        }
      );

      if (response.ok) {
        fetchUserData();
        toast.success("User role set successfully!");
      } else {
        const data = await response.json();
        // toast.error(data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    handleCloseModal();
  };

  return (
    <Box m="10px">
      <Header title="All User" subtitle="List of All Registred Users" />
      <div className="" style={{ display: "flex", justifyContent: "flex-end" }}>
        {userRole === "ADMIN" && (
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenModal}
          >
            Set User Role
          </Button>
        )}
      </div>

      <Box
        m="2px 0 0 50"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Select User Role</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Select User Email</InputLabel>
              <Select
                value={selectedEmail}
                onChange={(e) => handleSelectUser(e.target.value)}
                label="Select User Email"
              >
                {/* Map through your user emails here */}
                {mockDataContacts.map((user) => (
                  <MenuItem key={user.id} value={user.email}>
                    {user.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth>
              <InputLabel>Select Role</InputLabel>
              <Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                label="Select Role"
              >
                {userRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions maxWidth="sm" fullWidth>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSetUserRole}
            color="primary"
            variant="contained"
            style={{ backgroundColor: "blue" }}
          >
            Set Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
