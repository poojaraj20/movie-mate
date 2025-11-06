import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/movies');
        if (!res.ok) throw new Error('Failed to fetch movies');
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error('Fetch movies error:', err);
        setError('Could not load movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);


  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || 'Failed to delete');
      }
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete movie: ' + (err.message || 'Server error'));
    }
  };


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

  const filteredMovies = movies
    .filter((movie) =>
      movie.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return (a.name || '').localeCompare(b.name || '');
      } else if (sortOption === 'rating') {
        const ratingA = parseFloat(a.rating) || 0;
        const ratingB = parseFloat(b.rating) || 0;
        return ratingB - ratingA;
      }
      return 0;
    });

  return (
    <div>
      <Header />

      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            <img
              src="https://png.pngtree.com/background/20231030/original/pngtree-movie-night-essentials-clapperboard-popcorn-bucket-drink-and-3d-glasses-on-picture-image_5798729.jpg"
              className="img-fluid"
              alt="Movie Hero"
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Discover New Experiences</h2>
            <p className="text-muted mb-4">
              Track your favorite movies and TV shows. Add, view, and manage your collection easily.
            </p>
            <Link to="/addmovies" className="btn btn-danger px-4 py-2 rounded-pill me-2">
              ➕ Add Movie
            </Link>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h3 className="fw-bold mb-3 mb-md-0">🎬 My Movie Library</h3>

          <div className="d-flex flex-wrap gap-2">
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: '200px' }}
              placeholder="🔍 Search movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="form-select form-select-sm"
              style={{ width: '180px' }}
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {loading && <p className="text-center">Loading movies...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <div className="row">
          {filteredMovies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie._id}>
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <Link
                  to={`/movie/${movie._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={movie.image || 'https://via.placeholder.com/400x350?text=No+Image'}
                    className="card-img-top rounded-top-4"
                    alt={movie.name}
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{movie.name}</h5>
                    <p className="text-warning mb-2">
                      ⭐ {movie.rating || '0'}/10
                    </p>
                    <p className="text-muted mb-1"><strong>Director:</strong> {movie.director}</p>
                    <p className="text-muted mb-1"><strong>Genre:</strong> {movie.genre}</p>
                    <p className="text-muted mb-1"><strong>Platform:</strong> {movie.platform}</p>
                    <div className="mt-2">
                      <span className={getStatusBadge(movie.status || 'Watching')}>
                        {movie.status || 'Watching'}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="text-center pb-3">
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredMovies.length === 0 && !loading && !error && (
            <p className="text-center text-muted mt-4">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
