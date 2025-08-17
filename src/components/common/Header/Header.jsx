import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/logo/npc-logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.header')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <Link to="/" className="header__logo-link">
              <img 
                src={logo} 
                alt="Nashik Properties Club" 
                className="header__logo-image"
              />
              <span>Nashik Properties Club</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav header__nav--desktop">
            <ul className="header__nav-list">
              {navigationItems.map((item) => (
                <li key={item.path} className="header__nav-item">
                  <Link 
                    to={item.path} 
                    className={`header__nav-link ${isActiveLink(item.path) ? 'header__nav-link--active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button */}
          <div className="header__cta">
            <Link to="/contact" className="header__cta-button">
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <span className="header__menu-toggle-line"></span>
            <span className="header__menu-toggle-line"></span>
            <span className="header__menu-toggle-line"></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`header__nav header__nav--mobile ${isMenuOpen ? 'header__nav--mobile-open' : ''}`}>
          <ul className="header__nav-list">
            {navigationItems.map((item) => (
              <li key={item.path} className="header__nav-item">
                <Link 
                  to={item.path} 
                  className={`header__nav-link ${isActiveLink(item.path) ? 'header__nav-link--active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="header__nav-item">
              <Link 
                to="/contact" 
                className="header__nav-link header__nav-link--cta"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Quote
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;