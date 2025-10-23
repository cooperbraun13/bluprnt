import { Link } from "react-router-dom";
import "./Header.css";

export default function Header({
  title = "BluPrnt",
  showTagline = true,
  background = "main",
}: {
  title?: string;
  showTagline?: boolean;
  background?: "main" | "alt";
}) {
  return (
    <div className={`heading ${background}`}>
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      {showTagline && <p className="tagline">Your blueprint for success</p>}
    </div>
  );
}
