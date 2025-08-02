# 📄 Resume Analyzer  
**AI-Powered Job Matcher & Resume Insights**

An intelligent resume analysis and job-matching platform powered by the **MERN stack** and **Cohere AI**. Upload your resume (PDF or DOCX), extract insights, and get matched to relevant jobs — all in a beautifully responsive interface.

---

## ✨ Features

✅ **Upload & Parse Resumes**  
- Supports `.pdf` and `.docx` formats  
- Uses `pdf-parse` and `mammoth` to extract raw text  

🤖 **AI-Powered Analysis**  
- Resume content analyzed using **Cohere API**  
- Extracted insights like skills, summary, strengths  

🎯 **Job Recommendations**  
- Personalized job matches based on resume content  
- Filter jobs by location, experience, and remote-only  

🔐 **User Authentication & History**  
- Secure login/signup with **JWT Auth**  
- View previous resume uploads and results  

🎨 **Modern UI & UX**  
- Responsive design with Tailwind CSS  
- Smooth UX with clean layout, buttons, and dark mode ready  

---

## 🧰 Tech Stack

| Category   | Technologies Used                          |
|------------|---------------------------------------------|
| Frontend   | React, Tailwind CSS, Axios                 |
| Backend    | Express.js, Multer, JWT Auth               |
| Parsing    | pdf-parse, mammoth                         |
| AI         | Cohere API (for resume summaries)          |
| Database   | MongoDB Atlas, Mongoose                    |

---



## 🛠️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/resume-analyzer.git
cd resume-analyzer

# 2. Install frontend & backend dependencies
cd client && npm install
cd ../server && npm install

# 3. Add your .env file in /server with:
COHERE_API_KEY=your_cohere_key
MONGO_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret

# 4. Run the app
# In one terminal tab (server):
npm run dev  # or nodemon app.js

# In another tab (client):
npm run dev  # if using Vite

