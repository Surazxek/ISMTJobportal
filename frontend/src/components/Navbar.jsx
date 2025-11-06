import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies/JWT, clear user state, etc.
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        JobPortal
      </Link>
      <div>
        {!user && (<>
            <Link to="/login" className="mr-4 hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>)}
        {user && (
          <>
            {(user.role === "recruiter" || user.role === "admin") && (
              <>
                <Link to="/post-job" className="mr-4 hover:underline">Post Job</Link>
                <Link to="/admin-jobs" className="mr-4 hover:underline">Manage Jobs</Link>
              </>
            )}
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
