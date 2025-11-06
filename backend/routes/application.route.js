// import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
// import {
//   applyJob,
//   getApplicants,
//   getAppliedJobs,
//   updateStatus
// } from "../controllers/application.controller.js";
// import { uploadCV } from "../utils/upload.js";

// const router = express.Router();

// // Apply for a job (CV upload enabled with multer)
// router.post("/apply/:id", isAuthenticated, uploadCV.single('cv'), applyJob);

// // Get all jobs the logged-in user has applied to
// router.get("/get", isAuthenticated, getAppliedJobs);

// // Get all applicants for a specific job
// router.get("/:id/applicants", isAuthenticated, getApplicants);

// // Update the status of an application
// router.post("/status/:id/update", isAuthenticated, updateStatus);

// export default router;

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus
} from "../controllers/application.controller.js";
import { uploadCV } from "../utils/upload.js";

const router = express.Router();

// POST route for applying to a job with CV upload
router.post("/apply/:id", isAuthenticated, uploadCV.single('cv'), applyJob);

router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.post("/status/:id/update", isAuthenticated, updateStatus);

export default router;


