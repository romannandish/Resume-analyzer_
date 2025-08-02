import React, { useEffect, useState } from "react";

const mockJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Remote",
    experience: "1-3 years",
    skills: ["React", "JavaScript", "HTML", "CSS"],
    applyLink: "https://careers.google.com/jobs/frontend",
  },
  {
    id: 2,
    title: "Backend Developer",
    company: "Amazon",
    location: "Bangalore",
    experience: "3-5 years",
    skills: ["Node.js", "Express", "MongoDB"],
    applyLink: "https://amazon.jobs/backend",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Microsoft",
    location: "Hyderabad",
    experience: "5+ years",
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    applyLink: "https://microsoft.com/careers/fullstack",
  },
];

const JobRecommender = ({ extractedSkills = ["React", "Node.js"] }) => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    remote: false,
  });

  useEffect(() => {
    setJobs(mockJobs);
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchSkills = extractedSkills.some((skill) =>
      job.skills.includes(skill)
    );
    const matchLocation =
      filters.location === "" ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchExperience =
      filters.experience === "" || job.experience === filters.experience;
    const matchRemote =
      !filters.remote || job.location.toLowerCase() === "remote";

    return matchSkills && matchLocation && matchExperience && matchRemote;
  });

  return (
    <div className="max-w-5xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-indigo-300">🎯 Job Recommendations</h2>

      {/* Filters */}
      <div className="bg-[#1a1a2e] border border-gray-700 rounded-xl p-4 md:p-6 mb-8 shadow-md space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
        <input
          type="text"
          placeholder="🔍 Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="w-full md:w-1/3 px-4 py-2 rounded-md bg-[#0f0f2f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
          className="w-full md:w-1/3 px-4 py-2 rounded-md bg-[#0f0f2f] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="">🎓 Any Experience</option>
          <option value="0-1 years">0-1 years</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
        <label className="flex items-center gap-2 text-sm md:w-1/3 text-gray-300">
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={() =>
              setFilters((prev) => ({ ...prev, remote: !prev.remote }))
            }
            className="form-checkbox bg-gray-800 text-indigo-500 rounded"
          />
          Remote Only
        </label>
      </div>

      {/* Job Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-400">No jobs found with current filters.</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-[#202040] border border-gray-700 rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-1">
                {job.title}
              </h3>
              <p className="text-indigo-300 font-medium">
                {job.company} — {job.location}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                <strong>Experience:</strong> {job.experience}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Skills:</strong>{" "}
                <span className="text-gray-300">
                  {job.skills.join(", ")}
                </span>
              </p>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition"
              >
                Apply Now →
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobRecommender;

