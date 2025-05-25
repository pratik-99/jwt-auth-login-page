import { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:4000/login', {
        username,
        password,
      });
      setMessage('Login successful!');
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      setMessage('Login failed!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Sign In
        </button>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}
