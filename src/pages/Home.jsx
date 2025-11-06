import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');


  const sampleMovies = [
    {
      id: 1,
      name: 'Lokah',
      rating: '⭐ 9/10',
      director: 'Vinay Govind',
      genre: 'Drama',
      platform: 'Netflix',
      image: 'https://i.postimg.cc/W3PZsjst/lokah-chapter-one-chandra1754914080-2.webp',
      status: 'Watching',
    },
    {
      id: 2,
      name: 'Avatar',
      rating: '⭐ 8.5/10',
      director: 'James Cameron',
      genre: 'Fantasy',
      platform: 'Disney+',
      image: 'https://image.tmdb.org/t/p/original/8Y7WrRK1iQHEX7UIftBeBMjPjWD.jpg',
      status: 'Completed',
    },
    {
      id: 3,
      name: 'Interstellar',
      rating: '⭐ 9.5/10',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      platform: 'Prime Video',
      image: 'https://i.pinimg.com/originals/8e/0d/ab/8e0dab8699be85720ce55845065bf6dc.jpg',
      status: 'Wishlist',
    },
  ];

  useEffect(() => {
    const storedMovies = JSON.parse(sessionStorage.getItem('movies')) || sampleMovies;
    setMovies(storedMovies);
  }, []);


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      const updatedMovies = movies.filter((movie) => movie.id !== id);
      setMovies(updatedMovies);
      sessionStorage.setItem('movies', JSON.stringify(updatedMovies));
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
      movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'rating') {
        const ratingA = parseFloat(a.rating.replace(/[^\d.]/g, ''));
        const ratingB = parseFloat(b.rating.replace(/[^\d.]/g, ''));
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
              className="img-fluid "
              alt="Movie Hero"
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Discover New Experiences</h2>
            <p className="text-muted mb-4">
              Track your favorite movies and TV shows. Add, view, and manage your collection easily.
            </p>
            <a href="/addmovies" className="btn btn-danger px-4 py-2 rounded-pill me-2">
              ➕ Add Movie
            </a>
            
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
              <option value="rating">Rating </option>
            </select>
          </div>
        </div>


        <div className="row">
          {filteredMovies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <Link
                  to={`/movie/${movie.id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={movie.image}
                    className="card-img-top rounded-top-4"
                    alt={movie.name}
                    style={{ height: '350px', objectFit: 'cover' }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{movie.name}</h5>
                    <p className="text-warning mb-2">{movie.rating}</p>
                    <p className="text-muted mb-1">
                      <strong>Director:</strong> {movie.director}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Genre:</strong> {movie.genre}
                    </p>
                    <p className="text-muted mb-1">
                      <strong>Platform:</strong> {movie.platform}
                    </p>

                    {movie.status && (
                      <span className={`${getStatusBadge(movie.status)} mt-2`}>
                        {movie.status}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="text-center pb-3">
                  <button className="btn btn-outline-danger btn-sm me-2">❤️ Favorite</button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="btn btn-danger btn-sm me-2"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredMovies.length === 0 && (
            <p className="text-center text-muted mt-4">No movies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
