import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import "./Login.css";

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign Up Complete!");
  };

  return (
    <section className="auth-page">
      <Header
        title="Sign Up"
        showTagline={false}
        background="alt"
        leftSlot={<BackButton />}
        hideAccount
      />

      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Sign Up
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="link-button"
            >
              Log in here
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
