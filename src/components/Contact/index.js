import React, { useState } from 'react';
import { 
  Card, 
  Container, 
  Row, 
  Col, 
  Form, 
  Button, 
  Alert,
  Badge 
} from 'react-bootstrap';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane,
  FaUser,
  FaBuilding,
  FaComments,
  FaCheckCircle,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaYoutube
} from 'react-icons/fa';
import logo from '../../assets/images/nebula-dev-logo.svg';

function Contact({ setCurrentTab }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    projectType: 'video-production'
  });
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setShowAlert(true);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      projectType: 'video-production'
    });

    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Our Location',
      details: ['46 Wildfire Road', 'Vaughan, ON L4L-8Y9', 'Canada'],
      color: '#358ed3'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      details: ['(416) 856-5764', 'Mon - Fri: 9:00 AM - 6:00 PM'],
      color: '#7eb8dc',
      link: 'tel:416.856.5764'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: ['nebulamedia3d@gmail.com', 'We respond within 24 hours'],
      color: '#358ed3',
      link: 'mailto:nebulamedia3d@gmail.com'
    },
    {
      icon: FaClock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed'],
      color: '#7eb8dc'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, url: 'https://linkedin.com/company/nebulamedia', color: '#0077B5' },
    { icon: FaTwitter, url: 'https://twitter.com/nebulamedia', color: '#1DA1F2' },
    { icon: FaInstagram, url: 'https://instagram.com/nebulamedia', color: '#E4405F' },
    { icon: FaYoutube, url: 'https://youtube.com/nebulamedia3d', color: '#FF0000' }
  ];

  return (
    <div className="professional-contact">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="contact-hero mb-5">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="contact-hero-content">
                <Badge bg="primary" className="mb-3">Get In Touch</Badge>
                <h1 className="display-4 fw-bold mb-3">
                  Let's Create Something 
                  <span className="text-primary"> Amazing Together</span>
                </h1>
                <p className="lead mb-4">
                  Ready to bring your vision to life? We'd love to hear about your project 
                  and discuss how Nebula Dev can help you build powerful web applications.
                </p>
                <div className="contact-stats">
                  <Row>
                    <Col sm={6} className="mb-3">
                      <div className="stat-item">
                        <h4 className="stat-number">24hrs</h4>
                        <p className="stat-label">Response Time</p>
                      </div>
                    </Col>
                    <Col sm={6} className="mb-3">
                      <div className="stat-item">
                        <h4 className="stat-number">150+</h4>
                        <p className="stat-label">Projects Completed</p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="contact-hero-image">
                <img 
                  src={logo} 
                  alt="Nebula Dev Logo" 
                  className="hero-logo"
                  width="200"
                  height="85"
                />
              </div>
            </Col>
          </Row>
        </section>

        {/* Alert for form submission */}
        {showAlert && (
          <Alert variant="success" className="mb-4" dismissible onClose={() => setShowAlert(false)}>
            <FaCheckCircle className="me-2" />
            Thank you for your message! We'll get back to you within 24 hours.
          </Alert>
        )}

        {/* Main Content */}
        <Row className="mb-5">
          {/* Contact Form */}
          <Col lg={8} className="mb-4">
            <Card className="contact-form-card border-0 shadow-lg">
              <Card.Body className="p-5">
                <div className="form-header mb-4">
                  <h2 className="form-title mb-2">Send Us a Message</h2>
                  <p className="form-subtitle text-muted">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="form-label">
                          <FaUser className="me-2" />
                          Full Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                          className="form-control-custom"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="form-label">
                          <FaEnvelope className="me-2" />
                          Email Address *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className="form-control-custom"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="form-label">
                          <FaBuilding className="me-2" />
                          Company/Organization
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name"
                          className="form-control-custom"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="form-label">
                          <FaPhone className="me-2" />
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(123) 456-7890"
                          className="form-control-custom"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="form-label">Project Type</Form.Label>
                        <Form.Select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleInputChange}
                          className="form-control-custom"
                        >
                          <option value="video-production">Video Production</option>
                          <option value="3d-animation">3D Animation</option>
                          <option value="digital-marketing">Digital Marketing</option>
                          <option value="brand-strategy">Brand Strategy</option>
                          <option value="web-development">Web Development</option>
                          <option value="consultation">Consultation</option>
                          <option value="other">Other</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group>
                        <Form.Label className="form-label">Subject *</Form.Label>
                        <Form.Control
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="Brief project description"
                          required
                          className="form-control-custom"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">
                      <FaComments className="me-2" />
                      Project Details *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your project, timeline, budget, and any specific requirements..."
                      required
                      className="form-control-custom"
                    />
                  </Form.Group>

                  <div className="form-footer">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="submit-button"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="me-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                    <p className="form-note mt-3 text-muted">
                      * Required fields. We respect your privacy and will never share your information. 
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (setCurrentTab) setCurrentTab('privacy-policy');
                        }}
                        style={{ 
                          color: 'var(--primary-color)', 
                          textDecoration: 'none',
                          marginLeft: '0.25rem'
                        }}
                      >
                        View Privacy Policy
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={4}>
            <div className="contact-info-section">
              {contactInfo.map((info, index) => (
                <Card key={index} className="contact-info-card border-0 shadow-sm mb-3">
                  <Card.Body className="p-4">
                    <div className="contact-info-header mb-3">
                      <div 
                        className="contact-icon"
                        style={{ backgroundColor: `${info.color}20`, color: info.color }}
                      >
                        <info.icon />
                      </div>
                      <h5 className="contact-info-title">{info.title}</h5>
                    </div>
                    <div className="contact-info-details">
                      {info.details.map((detail, i) => (
                        <p key={i} className="contact-detail">
                          {info.link && i === 0 ? (
                            <a href={info.link} className="contact-link">
                              {detail}
                            </a>
                          ) : (
                            detail
                          )}
                        </p>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ))}

              {/* Social Media */}
              <Card className="social-media-card border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <h5 className="social-title mb-3">Follow Us</h5>
                  <div className="social-links">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-link"
                        style={{ '--hover-color': social.color }}
                      >
                        <social.icon />
                      </a>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* CTA Section */}
        <section className="contact-cta">
          <Card className="cta-card border-0 shadow-lg bg-gradient-primary text-white">
            <Card.Body className="p-5 text-center">
              <h2 className="cta-title mb-3">Ready to Get Started?</h2>
              <p className="cta-description mb-4">
                Let's discuss your project and explore how we can bring your vision to life. 
                Our team is ready to provide you with a customized solution that meets your needs.
              </p>
              <div className="cta-buttons">
                <Button 
                  variant="light" 
                  size="lg" 
                  href="tel:416.856.5764"
                  className="me-3"
                >
                  <FaPhone className="me-2" />
                  Call Now
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  href="mailto:nebulamedia3d@gmail.com"
                >
                  <FaEnvelope className="me-2" />
                  Email Us
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </div>
  );
}

export default Contact;