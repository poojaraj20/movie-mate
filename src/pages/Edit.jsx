import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../component/Header';

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();


  const sampleMovies = [
    { id: 1, name: 'Lokah', director: 'Vinay Govind', genre: 'Drama', platform: 'Netflix', rating: '⭐ 9/10', image: 'https://i.postimg.cc/W3PZsjst/lokah-chapter-one-chandra1754914080-2.webp', status: 'Watching' },
    { id: 2, name: 'Avatar', director: 'James Cameron', genre: 'Fantasy', platform: 'Disney+', rating: '⭐ 8.5/10', image: 'https://image.tmdb.org/t/p/original/8Y7WrRK1iQHEX7UIftBeBMjPjWD.jpg', status: 'Completed' },
    { id: 3, name: 'Interstellar', director: 'Christopher Nolan', genre: 'Sci-Fi', platform: 'Prime Video', rating: '⭐ 9.5/10', image: 'https://i.pinimg.com/originals/8e/0d/ab/8e0dab8699be85720ce55845065bf6dc.jpg', status: 'Wishlist' },
  ];

  const [form, setForm] = useState({
    name: '',
    director: '',
    genre: '',
    platform: '',
    rating: '',
    image: '',
    status: ''
  });

  useEffect(() => {
    const storedMovies = JSON.parse(sessionStorage.getItem('movies')) || sampleMovies;
    const selected = storedMovies.find((m) => m.id === parseInt(id));
    if (selected) setForm(selected);
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedMovies = JSON.parse(sessionStorage.getItem('movies')) || sampleMovies;
    const updatedMovies = storedMovies.map((movie) =>
      movie.id === parseInt(id) ? form : movie
    );

    sessionStorage.setItem('movies', JSON.stringify(updatedMovies));
    alert('✅ Movie details updated successfully!');
    navigate(`/movie/${id}`);
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card shadow p-4">
          <h3 className="text-center mb-4 fw-bold">✏️ Edit Movie Details</h3>
          <form onSubmit={handleSubmit}>
            
         
            <div className="mb-3">
              <label className="form-label">Movie Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Director</label>
              <input
                type="text"
                className="form-control"
                name="director"
                value={form.director}
                onChange={handleChange}
                required
              />
            </div>

          
            <div className="mb-3">
              <label className="form-label">Genre</label>
              <input
                type="text"
                className="form-control"
                name="genre"
                value={form.genre}
                onChange={handleChange}
              />
            </div>

            
            <div className="mb-3">
              <label className="form-label">Platform</label>
              <select
                className="form-select"
                name="platform"
                value={form.platform}
                onChange={handleChange}
              >
                <option>Netflix</option>
                <option>Prime Video</option>
                <option>Disney+</option>
                <option>Hotstar</option>
              </select>
            </div>

        
            <div className="mb-3">
              <label className="form-label">Rating</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="e.g. ⭐ 8/10"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className="form-control"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Enter image link"
              />
            </div>

    
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option>Watching</option>
                <option>Completed</option>
                <option>Wishlist</option>
              </select>
            </div>

         
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 me-2">
                ✅ Save Changes
              </button>
              <button
                type="button"
                className="btn btn-warning px-4"
                onClick={() => navigate(`/movie/${id}`)}
              >
                ⬅️ Cancel
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
