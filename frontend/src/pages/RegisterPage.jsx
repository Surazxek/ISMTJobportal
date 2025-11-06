import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [fields, setFields] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Registration successful. Please log in.");
      navigate("/login");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input name="fullname" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded w-full mb-3" required />
      <select name="role" onChange={handleChange} className="border p-2 rounded w-full mb-3" defaultValue="student">
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button type="submit" className="bg-green-600 w-full text-white py-2 rounded">Register</button>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </form>
  );
}
