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

// Local File Imports
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";

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
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

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

/* ****************** FILE STORAGE ****************** */
const storage = multer.diskStorage({
  // Specify the destination directory where uploaded files will be stored
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  // Specify the filename for the uploaded file
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ****************** ROUTES WITH FILES ****************** */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ****************** ROUTES ****************** */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* ****************** MONGOOSE SETUP ****************** */
const PORT = process.env.PORT || 6001;

// Connect to MongoDB using the MONGO_URL environment variable
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
  })
  .then(() => {
    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
