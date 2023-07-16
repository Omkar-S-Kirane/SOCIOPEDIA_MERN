import express from "express";
import { login } from "../controllers/auth.js";

const router = express.Router();

// Define a POST route for user login
router.post("/login", login);

export default router;
