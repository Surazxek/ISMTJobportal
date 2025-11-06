import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ApplyPage() {
  const { jobId } = useParams();
  const [cv, setCV] = useState(null);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!cv){
      setMsg("Please select a CV file.");
      return;
    }
    const formData = new FormData();
    formData.append("cv", cv);

    const res = await fetch(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-bold">Apply to Job</h2>
      <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCV(e.target.files[0])} className="mb-2" required />
      <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 w-full">Upload CV</button>
      {msg && <p className="mt-3 text-blue-600">{msg}</p>}
    </form>
  );
}
