import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Card,
  CardHeader,
  TextField,
  Button,
} from "@mui/material";
import { over } from "stompjs";
import SockJS from "sockjs-client";

var stompClient = null;

const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: localStorage.getItem("userName"),
    receivername: "",
    connected: false,
    message: "",
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe("/chatroom/public", onMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
    userJoin();
  };

  const userJoin = () => {
    var chatMessage = {
      senderName: userData.username,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    var payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case "MESSAGE":
        publicChats.push(payloadData);
        setPublicChats([...publicChats]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: "MESSAGE",
      };

      if (userData.username !== tab) {
        privateChats.get(tab).push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleUsername = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <Container maxWidth="md">
      {userData.connected ? (
        <Box className="chat-box">
          <Box className="member-list">
            <List>
              <ListItem
                button
                onClick={() => {
                  setTab("CHATROOM");
                }}
                className={`member ${tab === "CHATROOM" && "active"}`}
              >
                <h4>Active Users</h4>
                <ListItemText
                  primary="Chatroom"
                  primaryTypographyProps={{
                    sx: {
                      textAlign: "center",
                      fontSize: "25px",
                      fontStyle: "bold",
                    }, // Align the text in the center
                  }}
                />
              </ListItem>
              {[...privateChats.keys()].map((name, index) => (
                <ListItem
                // button
                // onClick={() => {
                //   setTab(name);
                // }}
                // className={`member ${tab === name && "active"}`}
                // key={index}
                >
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          </Box>
          {tab === "CHATROOM" && (
            <Box className="chat-content">
              <List className="chat-messages">
                {publicChats.map((chat, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor:
                        chat.senderName === userData.username
                          ? "lightblue"
                          : "lightgreen",
                      mb: 1,
                    }}
                  >
                    <CardHeader
                      titleTypographyProps={{
                        variant: "h6",
                        fontWeight:
                          chat.senderName === userData.username
                            ? "bold"
                            : "normal",
                        color: "black", // Set the text color to black
                      }}
                      title={`${chat.senderName}: `}
                      subheaderTypographyProps={{
                        color: "black", // Set the text color to black
                      }}
                      subheader={chat.message}
                    />
                  </Card>
                ))}
              </List>

              <Box className="send-message">
                <TextField
                  type="text"
                  className="input-message"
                  placeholder="Enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                  InputProps={{
                    endAdornment: (
                      <Button
                        type="button"
                        className="send-button"
                        onClick={sendValue}
                        sx={{ backgroundColor: "blue", color: "white" }}
                      >
                        send
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}
          {tab !== "CHATROOM" && (
            <Box className="chat-content">
              <List className="chat-messages">
                {[...privateChats.get(tab)].map((chat, index) => (
                  <Card
                    key={index}
                    sx={{
                      backgroundColor:
                        chat.senderName === userData.username
                          ? "lightblue"
                          : "lightgreen",
                      mb: 1,
                    }}
                  >
                    <CardHeader
                      titleTypographyProps={{
                        variant: "h6",
                        fontWeight:
                          chat.senderName === userData.username
                            ? "bold"
                            : "normal",
                        color: "black", // Set the text color to black
                      }}
                      title={`${chat.senderName}: `}
                      subheaderTypographyProps={{
                        color: "black", // Set the text color to black
                      }}
                      subheader={chat.message}
                    />
                  </Card>
                ))}
              </List>

              <Box className="send-message">
                <TextField
                  type="text"
                  className="input-message"
                  placeholder="Enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                  InputProps={{
                    endAdornment: (
                      <Button
                        type="button"
                        className="send-button"
                        onClick={sendPrivateValue}
                        sx={{ backgroundColor: "blue", color: "white" }}
                      >
                        send
                      </Button>
                    ),
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      ) : (
        <Box className="register" sx={{ display: "flex", gap: "10px" }}>
          <TextField
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
            disabled
            margin="normal"
          />
          <Button
            type="button"
            onClick={registerUser}
            variant="contained"
            sx={{ backgroundColor: "blue", color: "white" }}
          >
            Join In Chatroom
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ChatRoom;
