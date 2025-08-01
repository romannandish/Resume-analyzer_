# 📄 Resume Analyzer – AI-Powered MERN App

An AI-powered Resume Analyzer built with the MERN stack. Upload your resume (PDF/DOCX), get intelligent analysis using Cohere AI, and discover filtered job listings — all in one place. Includes user authentication, resume history, and a sleek modern UI.

---

## ✨ Key Features

✅ Upload and parse PDF/DOCX resumes  
✅ Extract raw resume content using `pdf-parse` and `mammoth`  
✅ AI-powered resume analysis using **Cohere API**  
✅ Personalized job recommendations based on extracted skills  
✅ Location, experience, and remote job filters  
✅ JWT-based authentication with user-specific resume history  
✅ Clean, responsive UI built with TailwindCSS

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Express.js
- Multer, pdf-parse, mammoth
- JWT Authentication
- **Cohere AI API**

**Database:**
- MongoDB Atlas
- Mongoose

---

## 🔐 .env Configuration

Create a `.env` file in the `/server` directory with:



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
