import { Link } from "react-router-dom";
import "./Header.css";
import {useNavigate} from "react-router-dom";

export default function Header({
  title = "BluPrnt",
  showTagline = true,
  background = "main",
  leftSlot,
  rightSlot,
}: {
  title?: string;
  showTagline?: boolean;
  background?: "main" | "alt";
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <div className={`heading ${background}`}>
      {leftSlot && <div className="left-slot">{leftSlot}</div>}
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      {rightSlot && <div className="right-slot">{rightSlot}</div>}
      {showTagline && <p className="tagline">Your blueprint for success</p>}
      <div className="Account">    
        <button className="user_button" onClick={() => navigate("/login")}>
        <img className="unknown_user" src="../../unknown_user.jpg" alt="Unknown User"></img>
        </button>
        <div><Link to="/login" className="account_info">{"Account Information"}</Link></div>
    </div>
    </div>
  );
}
