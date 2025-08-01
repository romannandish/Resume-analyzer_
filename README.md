# 📄 Resume Analyzer (MERN Stack)

An AI-powered Resume Analyzer built with the MERN stack that lets users upload resumes (PDF/DOCX), parses them, extracts key details, and provides intelligent job recommendations based on skills, experience, and education.

---

## 🚀 Features

- 🧾 Upload PDF or DOCX resumes
- 🧠 Parse resumes using `pdf-parse` and `mammoth`
- 🛠 Extract education, skills, and experience
- 🤖 Get AI-powered job recommendations (coming soon)
- 📈 Job match scoring (planned)
- 🔐 JWT-based Authentication for users
- 🧑‍💻 Clean and responsive UI with React + Tailwind CSS

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- Multer (for file uploads)
- pdf-parse / mammoth (for parsing)

**Database:**
- MongoDB
- Mongoose

**Other:**
- JWT Authentication
- GitHub Actions (for CI/CD — optional)
- Cohere/OpenAI (planned for AI matching)

---

## 📂 Folder Structure

Resume-analyzer/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ └── index.js
│
├── server/ # Express backend
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ └── app.js
│
├── .gitignore
├── README.md
└── package.json
