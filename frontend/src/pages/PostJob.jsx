import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    title: "",
    description: "",
    location: ""
  });
  const [msg, setMsg] = useState("");

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/job/postjob", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    });
    const data = await res.json();
    if(data.success) {
      setMsg("Job posted successfully");
      navigate("/admin-jobs");
    } else {
      setMsg(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Post New Job</h2>
      <input name="title" placeholder="Job Title" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <textarea name="description" placeholder="Job Description" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <input name="location" placeholder="Location" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded">Post Job</button>
      {msg && <p className="mt-2 text-green-600">{msg}</p>}
    </form>
  );
}
