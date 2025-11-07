import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load jobs posted by recruiter
  const loadJobs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/job/getadminjobs", {
        credentials: "include",
      });

      if (!res.ok) {
        setError("Failed to load jobs");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
        setError("");
      } else {
        setError(data.message || "Failed to load jobs");
      }
    } catch (err) {
      setError("Error loading jobs");
      console.error(err);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  // Delete job handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:8000/api/v1/job/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        alert("Failed to delete job");
        return;
      }

      const data = await res.json();
      if (data.success) {
        alert("Job deleted successfully");
        loadJobs(); // refresh list
      } else {
        alert(data.message || "Failed to delete job");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting job");
    }
  };

  // Render job list with Edit & Delete buttons
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Manage Jobs</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {jobs.length === 0 ? (
        <p>You have not posted any jobs yet.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="border p-4 rounded mb-4 shadow flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{job.title}</h2>
                <p>{job.description}</p>
                <p className="text-sm text-gray-600">Location: {job.location}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => navigate(`/edit-job/${job._id}`)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
