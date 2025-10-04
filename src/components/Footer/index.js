import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="nebula-footer">
            <div className="footer-container">
                {/* Company Info Section */}
                <div className="footer-section">
                    <h3 className="footer-title">Nebula Dev</h3>
                    <p className="footer-description">
                        Building powerful web applications and digital solutions that transform 
                        businesses and create exceptional user experiences across all platforms.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-link" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                        <a href="#" className="social-link" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" className="social-link" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="#" className="social-link" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="#" className="social-link" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                    </div>
                </div>

                {/* Services Section */}
                <div className="footer-section">
                    <h4 className="footer-subtitle">Services</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">Web App Development</a></li>
                        <li><a href="#" className="footer-link">Mobile Development</a></li>
                        <li><a href="#" className="footer-link">UI/UX Design</a></li>
                        <li><a href="#" className="footer-link">API Development</a></li>
                        <li><a href="#" className="footer-link">Cloud Solutions</a></li>
                    </ul>
                </div>

                {/* Company Section */}
                <div className="footer-section">
                    <h4 className="footer-subtitle">Company</h4>
                    <ul className="footer-links">
                        <li><a href="#" className="footer-link">About Us</a></li>
                        <li><a href="#" className="footer-link">Our Team</a></li>
                        <li><a href="#" className="footer-link">Careers</a></li>
                        <li><a href="#" className="footer-link">Blog & Resources</a></li>
                        <li><a href="#" className="footer-link">Portfolio</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div className="footer-section">
                    <h4 className="footer-subtitle">Contact</h4>
                    <div className="contact-info">
                        <p className="contact-item">
                            <strong>Email:</strong><br />
                            hello@nebuladev.com
                        </p>
                        <p className="contact-item">
                            <strong>Phone:</strong><br />
                            +1 (555) 123-4567
                        </p>
                        <p className="contact-item">
                            <strong>Address:</strong><br />
                            123 Innovation Drive<br />
                            Tech City, TC 12345
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p className="copyright">
                        © {currentYear} Nebula Dev. All rights reserved.
                    </p>
                    <div className="footer-legal">
                        <a href="#" className="legal-link">Privacy Policy</a>
                        <span className="separator">|</span>
                        <a href="#" className="legal-link">Terms of Service</a>
                        <span className="separator">|</span>
                        <a href="#" className="legal-link">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;