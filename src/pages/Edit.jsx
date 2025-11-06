import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, replace } from 'react-router-dom';
import Header from '../component/Header';

function Edit() {
  const { id } = useParams();
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
          setError('Movie not found.');
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch movie');
        const data = await res.json();
        setForm({
          name: data.name || '',
          director: data.director || '',
          genre: data.genre || '',
          platform: data.platform || '',
          rating: data.rating || '',
          image: data.image || '',
          status: data.status || ''
        });
      } catch (err) {
        console.error('Fetch movie error:', err);
        setError('Could not load movie. Try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.message || 'Failed to update movie');
      }

      alert('✅ Movie updated successfully!');
      navigate(`/movie/${id}`, {replace:true});
    } catch (err) {
      console.error('Update movie error:', err);
      alert('Failed to update movie: ' + (err.message || 'Server error'));
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        {loading && <p className="text-center">Loading movie details...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && (
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
        )}
      </div>
    </div>
  );
}

export default Edit;
