import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/forgot-password`, {
        email
      });

      if (response.data.success) {
        setMessage(response.data.message);
        // For development - show the reset URL
        if (response.data.resetUrl) {
          setResetUrl(response.data.resetUrl);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link');
    } finally {
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
          <h2>Forgot Password?</h2>
          <p>Enter your email to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              <span>⚠️ {error}</span>
            </div>
          )}

          {message && (
            <div className="success-message">
              <span>✅ {message}</span>
              {resetUrl && (
                <div style={{ marginTop: '10px', fontSize: '12px' }}>
                  <p style={{ marginBottom: '5px' }}>Development Mode - Use this link:</p>
                  <Link to={`/reset-password/${resetUrl.split('/').pop()}`} style={{ color: '#667eea', wordBreak: 'break-all' }}>
                    Click here to reset password
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope /> Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              disabled={loading || message}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={loading || message}>
            {loading ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              <>
                <FaEnvelope /> Send Reset Link
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login">
              <FaArrowLeft /> Back to Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
