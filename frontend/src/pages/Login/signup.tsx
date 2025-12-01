import Header from '../../components/Header/Header';

export default function Signup() {
  return (
    <>
      <Header title="Sign Up" showTagline={false} />

      <form className="signup-form">
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

        <div className='form-group'>
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

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </>
  );
}
