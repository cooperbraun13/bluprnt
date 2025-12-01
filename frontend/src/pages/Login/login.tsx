import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted");
    //This is open for api stuff 
  };

  return (
    <>
      <Header title="Login" showTagline={false} />

      <form className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="login-button">
          Login
        </button>

        {/* ✅ Signup navigation button */}
        <p className="switch-text">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="link-button"
          >
            Sign up here!
          </button>
        </p>
      </form>
    </>
  );
}
