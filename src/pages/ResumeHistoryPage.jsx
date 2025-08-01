import React, { useEffect, useState } from "react";
import axios from "axios";
import { FileText } from "lucide-react";
import { format } from "date-fns";

const ResumeHistoryPage = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resume/history");
        setResumes(res.data);
      } catch (err) {
        setError("Failed to fetch resume history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <main
      role="main"
      className="relative min-h-screen px-4 py-12 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden"
      aria-label="Resume upload history page"
    >
      {/* Soft glowing lights */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-purple-800/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[140px]" />
      </div>

      <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-100 tracking-wide">
        Resume Upload History
      </h2>

      {loading && (
        <p
          role="status"
          className="text-center text-indigo-400 animate-pulse font-medium"
        >
          Loading history...
        </p>
      )}

      {error && (
        <p
          role="alert"
          className="text-center text-red-400 font-semibold"
        >
          {error}
        </p>
      )}

      {!loading && resumes.length === 0 && (
        <p className="text-center text-gray-400 text-lg">No resume uploads found.</p>
      )}

      <section className="grid gap-6 max-w-5xl mx-auto" aria-live="polite">
        {resumes.map((resume) => (
          <article
            key={resume._id}
            className="bg-[#1a1a2e] border border-gray-700/50 backdrop-blur-md p-6 rounded-2xl shadow-xl transition-shadow hover:shadow-2xl"
            tabIndex={0}
            aria-label={`Resume: ${resume.filename || "Unnamed file"} uploaded on ${format(new Date(resume.createdAt), "PPPpp")}`}
          >
            <header className="flex justify-between items-center mb-4">
              <h3 className="flex items-center gap-2 text-indigo-300 font-semibold text-lg">
                <FileText className="w-6 h-6 text-indigo-400" aria-hidden="true" />
                {resume.filename || "Unnamed File"}
              </h3>
              <time
                dateTime={new Date(resume.createdAt).toISOString()}
                className="text-sm text-gray-400"
              >
                {format(new Date(resume.createdAt), "PPPpp")}
              </time>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-300 leading-relaxed">
              <section>
                <h4 className="font-semibold text-green-300 mb-1">Key Skills</h4>
                <p>{resume.analysis?.skills || "Not found"}</p>
              </section>
              <section>
                <h4 className="font-semibold text-blue-300 mb-1">Experience Summary</h4>
                <p>{resume.analysis?.summary || "Not found"}</p>
              </section>
              <section>
                <h4 className="font-semibold text-red-300 mb-1">Missing Skills</h4>
                <p>{resume.analysis?.missing || "Not found"}</p>
              </section>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default ResumeHistoryPage;
