import Header from '../../components/Header/Header';

export default function Login() {
  return (
    <>
      <Header title="Login" showTagline={false} />

      <form className="login-form">
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

        <div className="sign_up"></div>

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </>
  );
}
