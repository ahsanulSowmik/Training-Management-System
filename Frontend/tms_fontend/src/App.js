import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import UserList from "./scenes/users/UserList";
import CardListView from "./scenes/batches";
import Notice from "./scenes/notice";
import UserProfile from "./scenes/userProfile/userProfile";
import LoginPage from "./scenes/loginPage/LoginPage";
import Form from "./scenes/createUser";
import Courses from "./scenes/courses";
import CourseScheduling from "./scenes/courseScheduling/CourseScheduling";
import AssignBatchForm from "./scenes/assignBatchForm/AssignBatchForm";
import ScheduleList from "./scenes/courseScheduling/ScheduleList";
import AssignedAssignment from "./scenes/assignment/AssignedAssignment";
import CreateAssignment from "./scenes/assignment/CreateAssignment";
import Posts from "./scenes/posts/Posts";
import MyAssignmentList from "./scenes/assignmentSubmit/MyAssignmentList";
import MySubmission from "./scenes/assignmentSubmit/MySubmission";
import AllSubmission from "./scenes/allSubmission/AllSubmission";
import TraineeUpdateProfile from "./scenes/updateProfileForm/TraineeUpdateProfileField";
import TrainerUpdateProfile from "./scenes/updateProfileForm/TrainerUpdateProfile";
import AdminUpdateProfile from "./scenes/updateProfileForm/AdminUpdateProfile";
import ChatRoom from "./components/ChatRoom";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userToken");
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {isLoggedIn && <Sidebar isSidebar={isSidebar} />}

          <main className="content">
            {isLoggedIn && (
              <Topbar setIsSidebar={setIsSidebar} handleLogout={handleLogout} />
            )}

            <Routes>
              {isLoggedIn ? (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/allUser" element={<UserList />} />
                  <Route path="/batches" element={<CardListView />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route
                    path="/courseScheduling"
                    element={<CourseScheduling />}
                  />
                  <Route path="/form" element={<Form />} />
                  <Route path="/notice" element={<Notice />} />
                  <Route path="/user/:email" element={<UserProfile />} />
                  <Route path="/assignTrainee" element={<AssignBatchForm />} />
                  <Route path="/schedules" element={<ScheduleList />} />
                  <Route path="/classroom" element={<Posts />} />
                  <Route path="/chatroom" element={<ChatRoom />} />
                  <Route
                    path="/assigned-assignment"
                    element={<AssignedAssignment />}
                  />
                  <Route
                    path="/create-assignment"
                    element={<CreateAssignment />}
                  />
                  <Route path="/my-assignment" element={<MyAssignmentList />} />
                  <Route path="/my-submission" element={<MySubmission />} />
                  <Route
                    path="/edit-my-profile"
                    element={<TraineeUpdateProfile />}
                  />
                  <Route
                    path="/edit-my-profile-trainer"
                    element={<TrainerUpdateProfile />}
                  />
                  <Route
                    path="/edit-my-profile-admin"
                    element={<AdminUpdateProfile />}
                  />
                  <Route
                    path="/:assignmentId/all-submission"
                    element={<AllSubmission />}
                  />
                </>
              ) : (
                <Route
                  path="/"
                  element={
                    <LoginPage handleLoginSuccess={handleLoginSuccess} />
                  }
                />
              )}
            </Routes>
            {isLoggedIn && (
              <Fab
                aria-label="chat"
                sx={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  backgroundColor: "white",
                }}
                component={Link} // Use Link component
                to="/chatroom" // Navigate to /chatroom route on button click
              >
                <ChatIcon color="black" />
              </Fab>
            )}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
