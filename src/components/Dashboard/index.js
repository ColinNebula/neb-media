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
  FaEnvelope
} from "react-icons/fa";
import hero from "../../assets/images/hero.png";
import byte from "../../assets/images/byte.png";
import rider from "../../assets/images/rider.png";
import logo from "../../assets/images/logo.png";

function Dashboard() {
  const [lgShow, setLgShow] = useState(false);
  const [lgShow1, setLgShow1] = useState(false);

  const stats = [
    { icon: FaVideo, label: "Projects Completed", value: "150+", color: "#358ed3" },
    { icon: FaUsers, label: "Happy Clients", value: "75+", color: "#7eb8dc" },
    { icon: FaEye, label: "Total Views", value: "2M+", color: "#358ed3" },
    { icon: FaTrophy, label: "Awards Won", value: "12", color: "#7eb8dc" }
  ];

  const services = [
    {
      title: "Video Production",
      description: "Professional video content from concept to final cut",
      progress: 95,
      projects: 45
    },
    {
      title: "3D Animation", 
      description: "Stunning 3D animations and visual effects",
      progress: 88,
      projects: 32
    },
    {
      title: "Brand Strategy",
      description: "Complete brand development and marketing solutions", 
      progress: 92,
      projects: 28
    },
    {
      title: "Digital Marketing",
      description: "Data-driven marketing campaigns that deliver results",
      progress: 90,
      projects: 38
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      text: "Nebula Media transformed our brand vision into reality. Their attention to detail and creative approach exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen", 
      company: "Creative Solutions",
      text: "The team at Nebula Media delivered exceptional quality on time and within budget. Highly recommend their services.",
      rating: 5
    }
  ];

  return (
    <div className="professional-dashboard">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="dashboard-hero">
          <Row className="align-items-center mb-5">
            <Col lg={6}>
              <div className="hero-content">
                <Badge bg="primary" className="mb-3">Welcome to Nebula Media</Badge>
                <h1 className="display-4 fw-bold mb-3">
                  Transforming Ideas Into 
                  <span className="text-primary"> Digital Excellence</span>
                </h1>
                <p className="lead mb-4">
                  From simple concepts to surreal experiences, we craft compelling narratives 
                  that connect brands with their audiences across all digital platforms.
                </p>
                <div className="hero-buttons">
                  <Button variant="primary" size="lg" className="me-3">
                    <FaPlay className="me-2" />
                    View Our Work
                  </Button>
                  <Button variant="outline-primary" size="lg">
                    Get Started
                    <FaArrowRight className="ms-2" />
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="hero-image">
                <img src={hero} alt="Nebula Media Hero" className="img-fluid rounded-3 shadow-lg" />
              </div>
            </Col>
          </Row>
        </section>

        {/* Stats Section */}
        <section className="stats-section mb-5">
          <Row>
            {stats.map((stat, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="stat-card h-100 text-center border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <div className="stat-icon mb-3" style={{ color: stat.color }}>
                      <stat.icon size={40} />
                    </div>
                    <h3 className="stat-value mb-1">{stat.value}</h3>
                    <p className="stat-label text-muted mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Services Section */}
        <section className="services-section mb-5">
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-center mb-3">Our Expertise</h2>
              <p className="section-subtitle text-center text-muted">
                Delivering world-class solutions with proven results
              </p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="service-card h-100 border-0 shadow-sm">
                  <Card.Body className="p-4">
                    <h5 className="service-title mb-3">{service.title}</h5>
                    <p className="service-description text-muted mb-3">{service.description}</p>
                    <div className="service-stats mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="small">Expertise Level</span>
                        <span className="small fw-bold">{service.progress}%</span>
                      </div>
                      <ProgressBar 
                        now={service.progress} 
                        className="custom-progress" 
                        style={{ height: '6px' }}
                      />
                    </div>
                    <div className="service-projects">
                      <span className="small text-muted">{service.projects} projects completed</span>
                    </div>
                  </Card.Body>
                </Card>
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
                <img src={logo} width="120" height="50" alt="Nebula Media Logo" />
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
              Free Rider Animation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p className="lead mb-4">
              A stunning short low-budget animated film crafted entirely in Blender, 
              showcasing our expertise in 3D animation and storytelling.
            </p>
            <div className="video-container">
              <iframe 
                width="100%" 
                height="400" 
                src="https://www.youtube.com/embed/N2WhwHaicR4?si=DpZil3O_vevDpqEl" 
                title="Free Rider Animation - Nebula Media"
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
              Byte Size Soccer Videos
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <p className="lead mb-4">
              Nebula Media proudly collaborated with legendary British superstar goalkeeper 
              Tony Waiters to create this engaging educational video series.
            </p>
            <div className="video-container">
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/1wI6aDte_1Q"
                title="Byte Size Soccer - Nebula Media"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded"
              />
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default Dashboard;
