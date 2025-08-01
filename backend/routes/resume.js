// routes/resume.js

const express = require("express");
const router = express.Router();
const Resume = require("../models/Resume");

// Save resume data to MongoDB
router.post("/saveResume", async (req, res) => {
  try {
    const { filename, text, analysis } = req.body;

    const newResume = new Resume({
      filename,
      text,
      analysis,
    });

    await newResume.save();

    res.status(201).json({ message: "Resume saved successfully" });
  } catch (err) {
    console.error("Error saving resume:", err.message);
    res.status(500).json({ error: "Failed to save resume" });
  }
});

router.get("/history", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error("Error fetching resume history:", err.message);
    res.status(500).json({ error: "Failed to fetch resume history" });
  }
});

module.exports = router;
