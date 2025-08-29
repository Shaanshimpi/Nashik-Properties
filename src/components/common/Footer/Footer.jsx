import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/properties', label: 'Properties' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const propertyTypes = [
    { path: '/properties?type=apartment', label: 'Apartments' },
    { path: '/properties?type=villa', label: 'Villas' },
    { path: '/properties?type=commercial', label: 'Commercial' },
    { path: '/properties?type=plot', label: 'Plots' }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Company Info */}
          <div className="footer__section">
            <div className="footer__logo">
              <Link to="/" className="footer__logo-link">
                <span className="footer__logo-text">RealtyHome</span>
              </Link>
            </div>
            <p className="footer__description">
              Your trusted partner in finding the perfect property. We offer premium 
              real estate services with a commitment to excellence and customer satisfaction.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.2V1.77L15.8 1.8c-3.7 0-4.5 2.8-4.5 4.6v1.06H8.5v2.8h2.8V24h3.4V10.26h2.9l.37-2.8z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.32 4.56c-.85.38-1.78.64-2.75.76 1-.6 1.76-1.55 2.12-2.68-.93.55-1.96.95-3.06 1.17-.88-.94-2.13-1.53-3.51-1.53-2.66 0-4.81 2.16-4.81 4.81 0 .38.04.75.13 1.1-4-.2-7.57-2.11-9.96-5.02-.42.72-.66 1.55-.66 2.44 0 1.67.85 3.14 2.14 4-.79-.03-1.53-.24-2.18-.6v.06c0 2.33 1.66 4.28 3.87 4.72-.41.11-.83.17-1.27.17-.31 0-.62-.03-.92-.08.62 1.94 2.42 3.35 4.56 3.39-1.67 1.31-3.78 2.09-6.07 2.09-.39 0-.78-.02-1.17-.07 2.18 1.4 4.77 2.21 7.55 2.21 9.06 0 14.01-7.5 14.01-14.01 0-.21 0-.42-.01-.63.96-.69 1.79-1.56 2.45-2.55z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07zm0 5.84c-3.4 0-6.16 2.76-6.16 6.16s2.76 6.16 6.16 6.16 6.16-2.76 6.16-6.16-2.76-6.16-6.16-6.16zm0 10.16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.85-10.4c0-.79-.64-1.43-1.43-1.43s-1.43.64-1.43 1.43.64 1.43 1.43 1.43 1.43-.64 1.43-1.43z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4 className="footer__section-title">Quick Links</h4>
            <ul className="footer__links">
              {quickLinks.map((link) => (
                <li key={link.path} className="footer__link-item">
                  <Link to={link.path} className="footer__link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          {/* <div className="footer__section">
            <h4 className="footer__section-title">Property Types</h4>
            <ul className="footer__links">
              {propertyTypes.map((type) => (
                <li key={type.path} className="footer__link-item">
                  <Link to={type.path} className="footer__link">
                    {type.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact Info */}
          <div className="footer__section">
            <h4 className="footer__section-title">Contact Info</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>123 Main Street, Nashik, Maharashtra</span>
              </div>
              <div className="footer__contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+91 12345 67890</span>
              </div>
              <div className="footer__contact-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>info@realtyhome.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} RealtyHome. All rights reserved.
            </p>
            <div className="footer__bottom-links">
              <Link to="/privacy" className="footer__bottom-link">Privacy Policy</Link>
              <Link to="/terms" className="footer__bottom-link">Terms of Service</Link>
              <Link to="/cookies" className="footer__bottom-link">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;