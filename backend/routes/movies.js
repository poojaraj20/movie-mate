import express from "express";
import Movie from "../models/Movie.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {

    let { name, director, genre, platform, rating, image, status } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    rating = (rating !== undefined && rating !== null && rating !== "") ? parseFloat(rating) : null;

    const movie = new Movie({ name, director, genre, platform, rating, image, status});
    const saved = await movie.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, director, genre, platform, rating, image, status } = req.body;

  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }


    if (name !== undefined) movie.name = name;
    if (director !== undefined) movie.director = director;
    if (genre !== undefined) movie.genre = genre;
    if (platform !== undefined) movie.platform = platform;
    if (rating !== undefined) movie.rating = rating;
    if (image !== undefined) movie.image = image;
    if (status !== undefined) movie.status = status;

    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    console.error('Update movie error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
