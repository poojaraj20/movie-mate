import React, { useState } from 'react';
import Header from '../component/Header';
import { useNavigate } from 'react-router-dom';

function AddMovies() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    director: '',
    genre: '',
    platform: '',
    rating: '',
    image: '',
    status: '' 
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.platform) {
      alert("Please fill movie name and platform");
      return;
    }


    const parsedRating =
      form.rating === "" || form.rating === null
        ? null
        : parseFloat(form.rating);

    if (parsedRating !== null && (parsedRating < 0 || parsedRating > 10)) {
      alert("Rating must be between 0 and 10");
      return;
    }

    try {
      const payload = { ...form, rating: parsedRating };

      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Unknown error' }));
        throw new Error(err.message || 'Failed to add movie');
      }

      await res.json();

      alert('🎉 Movie added successfully!');
      setForm({
        name: '',
        director: '',
        genre: '',
        platform: '',
        rating: '',
        image: '',
        status: '' 
      });

      navigate('/', { replace: true });
    } catch (err) {
      console.error("Add movie error:", err);
      alert('Failed to add movie: ' + err.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="card p-4 shadow">
          <h3 className="text-center mb-4 fw-bold">🎬 Add New Movie</h3>

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
                placeholder="Enter movie name"
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
                placeholder="Enter director name"
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
                placeholder="e.g. Action, Drama, Sci-Fi"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Platform</label>
              <select
                className="form-select"
                name="platform"
                value={form.platform}
                onChange={handleChange}
                required
              >
                <option value="">Select Platform</option>
                <option>Netflix</option>
                <option>Prime Video</option>
                <option>Disney+</option>
                <option>Hotstar</option>
              </select>
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

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="form-control"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="e.g. 8.5"
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
                placeholder="Paste movie poster link"
              />
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="btn btn-success px-4 me-2">
                ➕ Add Movie
              </button>
              <button
                type="button"
                className="btn btn-warning px-4"
                onClick={() => navigate('/')}
              >
                ⬅️ Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovies;
