import { Link } from "react-router-dom";
import './Header.css';

export default function Header() {
  return (
    <div className="heading">
      <h1><Link to="http://localhost:5173/">BluPrnt</Link></h1>
      <p className="tagline">Your blueprint for success</p>
    </div>
  );
}
