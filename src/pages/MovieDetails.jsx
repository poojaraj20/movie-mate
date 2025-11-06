import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../component/Header';

function MovieDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
 
    const sampleMovies = [
      { id: 1, name: 'Lokah', director: 'Vinay Govind', genre: 'Drama', platform: 'Netflix', rating: '⭐ 9/10', image: 'https://i.postimg.cc/W3PZsjst/lokah-chapter-one-chandra1754914080-2.webp', status: 'Watching' },
      { id: 2, name: 'Avatar', director: 'James Cameron', genre: 'Fantasy', platform: 'Disney+', rating: '⭐ 8.5/10', image: 'https://image.tmdb.org/t/p/original/8Y7WrRK1iQHEX7UIftBeBMjPjWD.jpg', status: 'Completed' },
      { id: 3, name: 'Interstellar', director: 'Christopher Nolan', genre: 'Sci-Fi', platform: 'Prime Video', rating: '⭐ 9.5/10', image: 'https://i.pinimg.com/originals/8e/0d/ab/8e0dab8699be85720ce55845065bf6dc.jpg', status: 'Wishlist' },
    ];


    const storedMovies = JSON.parse(sessionStorage.getItem('movies')) || sampleMovies;
    const selected = storedMovies.find((m) => m.id === parseInt(id));
    setMovie(selected);
  }, [id]);

  if (!movie) return <div className="text-center mt-5">Loading movie details...</div>;

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow p-4">
          <div className="row">
            <div className="col-md-5 text-center">
              <img src={movie.image} alt={movie.name} className="img-fluid rounded" />
            </div>
            <div className="col-md-7">
              <h2 className="fw-bold mb-3">{movie.name}</h2>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Platform:</strong> {movie.platform}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
           
              <p><strong>Status:</strong> {movie.status || 'Not specified'}</p>

              <div className="mt-4">
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/edit/${movie.id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/')}
                >
                  ⬅️ Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
