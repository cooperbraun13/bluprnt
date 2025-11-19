import { Link } from "react-router-dom";
import "./Header.css";

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
  return (
    <div className={`heading ${background}`}>
      {leftSlot && <div className="left-slot">{leftSlot}</div>}
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      {rightSlot && <div className="right-slot">{rightSlot}</div>}
      {showTagline && <p className="tagline">Your blueprint for success</p>}
      <div className="Account"><button className="user_button"><img className="unknown_user" src="../../unknown_user.jpg" alt="Unknown User"></img></button>
      <p className="account_info">Account Information</p></div>
    </div>
  );
}
