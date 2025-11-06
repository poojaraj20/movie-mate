import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../component/Header";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/movies/${id}`);
        if (res.status === 404) {
          setError("Movie not found.");
          setMovie(null);
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Fetch movie error:", err);
        setError("Could not load movie. Try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this movie permanently?")) return;
    try {
      const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || "Delete failed");
      }
      alert("Movie deleted");
      navigate("/");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete: " + (err.message || "Server error"));
    }
  };

  // Add this inside your component
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Watching':
        return 'badge bg-info text-dark';
      case 'Completed':
        return 'badge bg-success';
      case 'Wishlist':
        return 'badge bg-warning text-dark';
      default:
        return 'badge bg-secondary';
    }
  };




  const formatRating = (r) => {
    if (r === null || r === undefined) return "No rating";

    const n = Number(r);
    if (Number.isNaN(n)) return "No rating";

    const display = Number.isInteger(n) ? n.toString() : n.toFixed(1);
    return `⭐ ${display}/10`;
  };

  return (
    <div>
      <Header />
      <div className="container py-5">
        {loading && <p className="text-center">Loading movie...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && movie && (
          <div className="card mb-4 shadow-sm border-0">
            <div className="row g-0">
              <div className="col-md-5">
                <img
                  src={movie.image || "https://via.placeholder.com/600x800?text=No+Image"}
                  className="img-fluid h-100 rounded-start"
                  alt={movie.name}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h2 className="card-title fw-bold">{movie.name}</h2>
                  <p className="text-warning fs-5 mb-2">{formatRating(movie.rating)}</p>

                  <p className="mb-1"><strong>Director:</strong> {movie.director || "—"}</p>
                  <p className="mb-1"><strong>Genre:</strong> {movie.genre || "—"}</p>
                  <p className="mb-1"><strong>Platform:</strong> {movie.platform || "—"}</p>
                  <p className="mb-1">
                    <strong>Status:</strong> <span className={getStatusBadge(movie.status || "Unknown")}>
                      {movie.status || "Unknown"}
                    </span>
                  </p>

                  <p className="text-muted small">Added: {new Date(movie.createdAt).toLocaleString()}</p>

                  <div className="mt-4 d-flex gap-2">
                    <Link to="/" className="btn btn-secondary">⬅️ Back</Link>
                    <button className="btn btn-danger" onClick={handleDelete}>🗑️ Delete</button>
                    
                    <Link to={`/movie/${id}/edit`} className="btn btn-outline-primary">✏️ Edit</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default MovieDetails;
