import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import stream from "stream";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'https://estatesystem-e3iw.vercel.app/', // Your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};


// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb+srv://tinomutendaishemutemaringa:zWyKpqocvlVI98wi@cluster0.dctxq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

  let gfs, bucket;

  // Initialize GridFS once MongoDB connection is open
  mongoose.connection.once("open", () => {
      console.log("MongoDB connection established.");
      bucket = new GridFSBucket(mongoose.connection.db, {
          bucketName: "uploads"
      });
      console.log("GridFS initialized:", bucket ? "Success" : "Failed");
  });
  
  // Configure Multer Storage (In-Memory)
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  
  // Property Schema
  const PropertySchema = new mongoose.Schema({
    description: String,
    imageId: String,  // Store filename for retrieval
  });
  
  const Property = mongoose.model("Property", PropertySchema);
  
  // User Post Schema
  const UserPostSchema = new mongoose.Schema({
      description: String,
      imageId: String,  // Store filename for retrieval
      createdAt: { type: Date, default: Date.now }
  });
  
  const UserPost = mongoose.model("UserPost", UserPostSchema);
  
  // Upload Image for Property
  app.post("/upload", upload.single("image"), async (req, res) => {
      try {
          if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
          const fileStream = new stream.PassThrough();
          fileStream.end(req.file.buffer);
  
          const uploadStream = bucket.openUploadStream(req.file.originalname);
          fileStream.pipe(uploadStream);
  
          uploadStream.on("finish", async () => {
              const newProperty = new Property({
                  description: req.body.description,
                  imageId: req.file.originalname,  // Store filename
              });
  
              await newProperty.save();
              res.status(201).json({ message: "Property uploaded successfully!" });
          });
      } catch (error) {
          console.error("Upload error:", error);
          res.status(500).json({ error: "Error uploading property" });
      }
  });
  
  // Upload User Post
  app.post("/uploadPost", upload.single("image"), async (req, res) => {
      try {
          if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  
          const fileStream = new stream.PassThrough();
          fileStream.end(req.file.buffer);
  
          const uploadStream = bucket.openUploadStream(req.file.originalname);
          fileStream.pipe(uploadStream);
  
          uploadStream.on("finish", async () => {
              const newUserPost = new UserPost({
                  description: req.body.description,
                  imageId: req.file.originalname,  // Store filename
              });
  
              await newUserPost.save();
              res.status(201).json({ message: "User post uploaded successfully!" });
          });
      } catch (error) {
          console.error("Upload error:", error);
          res.status(500).json({ error: "Error uploading post" });
      }
  });
  
  // Fetch All Properties
  app.get("/properties", async (req, res) => {
      try {
          const properties = await Property.find();
          res.json(properties);
      } catch (error) {
          res.status(500).json({ error: "Error fetching properties" });
      }
  });
  
  // Fetch All User Posts
  app.get("/posts", async (req, res) => {
      try {
          const posts = await UserPost.find();
          res.json(posts);
      } catch (error) {
          res.status(500).json({ error: "Error fetching posts" });
      }
  });
  
  // Fetch Image by Filename
  app.get("/image/:filename", async (req, res) => {
      try {
          if (!bucket) return res.status(500).json({ error: "GridFS not initialized yet" });
  
          const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
          downloadStream.on("error", () => res.status(404).json({ error: "Image not found" }));
          downloadStream.pipe(res);
      } catch (error) {
          res.status(500).json({ error: "Error fetching image" });
      }
  });
  






// User Schema & Model
const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  });
  
  const User = mongoose.model("User", userSchema);
  
  // User Registration Endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const { fullname, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      const newUser = new User({ fullname, email, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

// Login User
app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log("Server running on port " + port);
});
