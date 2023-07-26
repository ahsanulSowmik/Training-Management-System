import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { ExitToAppOutlined, SchoolOutlined } from "@mui/icons-material";
import AssignmentReturnedIcon from "@mui/icons-material/AssignmentReturned";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ClassIcon from "@mui/icons-material/Class";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();
  const userImage = localStorage.getItem("user");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch the user role from localStorage
    const role = localStorage.getItem("userRole");
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Clear user authentication-related data from localStorage
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    navigate("/");
    window.location.reload();
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  BJIT Academy
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`http://localhost:8080/api/downloadFile/${userImage}`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {localStorage.getItem("userName")}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {localStorage.getItem("userRole")} at BJIT Academy
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="All Users"
              to="/allUser"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Batches"
              to="/batches"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {userRole === "ADMIN" && (
              <Item
                title="Assign Trainee in Batch"
                to="/assignTrainee"
                icon={<AssignmentReturnedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <Item
              title="Courses"
              to="/courses"
              icon={<SchoolOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            {userRole === "ADMIN" && (
              <Item
                title="Course Schedul"
                to="/courseScheduling"
                icon={<ScheduleIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {userRole !== "ADMIN" && (
              <Item
                title="Lis of Schedul"
                to="/schedules"
                icon={<ScheduleIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {userRole === "TRAINER" && (
              <Item
                title="Assigments"
                to="/assigned-assignment"
                icon={<AssignmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {userRole === "TRAINEE" && (
              <Item
                title="My Assigments"
                to="/my-assignment"
                icon={<AssignmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            {userRole === "ADMIN" && (
              <Item
                title="Create Profile"
                to="/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="Notice"
              to="/notice"
              icon={<NotificationsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {userRole !== "ADMIN" && (
              <Item
                title="Classroom Post"
                to="/classroom"
                icon={<ClassIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop="auto"
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                <ExitToAppOutlined /> {/* Render the ExitToAppIcon */}
                Logout
              </Button>
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
