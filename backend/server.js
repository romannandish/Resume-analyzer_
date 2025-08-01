const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

// Multer setup for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'application/pdf' ||
      file.originalname.endsWith('.docx')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  },
});

// File upload and parsing endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    let text = '';
    if (file.mimetype === 'application/pdf') {
      const dataBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (file.originalname.endsWith('.docx')) {
      const data = await mammoth.extractRawText({ path: file.path });
      text = data.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    res.json({ message: 'File uploaded and parsed successfully!', text });
  } catch (err) {
    res.status(500).json({ message: 'Error parsing file', error: err.message });
  }
});



app.post('/api/analyze', async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Received /api/analyze request with text length:", text ? text.length : 0);

    if (!text) {
      console.log("No resume text provided");
      return res.status(400).json({ message: 'No resume text provided' });
    }

    // Improved prompt for better extraction
    const prompt = `
You are an expert resume analyzer. Carefully read the resume below and extract the following:

Key Skills:
List the main technical and soft skills mentioned in the resume as bullet points.

Experience Summary:
Summarize the candidate's work and internship experience in 2-3 sentences.

Missing Skills:
List any important or in-demand software engineering skills that are NOT mentioned in the resume (e.g., AWS, Docker, TypeScript, etc.) as bullet points.

Return your answer in this exact format:

Key Skills:
- skill1
- skill2

Experience Summary:
Your summary here.

Missing Skills:
- missing1
- missing2

Resume:
${text}
`;

    console.log("Sending prompt to Cohere API. Prompt length:", prompt.length);

    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command-r-plus",
        prompt: prompt,
        max_tokens: 600, 
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer your Cohere API key`, 
          "Content-Type": "application/json",
        },
      }
    );



    const aiText = response.data.generations[0].text;
    res.json({ analysis: aiText });
  } catch (err) {
    console.error("Error in /api/analyze:", err.response ? err.response.data : err.message);
    res.status(500).json({ message: 'AI analysis failed', error: err.message });
  }
});

const resumeRoutes = require('./routes/resume');
app.use('/api/resume', resumeRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
