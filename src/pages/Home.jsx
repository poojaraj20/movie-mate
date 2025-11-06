import React from 'react';
import Header from '../component/Header';

function Home() {
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row align-items-center">
          
          {/* Image Side */}
          <div className="col-md-6 mb-4 mb-md-0 text-center">
            <img 
              src="https://png.pngtree.com/background/20231030/original/pngtree-movie-night-essentials-clapperboard-popcorn-bucket-drink-and-3d-glasses-on-picture-image_5798729.jpg"
              className="img-fluid "
              alt="Sample"
            />
          </div>

          {/* Text and Button Side */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-3">Discover New Experiences</h2>
            <p className="text-muted mb-4">
              Explore amazing destinations, try delicious cuisines, and create unforgettable memories. 
              Join us on a journey around the world.
            </p>
            <a href="addmovies" className="btn btn-danger px-4 py-2 rounded-pill">
              Add ➕
            </a>
            <a href="status" className="btn btn-warning px-4 py-2 rounded-pill">
             View Status 👁️
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;
