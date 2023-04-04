import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
} from "@mui/material";

const NewThreadForm = ({ addThread }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addThread(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <Box sx={{ m: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
          sx={{ mb: 1 }}
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 1 }}
        />
        <Button type="submit" variant="contained" size="large">
          Create Thread
        </Button>
      </form>
    </Box>
  );
};

export default NewThreadForm;
