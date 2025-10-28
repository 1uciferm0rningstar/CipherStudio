import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaCode, FaLock, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        password
      });

      if (response.data.success) {
        alert('✅ Password reset successful! You can now login with your new password.');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-shape shape-1"></div>
        <div className="auth-shape shape-2"></div>
        <div className="auth-shape shape-3"></div>
      </div>
      
      <div className="auth-box">
        <div className="auth-header">
          <div className="auth-logo">
            <FaCode className="logo-icon" />
            <h1>CipherStudio</h1>
          </div>
          <h2>Reset Password</h2>
          <p>Enter your new password</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password">
              <FaLock /> New Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <FaCheck /> Confirm Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Resetting...
              </>
            ) : (
              <>
                <FaCheck /> Reset Password
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login">Back to Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
