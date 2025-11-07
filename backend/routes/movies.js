import express from "express";
import {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} from "../controllers/MovieController.js";

const router = express.Router();

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
