// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function LoginPage({ setUser }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("student"); // default role
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch("http://localhost:8000/api/v1/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // send cookies
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         if (setUser) setUser(data.user);
//         setMessage("Login successful!");
//         navigate("/");
//       } else {
//         setMessage(data.message || "Login failed.");
//       }
//     } catch (error) {
//       setMessage("Error logging in.");
//       console.error(error);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10"
//     >
//       <h2 className="text-2xl font-bold mb-4">Login</h2>

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         className="border p-2 rounded w-full mb-3"
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         className="border p-2 rounded w-full mb-3"
//       />

//       <select
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         className="border p-2 rounded w-full mb-3"
//         required
//       >
//         <option value="student">Student</option>
//         <option value="recruiter">Recruiter</option>
//       </select>

//       <button
//         type="submit"
//         className="bg-blue-600 w-full text-white py-2 rounded"
//       >
//         Login
//       </button>

//       {message && <p className="mt-2 text-red-600">{message}</p>}
//     </form>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [fields, setFields] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setMessage("");
    setFields({
      fullname: "",
      email: "",
      phoneNumber: "",
      password: "",
      role: "student",
    });
  };

  const handleChange = (e) =>
    setFields({ ...fields, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegister
      ? "http://localhost:8000/api/v1/user/register"
      : "http://localhost:8000/api/v1/user/login";
    // Prepare payload
    let payload = {};
    if (isRegister) {
      const { fullname, email, phoneNumber, password, role } = fields;
      if (!fullname || !email || !phoneNumber || !password || !role) {
        setMessage("All fields must be filled for registration.");
        return;
      }
      payload = { fullname, email, phoneNumber, password, role };
    } else {
      const { email, password, role } = fields;
      if (!email || !password || !role) {
        setMessage("Please enter email, password, and select role.");
        return;
      }
      payload = { email, password, role };
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(isRegister ? "Registration successful!" : "Login successful!");
        if (!isRegister && setUser) setUser(data.user);
        if (!isRegister) {
          setTimeout(() => navigate("/"), 1500);
        } else {
          toggleForm(); // switch to login after registration success
        }
      } else {
        setMessage(data.message || (isRegister ? "Registration failed." : "Login failed."));
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <>
            <input
              name="fullname"
              type="text"
              placeholder="Full Name"
              value={fields.fullname}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              value={fields.phoneNumber}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </>
        )}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={handleChange}
          required
          className="border p-2 rounded w-full"
        />
        <select
          name="role"
          value={fields.role}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        >
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={toggleForm}
          className="text-blue-600 underline hover:text-blue-800"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </p>
      {message && (
        <p className="mt-4 text-center text-red-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
