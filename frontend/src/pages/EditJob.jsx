import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    title: "",
    description: "",
    location: ""
  });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/job/get/${jobId}`)
      .then(res => res.json())
      .then(data => {
        if(data.job) setFields({
          title: data.job.title,
          description: data.job.description,
          location: data.job.location
        });
        else setMsg("Job not found");
      });
  }, [jobId]);

  const handleChange = e => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`http://localhost:8000/api/v1/job/editjob/${jobId}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields)
    });
    const data = await res.json();
    if(data.success){
      setMsg("Job updated successfully");
      navigate("/admin-jobs");
    } else {
      setMsg(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
      <input name="title" value={fields.title} onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <textarea name="description" value={fields.description} onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <input name="location" value={fields.location} onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <button type="submit" className="bg-blue-600 w-full text-white py-2 rounded">Update Job</button>
      {msg && <p className="mt-2 text-green-600">{msg}</p>}
    </form>
  );
}
