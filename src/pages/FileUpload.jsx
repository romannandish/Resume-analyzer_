import React, { useState } from "react";
import axios from "axios";
import { Upload, FileText, X } from "lucide-react";
import JobRecommender from "../components/JobRecommender";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [parsedText, setParsedText] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [skillList, setSkillList] = useState([]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (
      selected &&
      (selected.type === "application/pdf" || selected.name.endsWith(".docx"))
    ) {
      setFile(selected);
    } else {
      alert("Only PDF or DOCX files are allowed.");
    }
  };

  const saveToDB = async (fileName, parsedText, analysis) => {
    try {
      await axios.post("http://localhost:5000/api/resume/saveResume", {
        filename: fileName,
        text: parsedText,
        analysis,
      });
      console.log("✅ Resume saved to MongoDB.");
    } catch (error) {
      console.error("❌ Error saving to DB:", error);
    }
  };

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const text = res.data.text || "";
      setMessage(res.data.message);
      setParsedText(text);
      setFile(null);

      if (text) {
        analyzeResume(text, file.name);
      }
    } catch (err) {
      setMessage("Upload failed");
      setParsedText("");
      setAnalysis(null);
    } finally {
      setUploading(false);
    }
  };

  const analyzeResume = async (resumeText, fileName = "Uploaded File") => {
    setAnalyzing(true);
    try {
      const res = await axios.post("http://localhost:5000/api/analyze", {
        text: resumeText,
      });

      const parsed = parseAIResponse(res.data.analysis);
      const extractedSkills = extractSkillArray(parsed.skills || "");

      setAnalysis(parsed);
      setSkillList(extractedSkills);

      await saveToDB(fileName, resumeText, parsed);
    } catch (err) {
      setAnalysis({ error: "AI analysis failed." });
    } finally {
      setAnalyzing(false);
    }
  };

  const parseAIResponse = (text) => {
    const skillsMatch = text.match(/Key Skills:\s*([\s\S]*?)\n\nExperience Summary:/i);
    const summaryMatch = text.match(/Experience Summary:\s*([\s\S]*?)\n\nMissing Skills:/i);
    const missingMatch = text.match(/Missing Skills:\s*([\s\S]*)/i);

    return {
      skills: skillsMatch ? skillsMatch[1].trim() : "",
      summary: summaryMatch ? summaryMatch[1].trim() : "",
      missing: missingMatch ? missingMatch[1].trim() : "",
      raw: text,
    };
  };

  const extractSkillArray = (skillsText) => {
    return skillsText
      .split(/,|\n|·|•|-/)
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10 overflow-hidden text-white">
      {/* Glowing blobs for lighting */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute -top-28 -left-32 w-[600px] h-[600px] bg-purple-800/20 rounded-full blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto bg-[#1a1a2e] border border-gray-700/40 rounded-2xl shadow-2xl p-6 md:p-10 space-y-6 backdrop-blur-md">
        {!file && !parsedText && !analysis && (
          <div className="flex flex-col items-center justify-center h-96">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-500 rounded-2xl bg-[#1a1a2e]/50 hover:bg-[#1a1a2e]/70 transition cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label="Upload Resume File"
            >
              <Upload className="w-10 h-10 text-indigo-400 mb-2" />
              <p className="text-sm font-medium text-gray-300">Click to select a PDF or DOCX file</p>
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}

        {file && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm text-gray-300 font-medium truncate">
                <FileText className="w-5 h-5 text-gray-400" />
                {file.name}
              </div>
              <button
                onClick={() => setFile(null)}
                aria-label="Remove selected file"
                className="hover:text-red-400 text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={uploadFile}
              disabled={uploading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60 transition"
            >
              {uploading ? "Uploading..." : "Upload & Analyze"}
            </button>
          </div>
        )}

        {message && <p className="text-sm text-green-400 text-center">{message}</p>}

        {parsedText && (
          <div className="bg-[#22223b] p-4 rounded-lg text-xs max-h-64 overflow-auto whitespace-pre-wrap border border-gray-600">
            <h4 className="font-semibold mb-2 text-sm text-indigo-300">Parsed Resume Content:</h4>
            <pre>{parsedText}</pre>
          </div>
        )}

        {analyzing && (
          <p className="text-indigo-400 text-sm font-medium text-center">Analyzing resume with AI...</p>
        )}

        {analysis && !analysis.error && (
          <div className="grid gap-4">
            <div className="bg-green-900/20 p-4 rounded-lg border-l-4 border-green-400">
              <h4 className="font-semibold mb-1 text-green-300">Key Skills</h4>
              <p className="text-sm text-green-100">{analysis.skills || "Not found"}</p>
            </div>
            <div className="bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-semibold mb-1 text-blue-300">Experience Summary</h4>
              <p className="text-sm text-blue-100">{analysis.summary || "Not found"}</p>
            </div>
            <div className="bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
              <h4 className="font-semibold mb-1 text-red-300">Missing Skills</h4>
              <p className="text-sm text-red-100">{analysis.missing || "Not found"}</p>
            </div>
          </div>
        )}

        {analysis && analysis.error && (
          <p className="text-red-500 text-center text-sm font-medium">{analysis.error}</p>
        )}

        {skillList.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-indigo-200">Recommended Jobs for You</h3>
            <JobRecommender extractedSkills={skillList} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
