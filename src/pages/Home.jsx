import React from 'react';
import Header from '../component/Header';

function Home() {
  // Sample movie data (you can replace it later with dynamic data)
  const movies = [
    {
      id: 1,
      name: 'Lokah',
      rating: '⭐ 9/10',
      director: 'Vinay Govind',
      genre: 'Drama',
      platform: 'Netflix',
      image: 'https://i.postimg.cc/W3PZsjst/lokah-chapter-one-chandra1754914080-2.webp',
    },
    {
      id: 2,
      name: 'Avatar',
      rating: '⭐ 8.5/10',
      director: 'James Cameron',
      genre: 'Fantasy',
      platform: 'Disney+',
      image: 'https://image.tmdb.org/t/p/original/8Y7WrRK1iQHEX7UIftBeBMjPjWD.jpg',
    },
    {
      id: 3,
      name: 'Interstellar',
      rating: '⭐ 9.5/10',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      platform: 'Prime Video',
      image: 'https://i.pinimg.com/originals/8e/0d/ab/8e0dab8699be85720ce55845065bf6dc.jpg',
    },
  ];

  return (
    <div>
      <Header />

      {/* Hero Section */}
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            <img 
              src="https://png.pngtree.com/background/20231030/original/pngtree-movie-night-essentials-clapperboard-popcorn-bucket-drink-and-3d-glasses-on-picture-image_5798729.jpg"
              className="img-fluid"
              alt="Sample"
            />
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Discover New Experiences</h2>
            <p className="text-muted mb-4">
              Track your favorite movies and TV shows. Add, view, and manage your collection easily.
            </p>
            <a href="/addmovies" className="btn btn-danger px-4 py-2 rounded-pill me-2">
              Add ➕
            </a>
            <a href="/status" className="btn btn-warning px-4 py-2 rounded-pill">
              View Status 👁️
            </a>
          </div>
        </div>
      </div>

      {/* Movie Collection Section */}
      <div className="container mt-5">
        <h3 className="text-center mb-4 fw-bold">🎬  My Movie Collection</h3>
        <div className="row">
          {movies.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={movie.image}
                  className="card-img-top"
                  alt={movie.name}
                  style={{ height: '350px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{movie.name}</h5>
                  <p className="text-warning mb-2">{movie.rating}</p>
                  <p className="text-muted mb-1"><strong>Director:</strong> {movie.director}</p>
                  <p className="text-muted mb-1"><strong>Genre:</strong> {movie.genre}</p>
                  <p className="text-muted"><strong>Platform:</strong> {movie.platform}</p>
                </div>
                <div className="card-footer bg-light text-center">
                  <button className="btn btn-outline-danger btn-sm me-2">❤️ Favorite</button>
                  <button className="btn btn-outline-primary btn-sm">Status</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
