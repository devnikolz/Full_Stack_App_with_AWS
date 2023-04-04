import React, { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import Thread from "./thread";
import Nav from "../components/Nav";
import Body from "../components/Body";
import Footer from "../components/Footer";

const DiscussionForum = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({ title: "", content: "" });

  useEffect(() => {
    // Fetch threads from the backend
    fetch("/api/threads")
      .then((response) => response.json())
      .then((data) => setThreads(data));
  }, []);

  const handleThreadChange = (event) => {
    setNewThread({ ...newThread, [event.target.name]: event.target.value });
  };

  const handleThreadSubmit = (event) => {
    event.preventDefault();
    // Send new thread to the backend
    fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newThread),
    })
      .then((response) => response.json())
      .then((data) => {
        setThreads([...threads, data]);
        setNewThread({ title: "", content: "" });
      })
      .catch((error) => console.error("Error creating thread: ", error));
  };
  
  return (
    <React.Fragment>
      <Nav />
      <Body>
        <Box>
          <Typography variant="h4" component="h4" align="center">
            Frequently Asked Questions
          </Typography>
          <Paper elevation={3} sx={{ p: 2, m: 2 }}>
            {threads.map((thread) => (
              <Thread
                key={thread._id}
                title={thread.title}
                content={thread.content}
              />
            ))}
            <form onSubmit={handleThreadSubmit}>
              <TextField
                label="Title"
                name="title"
                value={newThread.title}
                onChange={handleThreadChange}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ height: "80px", width: "100%" }}
              />
              <TextField
                label="Content"
                name="content"
                value={newThread.content}
                onChange={handleThreadChange}
                fullWidth
                margin="normal"
                variant="outlined"
                sx={{ height: "120px", width: "100%" }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Thread
              </Button>
            </form>
          </Paper>
        </Box>
      </Body>
      <Footer />
    </React.Fragment>
  );
};

export default DiscussionForum;
