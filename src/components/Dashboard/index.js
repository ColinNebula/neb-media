import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Container,
  Modal,
  Badge,
  ProgressBar,
} from "react-bootstrap";
import { 
  FaPlay, 
  FaEye, 
  FaTrophy, 
  FaUsers, 
  FaChartLine, 
  FaVideo,
  FaQuoteLeft,
  FaStar,
  FaArrowRight,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRocket,
  FaLightbulb,
  FaCog,
  FaExternalLinkAlt,
  FaCamera,
  FaShieldAlt,
  FaGamepad,
  FaDesktop
} from "react-icons/fa";
import hero from "../../assets/images/hero.png";
import byte from "../../assets/images/byte.png";
import rider from "../../assets/images/rider.png";
import logo from "../../assets/images/nebula-dev-logo.svg";

function Dashboard({ setCurrentTab }) {
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);
  const [showGetStarted, setShowGetStarted] = useState(false);

  const handleViewOurWork = () => {
    if (setCurrentTab) {
      setCurrentTab('video-player');
    }
  };

  const stats = [
    { icon: FaVideo, label: "Apps Developed", value: "150+", color: "var(--primary-color)", gradient: "var(--primary-gradient)" },
    { icon: FaUsers, label: "Happy Clients", value: "75+", color: "var(--secondary-color)", gradient: "var(--secondary-gradient)" },
    { icon: FaEye, label: "Code Reviews", value: "2K+", color: "var(--accent-color)", gradient: "var(--accent-gradient)" },
    { icon: FaTrophy, label: "Awards Won", value: "12", color: "var(--primary-color)", gradient: "var(--dark-gradient)" }
  ];

  const services = [
    {
      icon: FaVideo,
      title: "Web App Development",
      description: "Custom web applications built with React, Vue, and Node.js using modern architecture",
      progress: 95,
      projects: 45,
      gradient: "var(--primary-gradient)"
    },
    {
      icon: FaRocket,
      title: "Mobile Development", 
      description: "Native and cross-platform mobile apps with React Native and Flutter",
      progress: 88,
      projects: 32,
      gradient: "var(--secondary-gradient)"
    },
    {
      icon: FaLightbulb,
      title: "UI/UX Design",
      description: "User-centered design and prototyping with Figma and modern design systems", 
      progress: 92,
      projects: 28,
      gradient: "var(--accent-gradient)"
    },
    {
      icon: FaCog,
      title: "API Development",
      description: "RESTful and GraphQL APIs with comprehensive documentation and testing",
      progress: 90,
      projects: 38,
      gradient: "var(--dark-gradient)"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Nebula Dev transformed our business with a powerful web platform. Their technical expertise and agile approach exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen", 
      company: "Creative Solutions",
      text: "The team at Nebula Dev delivered a scalable application on time and within budget. Highly recommend their development services.",
      rating: 5
    }
  ];

  const featuredApps = [
    {
      title: "Nebula Screen Capture",
      description: "Professional screen recording and capture tool with advanced editing features and real-time annotations.",
      url: "https://colinnebula.github.io/nebula-screen-capture/",
      icon: FaCamera,
      badge: "Productivity Tool",
      badgeColor: "primary",
      tech: ["React", "Web APIs", "Canvas"],
      gradient: "var(--primary-gradient)"
    },
    {
      title: "Nebula Media Platform",
      description: "Complete media management and production platform with advanced workflow automation and collaboration tools.",
      url: "http://localhost:3000",
      icon: FaDesktop,
      badge: "Media Production",
      badgeColor: "success",
      tech: ["React", "Node.js", "MySQL"],
      gradient: "var(--secondary-gradient)"
    },
    {
      title: "Nebula VPN Client",
      description: "Secure and fast VPN client with military-grade encryption, global server network, and zero-log policy.",
      url: "https://colinnebula.github.io/nebula-vpn-client/",
      icon: FaShieldAlt,
      badge: "Security Tool",
      badgeColor: "warning",
      tech: ["React", "WebRTC", "Encryption"],
      gradient: "var(--accent-gradient)"
    },
    {
      title: "Quibish",
      description: "Interactive gaming platform with real-time multiplayer capabilities and engaging user experience.",
      url: "https://colinnebula.github.io/quibish",
      icon: FaGamepad,
      badge: "Gaming Platform",
      badgeColor: "danger",
      tech: ["React", "WebSocket", "Canvas"],
      gradient: "var(--dark-gradient)"
    }
  ];

  return (
    <div className="professional-dashboard">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="dashboard-hero">
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <div className="hero-content animate-slide-in-left">
                <Badge className="mb-3 px-3 py-2" style={{ background: 'var(--accent-gradient)', border: 'none' }}>
                  Welcome to Nebula Dev
                </Badge>
                <h1 className="display-4 fw-bold mb-3">
                  Building Powerful 
                  <span className="text-gradient"> Web Applications</span>
                </h1>
                <p className="lead mb-4" style={{ color: 'var(--text-muted)' }}>
                  From innovative startups to enterprise solutions, we develop cutting-edge web applications 
                  that drive business growth and deliver exceptional user experiences.
                </p>
                <div className="hero-buttons">
                  <Button className="btn-modern me-3" size="lg" onClick={handleViewOurWork}>
                    <FaPlay className="me-2" />
                    View Our Work
                  </Button>
                  <Button className="btn-outline-modern" size="lg" onClick={() => setShowGetStarted(true)}>
                    Get Started
                    <FaArrowRight className="ms-2" />
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image animate-slide-in-right">
                <div className="image-wrapper position-relative">
                  <img 
                    src={hero} 
                    alt="Nebula Dev Hero" 
                    className="img-fluid rounded-3 shadow-lg animate-float" 
                    style={{ borderRadius: 'var(--radius-xl)' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      console.log('Hero image failed to load');
                    }}
                  />
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 rounded-3"
                    style={{
                      background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(240, 147, 251, 0.1))',
                      borderRadius: 'var(--radius-xl)'
                    }}
                  ></div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Stats Section */}
        <section className="stats-section mb-5">
          <Row>
            {stats.map((stat, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <div className="stats-card animate-fade-in-scale" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="stats-icon" style={{ background: stat.gradient }}>
                    <stat.icon />
                  </div>
                  <div className="stats-value">{stat.value}</div>
                  <div className="stats-label">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Services Section */}
        <section className="services-section mb-5">
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center mb-3 animate-fade-in-up">Our Expertise</h2>
              <p className="section-subtitle text-center text-muted animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Delivering world-class solutions with proven results across multiple industries
              </p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <div className="modern-card animate-fade-in-scale" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="service-icon mb-3" style={{ background: service.gradient }}>
                    <service.icon style={{ color: 'white', fontSize: '1.5rem' }} />
                  </div>
                  <h5 className="service-title mb-3">{service.title}</h5>
                  <p className="service-description mb-3">{service.description}</p>
                  <div className="service-stats mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="small fw-bold">Expertise Level</span>
                      <span className="small fw-bold text-primary">{service.progress}%</span>
                    </div>
                    <div className="progress-container">
                      <div 
                        className="progress-bar-modern" 
                        style={{ 
                          width: `${service.progress}%`,
                          background: service.gradient
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="service-projects">
                    <Badge bg="light" text="dark" className="fw-bold">
                      {service.projects} projects completed
                    </Badge>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Projects */}
        <section className="projects-section mb-5">
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center mb-3">Featured Projects</h2>
              <p className="section-subtitle text-center text-muted">
                Showcasing our latest creative achievements
              </p>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col lg={6} className="mb-4">
              <Card className="project-card border-0 shadow-lg overflow-hidden">
                <div className="project-image-container">
                  <Card.Img src={rider} className="project-image" />
                  <div className="project-overlay">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="play-button"
                      onClick={() => setLgShow1(true)}
                    >
                      <FaPlay className="me-2" />
                      Watch Now
                    </Button>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <Badge bg="primary" className="mb-2">3D Animation</Badge>
                  <h4 className="project-title mb-2">Free Rider Animation</h4>
                  <p className="project-description text-muted mb-3">
                    A captivating low-poly animated film showcasing our 3D expertise, 
                    completely crafted in Blender with attention to every detail.
                  </p>
                  <div className="project-meta">
                    <span className="small text-muted">
                      <FaCalendarAlt className="me-1" />
                      2024 • Animation Studio
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={6} className="mb-4">
              <Card className="project-card border-0 shadow-lg overflow-hidden">
                <div className="project-image-container">
                  <Card.Img src={byte} className="project-image" />
                  <div className="project-overlay">
                    <Button 
                      variant="light" 
                      size="lg" 
                      className="play-button"
                      onClick={() => setLgShow(true)}
                    >
                      <FaPlay className="me-2" />
                      Watch Series
                    </Button>
                  </div>
                </div>
                <Card.Body className="p-4">
                  <Badge bg="success" className="mb-2">Video Series</Badge>
                  <h4 className="project-title mb-2">Byte Size Soccer</h4>
                  <p className="project-description text-muted mb-3">
                    Educational video series featuring legendary British goalkeeper Tony Waiters, 
                    teaching young players the fundamentals of soccer.
                  </p>
                  <div className="project-meta">
                    <span className="small text-muted">
                      <FaCalendarAlt className="me-1" />
                      2023 • Educational Content
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Featured Web Apps Section */}
        <section className="featured-apps-section mb-5">
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center mb-3">Featured Web Applications</h2>
              <p className="section-subtitle text-center text-muted">
                Explore our production-ready web applications built with cutting-edge technologies
              </p>
            </Col>
          </Row>
          <Row>
            {featuredApps.map((app, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="modern-card h-100 border-0 shadow-sm hover-lift">
                  <Card.Body className="p-4 d-flex flex-column">
                    <div className="app-icon mb-3" style={{ 
                      background: app.gradient,
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <app.icon style={{ color: 'white', fontSize: '1.8rem' }} />
                    </div>
                    <Badge bg={app.badgeColor} className="mb-3 align-self-start">
                      {app.badge}
                    </Badge>
                    <h5 className="app-title mb-3 fw-bold">{app.title}</h5>
                    <p className="app-description text-muted mb-3 flex-grow-1">
                      {app.description}
                    </p>
                    <div className="tech-stack mb-3">
                      <div className="d-flex flex-wrap gap-1">
                        {app.tech.map((tech, i) => (
                          <Badge key={i} bg="light" text="dark" className="small">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline-primary" 
                      className="w-100 d-flex align-items-center justify-content-center"
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt className="me-2" />
                      Launch App
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Testimonials */}
        <section className="testimonials-section mb-5">
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center mb-3">Client Success Stories</h2>
              <p className="section-subtitle text-center text-muted">
                What our clients say about working with us
              </p>
            </Col>
          </Row>
          <Row>
            {testimonials.map((testimonial, index) => (
              <Col md={6} key={index} className="mb-4">
                <Card className="testimonial-card h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="testimonial-quote mb-3">
                      <FaQuoteLeft className="quote-icon text-primary mb-3" />
                      <p className="testimonial-text">{testimonial.text}</p>
                    </div>
                    <div className="testimonial-rating mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-warning me-1" />
                      ))}
                    </div>
                    <div className="testimonial-author">
                      <h6 className="author-name mb-1">{testimonial.name}</h6>
                      <span className="author-company text-muted">{testimonial.company}</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Contact CTA */}
        <section className="contact-cta mb-5">
          <Card className="cta-card border-0 shadow-lg bg-gradient-primary text-white">
            <Card.Body className="p-5 text-center">
              <div className="cta-logo mb-3">
                <img src={logo} width="120" height="50" alt="Nebula Dev Logo" />
              </div>
              <h2 className="cta-title mb-3">Ready to Bring Your Vision to Life?</h2>
              <p className="cta-description mb-4">
                Let's collaborate to create compelling content that resonates with your audience 
                and drives real results for your business.
              </p>
              
              <Row className="contact-info mb-4">
                <Col md={4} className="mb-3">
                  <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon mb-2" />
                    <p className="mb-0">55 Main Street<br />Vaughan, ON L4L-8Y9</p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="contact-item">
                    <FaPhone className="contact-icon mb-2" />
                    <p className="mb-0">
                      <a href="tel:416.856.5764" className="text-white text-decoration-none">
                        (416) 856-5764
                      </a>
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="contact-item">
                    <FaEnvelope className="contact-icon mb-2" />
                    <p className="mb-0">
                      <a href="mailto:nebulamedia3d@gmail.com" className="text-white text-decoration-none">
                        nebulamedia3d@gmail.com
                      </a>
                    </p>
                  </div>
                </Col>
              </Row>
              
              <div className="cta-buttons">
                <Button variant="light" size="lg" className="me-3">
                  <FaEnvelope className="me-2" />
                  Get In Touch
                </Button>
                <Button variant="outline-light" size="lg">
                  View Portfolio
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Modals */}
        <Modal
          size="xl"
          show={lgShow1}
          onHide={() => setLgShow1(false)}
          aria-labelledby="rider-modal-title"
          centered
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title id="rider-modal-title">
              E-Commerce Platform Development
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p className="lead mb-4">
              A comprehensive e-commerce platform built with React and Node.js, 
              featuring real-time inventory management, secure payments, and advanced analytics.
            </p>
            <div className="video-container">
              <iframe 
                width="100%" 
                height="400" 
                src="https://www.youtube.com/embed/N2WhwHaicR4?si=DpZil3O_vevDpqEl" 
                title="E-Commerce Platform - Nebula Dev"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
                className="rounded"
              />
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          size="xl"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="byte-modal-title"
          centered
        >
          <Modal.Header closeButton className="border-0">
            <Modal.Title id="byte-modal-title">
              SaaS Dashboard Application
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p className="lead mb-4">
              Nebula Dev created this comprehensive SaaS dashboard with advanced data visualization, 
              real-time updates, and intuitive user management for enterprise clients.
            </p>
            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/1wI6aDte_1Q"
                title="SaaS Dashboard - Nebula Dev"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded"
              />
            </div>
          </Modal.Body>
        </Modal>

        {/* Get Started Modal */}
        <Modal 
          show={showGetStarted} 
          onHide={() => setShowGetStarted(false)}
          size="xl"
          centered
          className="get-started-modal"
        >
          <Modal.Header closeButton style={{ 
            background: 'var(--primary-gradient)',
            color: 'white',
            border: 'none'
          }}>
            <Modal.Title>
              <FaRocket className="me-2" />
              Get Started with Nebula Dev
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ 
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: '2rem'
          }}>
            <div className="get-started-content">
              <div className="text-center mb-4">
                <h3 style={{ color: 'var(--text-primary)' }}>Explore Our Featured Applications</h3>
                <p className="lead" style={{ color: 'var(--text-muted)' }}>
                  Check out our latest web applications and see what we can build for you
                </p>
              </div>

              <Row className="g-4">
                {featuredApps.map((app, index) => (
                  <Col md={6} key={index}>
                    <Card className="featured-app-card h-100" style={{
                      background: 'var(--bg-surface-alt)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      transition: 'all 0.3s ease',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: app.gradient,
                        padding: '2rem',
                        textAlign: 'center'
                      }}>
                        <app.icon size={60} color="white" />
                      </div>
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <h5 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                            {app.title}
                          </h5>
                          <Badge bg={app.badgeColor}>{app.badge}</Badge>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                          {app.description}
                        </p>
                        <div className="tech-stack mb-3">
                          {app.tech.map((tech, techIndex) => (
                            <Badge 
                              key={techIndex} 
                              bg="secondary" 
                              className="me-2 mb-2"
                              style={{ 
                                background: 'var(--bg-surface)',
                                color: 'var(--text-secondary)',
                                border: '1px solid var(--border-color)'
                              }}
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant="outline-primary" 
                          className="w-100"
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '500'
                          }}
                        >
                          Launch App <FaExternalLinkAlt className="ms-2" size={14} />
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div className="text-center mt-5">
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                  Ready to Build Your Own App?
                </h4>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Let's discuss your project and turn your ideas into reality
                </p>
                <Button 
                  size="lg"
                  className="btn-modern me-3"
                  onClick={() => {
                    setShowGetStarted(false);
                    setCurrentTab('contact');
                  }}
                >
                  <FaEnvelope className="me-2" />
                  Contact Us
                </Button>
                <Button 
                  size="lg"
                  variant="outline-secondary"
                  onClick={() => {
                    setShowGetStarted(false);
                    setCurrentTab('about-us');
                  }}
                >
                  Learn More About Us
                  <FaArrowRight className="ms-2" />
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
