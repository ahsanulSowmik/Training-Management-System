import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Divider,
  Button,
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [classRoomCode, setClassRoomCode] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [token, setToken] = useState("");

  const userEmail = localStorage.getItem("userEmail");
  const userRole = localStorage.getItem("userRole");
  const loogedinUserName = localStorage.getItem("userName");

  const fetchDataForTrainer = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        `http://localhost:8080/api/batch/get-by-trainer-mail/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data[0].classroom.classroomId);
        setClassRoomCode(response.data[0].classroom.classroomId);
        setPosts(response.data[0].classroom.posts);
        setToken(userToken);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchDataForTrainee = async () => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.get(
        `http://localhost:8080/api/batch/get-by-mail/${userEmail}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      if (response.data && Array.isArray(response.data)) {
        console.log(response.data[0].classroom.classroomId);
        setClassRoomCode(response.data[0].classroom.classroomId);
        setPosts(response.data[0].classroom.posts);
        setToken(userToken);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (userRole === "TRAINER") {
      fetchDataForTrainer();
    } else if (userRole === "TRAINEE") {
      fetchDataForTrainee();
    }
  }, [userRole]);

  const handleSubmit = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append the selectedFile to the formData
      formData.append("file", selectedFile);

      // Use fetch to upload the file
      const uploadResponse = await fetch(
        "http://localhost:8080/api/uploadFile",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Extract the fileName from the upload response
      const { fileName } = await uploadResponse.json();

      // Create the new post data object
      const newPostData = {
        userName: loogedinUserName,
        content: newPostContent,
      };

      // If a file was uploaded successfully, add the file name to the newPostData
      if (fileName) {
        newPostData.image = fileName;
      }

      console.log("New Post Data:", newPostData);

      // Now, create the new post using axios
      const response = await axios.post(
        `http://localhost:8080/classrooms/${classRoomCode}/posts`,
        newPostData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newPost = response.data;
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      handleModalClose();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleDeletePost = async (postId) => {
    try {
      const userToken = localStorage.getItem("userToken");
      await axios.delete(`http://localhost:8080/classrooms/${postId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handlePostComment = async (postId, newCommentContent) => {
    try {
      const newCommentData = {
        userName: loogedinUserName,
        content: newCommentContent,
      };

      const response = await axios.post(
        `http://localhost:8080/classrooms/${classRoomCode}/post/${postId}/comments`,
        newCommentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newComment = response.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  console.log(userRole);

  return (
    <Box m="0 20px" display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" justifyContent="flex-end" mt="20px" mb="20px">
        {userRole === "TRAINER" && (
          <Button
            type="button"
            color="secondary"
            variant="contained"
            onClick={handleModalOpen}
          >
            Create Post
          </Button>
        )}
      </Box>

      {/* Modal for creating a new post */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create a New Post
          </Typography>

          <TextField
            label="Post Content"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <Button
            type="button"
            color="primary"
            variant="contained"
            onClick={handleSubmit}
          >
            Submit Post
          </Button>
        </Box>
      </Modal>

      {/* Existing posts */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        maxHeight="calc(100vh - 100px)"
        overflow="auto"
      >
        <Box width="90%" maxWidth="800px">
          {posts.map((post) => (
            <Grid item key={post.id} xs={12}>
              <Card
                sx={{
                  backgroundColor: "#3B4558",
                  marginBottom: "20px",
                  width: "100%", // Add this line to set the width of the card to 100%.
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" marginBottom="8px">
                    <Avatar
                      alt={post.userName}
                      src={`/default-profile-picture.jpg`}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        fontSize: "18px",
                        backgroundColor: "#42cea2",
                        textTransform: "uppercase",
                      }}
                    >
                      {post.userName.charAt(0)}
                    </Avatar>
                    <Typography variant="h5">{post.userName}</Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {post.content}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary" paragraph>
                    {post.image}
                  </Typography> */}
                  {post.image && (
                    <img
                      src={`http://localhost:8080/api/downloadFile/${post.image}`}
                      alt="Uploaded file"
                      style={{ width: "20%", height: "auto" }}
                    />
                  )}
                  <Divider />
                  <Typography variant="h6" gutterBottom>
                    Comments:
                  </Typography>
                  {post.comments.map((comment, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      marginBottom="8px"
                    >
                      <Avatar
                        alt={comment.userName}
                        src={`/default-profile-picture.jpg`}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                          fontSize: "18px",
                          backgroundColor: "#42cea2",
                          textTransform: "uppercase",
                        }}
                      >
                        {comment.userName.charAt(0)}
                      </Avatar>
                      <Typography variant="body2">
                        {comment.userName}: {comment.content}
                      </Typography>
                    </Box>
                  ))}
                  <TextField
                    label="New Comment"
                    variant="outlined"
                    fullWidth
                    value={post.newComment}
                    onChange={(e) =>
                      setPosts((prevPosts) =>
                        prevPosts.map((p) =>
                          p.id === post.id
                            ? {
                                ...p,
                                newComment: e.target.value,
                              }
                            : p
                        )
                      )
                    }
                  />
                  <IconButton
                    aria-label="post-comment"
                    onClick={() => handlePostComment(post.id, post.newComment)}
                  >
                    <SendIcon />
                  </IconButton>

                  {userRole === "TRAINER" && (
                    <IconButton
                      aria-label="delete-post"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Posts;
