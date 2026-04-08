import { useState } from 'react';
import './Login.css';

const Signup = ({ onSwitch }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    // Show success briefly
    setSuccess('Signup successful! Redirecting to login...');

    setTimeout(() => {
      onSwitch(); 
    }, 1200);

  } catch (err) {
    setError(err.message);
  }
};



  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="nav-brand">
        <span className="brand-gradient">Alma</span>
        <span className="brand-gradient">Cen</span>
      </h1>
        <p className="login-subtitle"><b>Create an account</b></p>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><b>Username</b></label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label><b>Password</b></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Sign Up
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{' '}
          <span onClick={onSwitch}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
