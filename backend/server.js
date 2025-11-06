import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import moviesRouter from "./routes/movies.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());


app.use("/api/movies", moviesRouter);

app.get("/api/health", (req, res) => res.json({ status: "Backend running fine" }));


const start = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) throw new Error("MONGO_URI missing in .env");
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
