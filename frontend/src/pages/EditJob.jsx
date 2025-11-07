import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyName: "",
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/job/get/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          setMsg("Failed to load job details.");
          return;
        }
        const data = await res.json();
        if (data.success && data.job) {
          setFields({
            title: data.job.title || "",
            description: data.job.description || "",
            requirements: data.job.requirements?.join(",") || "",
            salary: data.job.salary || "",
            location: data.job.location || "",
            jobType: data.job.jobType || "",
            experience: data.job.experienceLevel || "",
            position: data.job.position || "",
            companyName: data.job.company?.name || "",
          });
          setMsg("");
        } else {
          setMsg(data.message || "Failed to load job data");
        }
      } catch {
        setMsg("Error loading job data");
      }
    }
    if (id) fetchJob();
  }, [id]);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/v1/job/edit/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!res.ok) {
        setMsg("Failed to update job");
        return;
      }
      const data = await res.json();
      if (data.success) {
        setMsg("Job updated successfully!");
        setTimeout(() => navigate("/admin-jobs"), 1500);
      } else {
        setMsg(data.message || "Job update failed");
      }
    } catch {
      setMsg("Network or server error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 grid gap-4">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <input name="title" placeholder="Job Title" value={fields.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" value={fields.description} onChange={handleChange} required />
      <input name="requirements" placeholder="Requirements (comma separated)" value={fields.requirements} onChange={handleChange} required />
      <input name="salary" type="number" placeholder="Salary" value={fields.salary} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={fields.location} onChange={handleChange} required />
      <input name="jobType" placeholder="Job Type" value={fields.jobType} onChange={handleChange} required />
      <input name="experience" type="number" placeholder="Experience Level" value={fields.experience} onChange={handleChange} required />
      <input name="position" type="number" placeholder="Position" value={fields.position} onChange={handleChange} required />
      <input name="companyName" placeholder="Company Name" value={fields.companyName} onChange={handleChange} required />
      <button type="submit" className="bg-blue-600 text-white py-2 rounded">Update Job</button>
      {msg && <p className="mt-2 text-red-600">{msg}</p>}
    </form>
  );
}
