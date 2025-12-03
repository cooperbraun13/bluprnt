import { Link } from "react-router-dom";
import "./Header.css";
import {useNavigate} from "react-router-dom";

type HeaderProps = {
  title?: string;
  showTagline?: boolean;
  background?: "main" | "alt";
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  hideAccount?: boolean;
};

export default function Header({
  title = "BluPrnt",
  showTagline = true,
  background = "main",
  leftSlot,
  rightSlot,
  hideAccount = false,
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className={`heading ${background}`}>
      {leftSlot && <div className="left-slot">{leftSlot}</div>}
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      {rightSlot && <div className="right-slot">{rightSlot}</div>}
      {showTagline && <p className="tagline">Your blueprint for success</p>}
      {!hideAccount && (
        <div className="account-chip" onClick={() => navigate("/login")}>
          <img
            className="account-avatar"
            src="../../unknown_user.jpg"
            alt="Unknown User"
          />
          <div className="account-text">
            <span className="account-label">Logged out</span>
            <span className="account-link">Account settings</span>
          </div>
        </div>
      )}
    </div>
  );
}
