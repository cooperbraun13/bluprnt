import { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  return (
    <>
      <div className="heading">
        <h1>BluPrnt</h1>
        <p className="tagline">Your blueprint for success.</p>
      </div>

      <div className="nav">
        <p><Link to="/products">All Products</Link></p>
        <p><Link to="/contractors">Hire Contractors</Link></p>
        <p><Link to="/vendors">Vendor List</Link></p>
      </div>

      <div className="search_container">
        <input
          type="text"
          id="searchBar"
          name="searchbar"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="button">Search</button>
      </div>

      <div className="flex-container">
        {/* placeholder content area */}
      </div>

      <footer>
        <p>Developed by: Ayden Humphries, Cooper Braun, Cooper McKenny, Chris Wong, and Sam Vanturennout</p>
      </footer>
    </>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <>
      <div className="heading">
        <h1>{title}</h1>
        <p className="tagline">Your blueprint for success.</p>
      </div>
      <div className="nav">
        <p><Link to="/products">All Products</Link></p>
        <p><Link to="/contractors">Hire Contractors</Link></p>
        <p><Link to="/vendors">Vendor List</Link></p>
      </div>
      <div className="flex-container" />
      <footer>
        <p>Developed by: Ayden Humphries, Cooper Braun, Cooper McKenny, Chris Wong, and Sam Vanturennout</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Placeholder title="All Products" />} />
      <Route path="/contractors" element={<Placeholder title="Hire Contractors" />} />
      <Route path="/vendors" element={<Placeholder title="Vendor List" />} />
    </Routes>
  );
}