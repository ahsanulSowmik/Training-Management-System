import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // const history = useHistory();
  const userEmail = localStorage.getItem("userEmail");

  const token = localStorage.getItem("userToken");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Fetch user details from the API
    fetch(`http://localhost:8080/api/user/get/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.userDto);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Box>
    );
  }

  const {
    firstName,
    lastName,
    address,
    dateOfBirth,
    gender,
    phone,
    role,
    trainee,
    trainer,
    admin,
  } = user;

  const handleDeleteUser = () => {
    console.log(email);
    // Delete user using the delete API
    fetch(`http://localhost:8080/api/user/delete/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success or show a confirmation message
        navigate("/allUser");
        console.log("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditProfile = () => {
    console.log("out side of condition");

    console.log("inside of 1st condition");
    if (userRole === "TRAINEE") {
      console.log("inside of 2nd condition");
      navigate("/edit-my-profile");
    } else if (userRole === "TRAINER") {
      console.log("inside of 2nd condition");
      navigate("/edit-my-profile-trainer");
    } else {
      navigate("/edit-my-profile-admin");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ width: 600 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  alt={`${firstName} ${lastName}`}
                  src={`http://localhost:8080/api/downloadFile/${user.profilePicture}`} // Replace with the actual path to the default profile picture
                  sx={{ width: 80, height: 80 }}
                />
                <Box ml={2}>
                  <Typography variant="h4" fontWeight="bold">
                    {firstName} {lastName}
                  </Typography>
                  <Typography variant="body1">{email}</Typography>
                  <Typography variant="body1">
                    Role: {role[0].roleName}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="center">
                Personal Details
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                Address:
              </Typography>
              <Typography variant="body1">{address || "N/A"}</Typography>
              <Typography variant="body1" fontWeight="bold">
                Date of Birth:
              </Typography>
              <Typography variant="body1">{dateOfBirth || "N/A"}</Typography>
              <Typography variant="body1" fontWeight="bold">
                Gender:
              </Typography>
              <Typography variant="body1">{gender || "N/A"}</Typography>
              <Typography variant="body1" fontWeight="bold">
                Phone:
              </Typography>
              <Typography variant="body1">{phone || "N/A"}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" align="center">
                Role Details
              </Typography>

              {trainee && (
                <>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    Institute:
                  </Typography>
                  <Typography variant="body1" align="left">
                    {trainee.institute || "N/A"}
                  </Typography>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    Experience:
                  </Typography>
                  <Typography variant="body1" align="left">
                    {trainee.experience || "N/A"}
                  </Typography>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    CGPA:
                  </Typography>
                  <Typography variant="body1" align="left">
                    {trainee.cgpa || "N/A"}
                  </Typography>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    Blood Group:
                  </Typography>
                  <Typography variant="body1" align="left">
                    {trainee.bloodGroup || "N/A"}
                  </Typography>
                </>
              )}
              {trainer && (
                <>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    Trainer Details:
                  </Typography>
                  <Typography variant="body1" align="left">
                    Experience: {trainer.experience || "N/A"}
                  </Typography>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    Blood Group:
                  </Typography>
                  <Typography variant="body1" align="left">
                    {trainer.bloodGroup || "N/A"}
                  </Typography>
                  <Typography variant="body1" align="left" fontWeight="bold">
                    Expertise:
                  </Typography>
                  <Typography variant="body1" align="left">
                    {trainer.expertise || "N/A"}
                  </Typography>
                </>
              )}
              {admin && (
                <Typography variant="body1" align="left" fontWeight="bold">
                  Admin Details:
                </Typography>
              )}
              {admin?.details ? (
                <Typography variant="body1" align="left">
                  {admin.details}
                </Typography>
              ) : (
                <Typography variant="body1" align="left">
                  N/A
                </Typography>
              )}
              {userRole === "ADMIN" && ( // Show the button only if userRole is "ADMIN"
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDeleteUser}
                  style={{ marginTop: "16px" }}
                >
                  Delete User
                </Button>
              )}

              <br />

              {userEmail === email && ( // Show the "Edit Profile" button only if the logged-in user's email matches the user's email being displayed
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleEditProfile}
                  style={{ marginTop: "16px" }}
                >
                  Edit Profile
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
