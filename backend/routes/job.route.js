import express from "express";
import isRecruiter from "../middlewares/isRecuiter.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  deleteJob,
  editJob,
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob
} from "../controllers/job.controller.js";


const router = express.Router();

// CREATE a new job
// router.post("/post", isAuthenticated, postJob);
router.post("/post", isAuthenticated, postJob);



// GET all jobs
router.get("/get", isAuthenticated, getAllJobs);

// GET all jobs created by the logged-in admin
router.get("/getadminjobs", isAuthenticated, getAdminJobs);

// GET job by ID
router.get("/get/:id", isAuthenticated, getJobById);

router.put("/edit/:id", isAuthenticated, editJob);
router.delete("/delete/:id", isAuthenticated, isRecruiter, deleteJob);



export default router;