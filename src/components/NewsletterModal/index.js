import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { FaEnvelope, FaTimes, FaCheckCircle } from 'react-icons/fa';
import './NewsletterModal.css';

function NewsletterModal({ show, onHide }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call - replace with actual newsletter subscription API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store subscription in localStorage (replace with actual backend call)
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      subscribers.push({ email, name, date: new Date().toISOString() });
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

      setSubscribed(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('');
        setName('');
        setSubscribed(false);
        onHide();
      }, 3000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setName('');
    setSubscribed(false);
    setError('');
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose}
      centered
      className="newsletter-modal"
    >
      <Modal.Header className="newsletter-header border-0">
        <button 
          className="newsletter-close-btn"
          onClick={handleClose}
          aria-label="Close newsletter signup"
        >
          <FaTimes />
        </button>
      </Modal.Header>
      
      <Modal.Body className="newsletter-body">
        {!subscribed ? (
          <>
            <div className="newsletter-icon-container">
              <div className="newsletter-icon">
                <FaEnvelope />
              </div>
            </div>
            
            <h2 className="newsletter-title">Stay Updated!</h2>
            <p className="newsletter-description">
              Subscribe to our newsletter and get the latest updates, tutorials, 
              and exclusive content delivered straight to your inbox.
            </p>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="newsletter-input"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="newsletter-submit-btn w-100"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <FaEnvelope className="me-2" />
                    Subscribe to Newsletter
                  </>
                )}
              </Button>
            </Form>

            <p className="newsletter-privacy-note">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        ) : (
          <div className="newsletter-success">
            <div className="success-icon-container">
              <FaCheckCircle className="success-icon" />
            </div>
            <h3 className="success-title">Welcome Aboard! 🎉</h3>
            <p className="success-message">
              Thank you for subscribing! Check your inbox for a confirmation email.
            </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default NewsletterModal;
