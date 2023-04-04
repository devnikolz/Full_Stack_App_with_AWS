const express = require("express");
const router = express.Router();
const Thread = require("../../models/Thread");

// Get all threads
router.get("/", async (req, res) => {
  try {
    const threads = await Thread.find().sort({ createdAt: -1 });
    res.json(threads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a new thread
router.post("/", async (req, res) => {
  const { title, content } = req.body;

  try {
    const newThread = new Thread({
      title,
      content,
    });

    const thread = await newThread.save();
    res.json(thread);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
