
import React, { useState } from 'react';
import { Container, Button, Dropdown } from 'react-bootstrap/';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { 
  FaHome, 
  FaUser, 
  FaEnvelope, 
  FaQuestionCircle, 
  FaBars,
  FaTimes,
  FaGithub,
  FaYoutube,
  FaLinkedin,
  FaTwitter,
  FaSun,
  FaMoon,
  FaSignInAlt,
  FaSignOutAlt,
  FaCog,
  FaChartBar
} from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import AuthModal from '../AuthModal';
import logo from '../../assets/images/logo.png';
import './SideNav.css';

function SideNav(props) {
  const { currentTab, setCurrentTab } = props;
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const { user, logout } = useUser();

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  const handleLogout = async () => {
    try {
      await logout();
      setShowOffcanvas(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FaHome,
      tab: 'dashboard'
    },
    {
      id: 'about-us',
      label: 'About Us',
      icon: FaUser,
      tab: 'about-us'
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: FaEnvelope,
      tab: 'contact'
    },
    {
      id: 'faq',
      label: 'FAQs',
      icon: FaQuestionCircle,
      tab: 'faq'
    }
  ];

  const socialLinks = [
    {
      url: 'https://github.com/ColinNebula',
      icon: FaGithub,
      label: 'GitHub',
      color: '#333'
    },
    {
      url: 'https://linkedin.com/company/nebuladev',
      icon: FaLinkedin,
      label: 'LinkedIn',
      color: '#0077B5'
    },
    {
      url: 'https://twitter.com/nebuladev',
      icon: FaTwitter,
      label: 'Twitter',
      color: '#1DA1F2'
    },
    {
      url: 'mailto:hello@nebuladev.com',
      icon: FaEnvelope,
      label: 'Email',
      color: '#358ed3'
    }
  ];

  const handleNavClick = (tab) => {
    setCurrentTab(tab);
    handleCloseOffcanvas();
  };

  return (
    <div className="professional-nav">
      {/* Main Navigation Bar */}
      <Navbar 
        expand={false} 
        className="modern-nav shadow-sm"
        fixed="top"
      >
        <Container fluid className="px-4">
          {/* Brand Logo */}
          <Navbar.Brand 
            href="#" 
            className="nav-brand d-flex align-items-center"
            onClick={() => handleNavClick('dashboard')}
          >
            <img 
              src={logo} 
              width="120" 
              height="50" 
              alt="Nebula Dev Logo" 
              className="brand-logo me-2"
              onError={(e) => {
                e.target.style.display = 'none';
                console.log('Logo failed to load');
              }}
            />
            <span className="nav-brand">Nebula Dev</span>
          </Navbar.Brand>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center">
            <Nav className="desktop-nav">
              {navigationItems.map((item) => (
                <Nav.Link
                  key={item.id}
                  className={`nav-link-modern ${currentTab === item.tab ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.tab)}
                >
                  <item.icon className="me-2" />
                  {item.label}
                </Nav.Link>
              ))}
            </Nav>
            
            {/* Authentication Section */}
            <div className="auth-section ms-3">
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="outline-primary" 
                    className="user-dropdown-toggle d-flex align-items-center"
                    id="user-dropdown"
                  >
                    <FaUser className="me-2" />
                    {user.username || user.email}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown-menu">
                    <Dropdown.Item onClick={() => handleNavClick('profile')}>
                      <FaCog className="me-2" />
                      Profile Settings
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavClick('analytics')}>
                      <FaChartBar className="me-2" />
                      My Projects
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => setShowAuthModal(true)}
                  className="login-btn"
                >
                  <FaSignInAlt className="me-2" />
                  Login
                </Button>
              )}
            </div>
            
            {/* Theme Toggle Button */}
            <button
              className="theme-toggle-btn ms-3"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              {isDark ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle d-lg-none"
            onClick={handleShowOffcanvas}
            aria-label="Open navigation menu"
          >
            <FaBars />
          </button>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={handleCloseOffcanvas} 
        placement="end"
        className="professional-offcanvas"
      >
        <Offcanvas.Header className="offcanvas-header-custom">
          <div className="offcanvas-brand">
            <img 
              src={logo} 
              width="100" 
              height="42" 
              alt="Nebula Dev Logo" 
              className="mb-2"
            />
            <h5 className="brand-title mb-0">Nebula Dev</h5>
            <p className="brand-subtitle">Web App Development</p>
          </div>
          <button
            className="offcanvas-close-btn"
            onClick={handleCloseOffcanvas}
            aria-label="Close navigation menu"
          >
            <FaTimes />
          </button>
        </Offcanvas.Header>

        <Offcanvas.Body className="offcanvas-body-custom">
          {/* User Section */}
          {user && (
            <div className="user-section">
              <div className="user-info">
                <FaUser className="user-avatar" />
                <div className="user-details">
                  <h6 className="user-name">{user.username || user.email}</h6>
                  <p className="user-email">{user.email}</p>
                </div>
              </div>
              <hr className="nav-divider" />
            </div>
          )}

          {/* Navigation Links */}
          <Nav className="mobile-nav flex-column">
            {navigationItems.map((item) => (
              <Nav.Link
                key={item.id}
                className={`nav-item-mobile ${currentTab === item.tab ? 'active' : ''}`}
                onClick={() => handleNavClick(item.tab)}
              >
                <div className="nav-item-content">
                  <item.icon className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </div>
              </Nav.Link>
            ))}

            {/* User-specific navigation */}
            {user && (
              <>
                <Nav.Link
                  className={`nav-item-mobile ${currentTab === 'profile' ? 'active' : ''}`}
                  onClick={() => handleNavClick('profile')}
                >
                  <div className="nav-item-content">
                    <FaCog className="nav-icon" />
                    <span className="nav-label">Profile Settings</span>
                  </div>
                </Nav.Link>
                <Nav.Link
                  className={`nav-item-mobile ${currentTab === 'analytics' ? 'active' : ''}`}
                  onClick={() => handleNavClick('analytics')}
                >
                  <div className="nav-item-content">
                    <FaChartBar className="nav-icon" />
                    <span className="nav-label">My Projects</span>
                  </div>
                </Nav.Link>
              </>
            )}
          </Nav>

          {/* Divider */}
          <hr className="nav-divider" />

          {/* Authentication Section */}
          <div className="auth-section-mobile">
            {user ? (
              <button
                className="auth-btn logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="auth-icon" />
                <span className="auth-label">Logout</span>
              </button>
            ) : (
              <button
                className="auth-btn login-btn"
                onClick={() => {
                  setShowAuthModal(true);
                  setShowOffcanvas(false);
                }}
              >
                <FaSignInAlt className="auth-icon" />
                <span className="auth-label">Login / Register</span>
              </button>
            )}
          </div>

          {/* Divider */}
          <hr className="nav-divider" />

          {/* Theme Toggle */}
          <div className="theme-section">
            <h6 className="theme-title">Appearance</h6>
            <button
              className="theme-toggle-mobile"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            >
              <div className="theme-toggle-content">
                {isDark ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
                <span className="theme-label">{isDark ? 'Light Theme' : 'Dark Theme'}</span>
              </div>
            </button>
          </div>

          {/* Divider */}
          <hr className="nav-divider" />

          {/* Social Links */}
          <div className="social-section">
            <h6 className="social-title">Connect With Us</h6>
            <div className="social-links-container">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-professional"
                  style={{ '--hover-color': social.color }}
                  aria-label={social.label}
                >
                  <social.icon className="social-icon" />
                  <span className="social-label">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="contact-section">
            <h6 className="contact-title">Get In Touch</h6>
            <div className="contact-info">
              <p className="contact-item">
                <strong>Email:</strong><br />
                hello@nebuladev.com
              </p>
              <p className="contact-item">
                <strong>Phone:</strong><br />
                (416) 856-5764
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="offcanvas-footer">
            <p className="footer-text">
              © 2025 Nebula Dev<br />
              <span className="footer-tagline">Building Powerful Web Applications</span>
            </p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Authentication Modal */}
      <AuthModal 
        show={showAuthModal} 
        onHide={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

export default SideNav;