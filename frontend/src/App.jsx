import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import PostJob from "./pages/PostJob.jsx";
import EditJob from "./pages/EditJob.jsx";
import AdminJobs from "./pages/AdminJobs.jsx";
import AdminApplicants from "./pages/AdminApplicants.jsx";
import ApplyPage from "./pages/ApplyPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user info from backend if needed
  }, []);

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />

        {/* Protected routes for recruiters/admins */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute user={user} roles={["recruiter", "admin"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute user={user} roles={["recruiter", "admin"]}>
              <EditJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-jobs"
          element={
            <ProtectedRoute user={user} roles={["recruiter", "admin"]}>
              <AdminJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-applicants/:jobId"
          element={
            <ProtectedRoute user={user} roles={["recruiter", "admin"]}>
              <AdminApplicants />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
