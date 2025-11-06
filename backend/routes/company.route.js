import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { 
  registerCompany, 
  getCompany, 
  getCompanyById, 
  updateCompany 
} from "../controllers/company.controller.js";

const router = express.Router();

// Register a new company (requires authentication)
router.post("/register", isAuthenticated, registerCompany);

// Get all companies of the logged-in user
router.get("/get", isAuthenticated, getCompany);

// Get a single company by ID
router.get("/get/:id", isAuthenticated, getCompanyById);

// Update a company by ID
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;
