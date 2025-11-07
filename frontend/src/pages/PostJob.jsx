import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
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
    companyId: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = e =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/v1/job/post", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields)
      });

      if (!res.ok) {
        setMsg(`Failed: ${res.status} ${res.statusText}`);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setMsg("Job posted successfully!");
        setFields({
          title: "", description: "", requirements: "", salary: "",
          location: "", jobType: "", experience: "", position: "", companyId: ""
        });
        setTimeout(() => navigate("/admin-jobs"), 1500);
      } else {
        setMsg(data.message || "Failed to post job.");
      }
    } catch (error) {
      setMsg("Network or server error!");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 grid gap-3">
      <h2 className="text-2xl font-bold mb-2">Post New Job</h2>
      <input name="title" placeholder="Job Title" value={fields.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={fields.description} onChange={handleChange} required />
      <input name="requirements" placeholder="Requirements (comma separated)" value={fields.requirements} onChange={handleChange} required />
      <input name="salary" type="number" placeholder="Salary" value={fields.salary} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={fields.location} onChange={handleChange} required />
      <input name="jobType" placeholder="Job Type" value={fields.jobType} onChange={handleChange} required />
      <input name="experience" placeholder="Experience Level" value={fields.experience} onChange={handleChange} required />
      <input name="position" placeholder="Position" value={fields.position} onChange={handleChange} required />
      <input name="companyId" placeholder="Company ID" value={fields.companyId} onChange={handleChange} required />
      <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded">Post Job</button>
      {msg && <p className="mt-2 text-red-600">{msg}</p>}
    </form>
  );
}
