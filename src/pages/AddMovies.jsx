import React, { useState } from 'react';
import Header from '../component/Header';

function AddMovies() {
  const [form, setForm] = useState({
    title: '',
    director: '',
    genre: '',
    platform: '',
    status: 'Wishlist',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
  
  };

  return (
    <div>
      <Header />

      <div className="container mt-5">
        <div className="card p-4">
          <h3 className="text-center mb-4">🎬 Add Movie / TV Show</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Enter movie or show title"
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
                placeholder="e.g. Action, Drama"
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
                <option>Prime</option>
                <option>Disney+</option>
                <option>Hotstar</option>
              </select>
            </div>

          

            <div className="text-center">
              <button type="submit" className="btn btn-success px-4">
                Add Movie
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddMovies;
