import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // default role
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (data.success) {
        if (setUser) setUser(data.user);
        setMessage("Login successful!");
        navigate("/");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error logging in.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded w-full mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded w-full mb-3"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded w-full mb-3"
        required
      >
        <option value="student">Student</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 w-full text-white py-2 rounded"
      >
        Login
      </button>

      {message && <p className="mt-2 text-red-600">{message}</p>}
    </form>
  );
}
