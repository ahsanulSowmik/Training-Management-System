import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch the user data
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/user/get-all-user"
        );
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleProfileClick = (email) => {
    window.location.assign("/profile?email=" + email);
  };

  return (
    <div style={{ margin: "20px", height: "500px", overflow: "auto" }}>
      <h1>User Table</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#8679bf",
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <TableCell style={{ fontSize: "18px" }}>Name</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Email</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Role</TableCell>
              <TableCell style={{ fontSize: "18px" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{ fontSize: "16px" }}
                >{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell style={{ fontSize: "16px" }}>{user.email}</TableCell>
                <TableCell style={{ fontSize: "16px" }}>
                  {user.role.length > 0 ? user.role[0].roleName : ""}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ fontSize: "16px" }}
                    onClick={() => handleProfileClick(user.email)}
                  >
                    View Profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          style={{
            backgroundColor: "lightgray",
            position: "sticky",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  style={{ textAlign: "center" }}
                ></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TableContainer>
    </div>
  );
};

export default User;
