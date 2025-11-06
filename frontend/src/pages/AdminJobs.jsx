import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = () => {
    fetch("http://localhost:8000/api/v1/job/get", {credentials: "include"})
      .then(res => res.json())
      .then(data => setJobs(data.jobs || []));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if(!window.confirm("Are you sure to delete this job?")) return;
    const res = await fetch(`http://localhost:8000/api/v1/job/deletejob/${jobId}`, {
      method: "DELETE",
      credentials: "include"
    });
    const data = await res.json();
    if(data.success) fetchJobs();
    else alert(data.message);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6">Manage Jobs</h2>
      {jobs.length === 0 && <p>No jobs found</p>}
      {jobs.map(job => (
        <div key={job._id} className="border rounded p-4 mb-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold">{job.title}</h3>
            <p>{job.location}</p>
          </div>
          <div>
            <Link to={`/edit-job/${job._id}`} className="text-blue-600 mr-4 hover:underline">Edit</Link>
            <button className="text-red-600" onClick={() => handleDelete(job._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
