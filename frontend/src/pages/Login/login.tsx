import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BackButton from "../../components/BackButton/BackButton";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted");
  };

  return (
    <section className="auth-page">
      <Header
        title="Login"
        showTagline={false}
        background="alt"
        leftSlot={<BackButton />}
        hideAccount
      />

      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit}>
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
            Login
          </button>

          <p className="switch-text">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="link-button"
            >
              Sign up here
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}
