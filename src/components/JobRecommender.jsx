import React, { useEffect, useState } from "react";
import axios from "axios";

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
    // You can switch this to fetch from RapidAPI later
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Job Recommendations</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="p-2 border rounded-md w-full md:w-1/3"
        />
        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
          className="p-2 border rounded-md w-full md:w-1/3"
        >
          <option value="">Any Experience</option>
          <option value="0-1 years">0-1 years</option>
          <option value="1-3 years">1-3 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
        </select>
        <label className="flex items-center gap-2 w-full md:w-1/3">
          <input
            type="checkbox"
            checked={filters.remote}
            onChange={() =>
              setFilters((prev) => ({ ...prev, remote: !prev.remote }))
            }
          />
          Remote Only
        </label>
      </div>

      {/* Job Cards */}
      <div className="grid gap-4">
        {filteredJobs.length === 0 ? (
          <p className="text-gray-500">No jobs found with current filters.</p>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <p className="text-gray-700">
                {job.company} — {job.location}
              </p>
              <p className="text-gray-600">Experience: {job.experience}</p>
              <p className="text-gray-600">
                Skills: <span className="text-sm">{job.skills.join(", ")}</span>
              </p>
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-600 hover:underline"
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
