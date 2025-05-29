import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed === '') return;

    if (trimmed.toLowerCase() === 'all') {
      navigate(`/`);
    } else {
      navigate(`/?search=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Vathare 🦷 Clinic</Link>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            style={{ maxWidth: '300px' }}
            placeholder="Search patients..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <button className="btn btn-outline-primary me-2" onClick={handleSearch}>
            Search
          </button>
          <Link to="/" className="btn btn-outline-secondary me-2">Home</Link>
          <Link to="/add" className="btn btn-success me-2">Add Patient</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
