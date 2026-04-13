import React from 'react';
import { Link } from 'react-scroll';
import './Navbar.css';

// Create a context for images
const image = require.context('./images', false, /\.(png|jpe?g|svg)$/);

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <ul>
        <div className="navbar-link-group">
          <li><Link to="skills-marker" smooth={true} duration={500}>Skills</Link></li>
          <li><Link to="background-marker" smooth={true} duration={500}>Background</Link></li>
        </div>

        <li><Link to="home" smooth={true} duration={500}> <img src={image("./avatar.png")} className="avatar" alt="avatar"/></Link></li>
        <div className="navbar-link-group">
          <li><Link to="projects" smooth={true} duration={500}>Projects</Link></li>
          <li><Link to="contact" smooth={true} duration={500}>Contact</Link></li>
          <li className="theme-toggle-item">
            <label className="theme-toggle" htmlFor="theme-toggle-input" title="Toggle dark mode">
              <span className="toggle-icon">☀</span>
              <input
                type="checkbox"
                id="theme-toggle-input"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-icon">🌙</span>
            </label>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
