import React from 'react';
import { FaPlay, FaSave, FaFolder, FaCode, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onRun, onSave, canRun, canSave }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <FaCode className="logo-icon" />
        <h1>CipherStudio</h1>
        <span className="version">v2.0</span>
      </div>
      
      <div className="navbar-center">
        <button 
          className="nav-btn" 
          onClick={onSave} 
          disabled={!canSave}
          title="Save (Ctrl+S)"
        >
          <FaSave /> Save
        </button>
        <button 
          className="nav-btn primary" 
          onClick={onRun} 
          disabled={!canRun}
          title="Run Code (Ctrl+Enter)"
        >
          <FaPlay /> Run
        </button>
      </div>
      
      <div className="navbar-right">
        <div className="user-info">
          <FaUser className="user-icon" />
          <span className="username">{user?.username || 'User'}</span>
        </div>
        <button className="nav-btn logout-btn" onClick={handleLogout} title="Logout">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
