const Thread = require("./Thread");

exports.getAllThreads = async (req, res) => {
  try {
    const threads = await Thread.find();
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createThread = async (req, res) => {
  const thread = new Thread({
    title: req.body.title,
    content: req.body.content,
  });
  try {
    const newThread = await thread.save();
    res.status(201).json(newThread);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
