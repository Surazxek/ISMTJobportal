import { useState, useEffect } from "react";
import JobCard from "../components/JobCard.jsx";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/job/get", {
      credentials: "include"
    })
      .then((res) => {
        if (res.status === 401) {
          setError("Unauthorized - please login.");
          navigate("/login");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => setJobs(data.jobs || []))
      .catch((err) => {
        if (err.message !== "Unauthorized") {
          setError("Failed to fetch jobs.");
          console.error(err);
        }
      });
  }, [navigate]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto p-4 bg-white bg-opacity-90 min-h-screen">
        <h2 className="text-3xl mb-8 font-bold text-center">Job Listings</h2>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {jobs.length === 0 && !error ? (
          <p className="text-center">No jobs available.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
