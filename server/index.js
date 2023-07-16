import bodyParser from "body-parser"; // Parse incoming request bodies
import { fileURLToPath } from "url"; // Convert file URLs to file paths
import mongoose from "mongoose"; // MongoDB object modeling tool
import express from "express"; // Web application framework
import dotenv from "dotenv"; // Load environment variables from a .env file
import multer from "multer"; // Handle multipart/form-data for file uploads
import helmet from "helmet"; // Set various HTTP headers for security
import morgan from "morgan"; // HTTP request logger
import path from "path"; // File path manipulation
import cors from "cors"; // Enable Cross-Origin Resource Sharing (CORS)

/* ****************** CONFIGURATION ****************** */
// Get the current file path and filename
const __filename = fileURLToPath(import.meta.url);
// Get the directory name from the file path
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Set various HTTP headers for security
app.use(helmet());

// Set Cross-Origin Resource Policy to "cross-origin"
app.use(
  helmet.crossOriginResourcePolicy({ policy: "cross-origin" })
);

// Log HTTP requests
app.use(morgan("common"));

// Parse JSON request bodies with a limit of 30mb and extended mode
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Parse URL-encoded request bodies with a limit of 30mb and extended mode
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Serve static files from the "public/assets" directory under the "/assets" route
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
