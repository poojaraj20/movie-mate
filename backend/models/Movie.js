import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    director: { type: String },
    genre: { type: String },
    platform: { type: String },
    rating: { type: Number },
    image: { type: String },
    status: {
      type: String,
      enum: ["Watching", "Completed", "Wishlist"], 
      default: "Wishlist",
    },
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
