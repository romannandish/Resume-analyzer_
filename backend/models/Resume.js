// models/Resume.js

const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    filename: String,
    text: String,
    analysis: {
      skills: String,
      summary: String,
      missing: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
