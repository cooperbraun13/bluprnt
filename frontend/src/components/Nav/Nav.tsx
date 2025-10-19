import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav">
      <p>
        <Link to="/products">All Products</Link>
      </p>
      <p>
        <Link to="/projects">Projects</Link>
      </p>
      <p>
        <Link to="/vendors">Vendor List</Link>
      </p>
    </div>
  );
}
