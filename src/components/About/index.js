import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Badge, 
  Button,
  Modal,
  ProgressBar
} from 'react-bootstrap';
import { 
  FaVideo,
  FaCube,
  FaPalette,
  FaCode,
  FaUsers,
  FaAward,
  FaLightbulb,
  FaHeart,
  FaPlay,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaCalendarAlt,
  FaTrophy,
  FaEye,
  FaMagic,
  FaFilm,
  FaCogs,
  FaPaintBrush,
  FaDesktop
} from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

function About() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'video-editing',
      title: 'Video Editing & Compositing',
      icon: FaVideo,
      description: 'Professional video editing and compositing services that bring your vision to life.',
      details: 'Our bread and butter service includes sorting through footage, creating compelling narratives, advanced compositing, and high-quality rendering. We specialize in customizations and seamless 3D integration to elevate your content.',
      skills: ['Adobe Premiere Pro', 'DaVinci Resolve', 'After Effects', 'Final Cut Pro'],
      color: '#358ed3'
    },
    {
      id: 'animation',
      title: '3D Animation',
      icon: FaCube,
      description: 'Custom 3D animations tailored to your specific needs and complexity requirements.',
      details: 'From simple motion graphics to complex character animations, we create stunning 3D animations. Each piece is priced individually based on complexity, ensuring you get exactly what you need.',
      skills: ['Cinema 4D', 'Blender', 'Maya', 'Motion Graphics'],
      color: '#7eb8dc'
    },
    {
      id: 'modeling',
      title: '3D Modeling',
      icon: FaCogs,
      description: 'Object digitization and custom 3D modeling for unique and personalized content.',
      details: 'We specialize in creating detailed 3D models from scratch or digitizing real-world objects. Our models are optimized for various applications including video integration, web, and interactive media.',
      skills: ['3D Sculpting', 'Texturing', 'UV Mapping', 'Optimization'],
      color: '#5cb85c'
    },
    {
      id: '3d-integration',
      title: '3D Integration',
      icon: FaMagic,
      description: 'Seamless integration of 3D elements into live-action footage.',
      details: 'Advanced video manipulation techniques to incorporate 3D features that look natural and professional. We handle camera tracking, lighting matching, and realistic rendering.',
      skills: ['Motion Tracking', 'Camera Matching', 'Lighting', 'Compositing'],
      color: '#f0ad4e'
    },
    {
      id: '2d-art',
      title: '2D Art & Graphics',
      icon: FaPaintBrush,
      description: 'Custom 2D artwork and graphic design integration for video projects.',
      details: 'Creative 2D art solutions including custom illustrations, graphic overlays, title sequences, and brand integration that enhances your video content.',
      skills: ['Illustrator', 'Photoshop', 'Typography', 'Brand Design'],
      color: '#d9534f'
    },
    {
      id: 'green-screen',
      title: 'Green Screen & VFX',
      icon: FaDesktop,
      description: 'Professional green screen removal and advanced visual effects.',
      details: 'High-quality chroma key removal, background replacement, and advanced visual effects that create immersive and professional-looking content.',
      skills: ['Chroma Key', 'Rotoscoping', 'VFX', 'Background Replacement'],
      color: '#5bc0de'
    }
  ];

  const team = [
    {
      name: 'Colin Nebula',
      role: 'Founder & Creative Director',
      bio: 'With over 8 years in video production, Colin leads our creative vision and ensures every project meets the highest standards.',
      image: logo,
      skills: ['Creative Direction', 'Video Production', 'Client Relations'],
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Lead 3D Artist',
      bio: 'Specialized in complex 3D modeling and animation with expertise in both technical and artistic aspects.',
      image: logo,
      skills: ['3D Modeling', 'Animation', 'Texturing'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Mike Rodriguez',
      role: 'Senior Video Editor',
      bio: 'Expert in post-production workflows with a keen eye for storytelling and visual composition.',
      image: logo,
      skills: ['Video Editing', 'Color Grading', 'Sound Design'],
      social: {
        linkedin: '#',
        instagram: '#'
      }
    }
  ];

  const stats = [
    { number: '150+', label: 'Projects Completed', icon: FaTrophy },
    { number: '75+', label: 'Happy Clients', icon: FaUsers },
    { number: '8+', label: 'Years Experience', icon: FaCalendarAlt },
    { number: '98%', label: 'Client Satisfaction', icon: FaHeart }
  ];

  const values = [
    {
      icon: FaLightbulb,
      title: 'Innovation',
      description: 'We embrace cutting-edge technology and creative solutions to deliver exceptional results.'
    },
    {
      icon: FaAward,
      title: 'Quality',
      description: 'Every project receives our meticulous attention to detail and commitment to excellence.'
    },
    {
      icon: FaUsers,
      title: 'Collaboration',
      description: 'We work closely with clients to understand their vision and exceed expectations.'
    },
    {
      icon: FaHeart,
      title: 'Passion',
      description: 'Our love for storytelling and visual arts drives us to create memorable content.'
    }
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };

  return(
    <div className="professional-about">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="about-hero mb-5">
          <Row className="align-items-center">
            <Col lg={6}>
              <Badge bg="primary" className="mb-3">
                <FaEye className="me-2" />
                Our Story
              </Badge>
              <h1 className="display-4 fw-bold mb-3">
                Bringing Your 
                <span className="text-primary"> Vision to Life</span>
              </h1>
              <p className="lead mb-4">
                Since our inception, Nebula Media has been delivering high-quality video content 
                customized to the unique specifications of each client. Our dedicated team combines 
                technical expertise with creative vision to create compelling digital experiences.
              </p>
              <div className="hero-buttons">
                <Button variant="primary" size="lg" className="me-3">
                  <FaPlay className="me-2" />
                  Watch Our Reel
                </Button>
                <Button variant="outline-primary" size="lg">
                  View Portfolio
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <div className="about-hero-image text-center">
                <img 
                  src={logo} 
                  alt="Nebula Media" 
                  className="hero-logo"
                  width="300"
                  height="125"
                />
                <div className="hero-stats mt-4">
                  <Row>
                    {stats.map((stat, index) => (
                      <Col key={index} sm={6} md={3} className="mb-3">
                        <div className="stat-card">
                          <stat.icon className="stat-icon" />
                          <h4 className="stat-number">{stat.number}</h4>
                          <p className="stat-label">{stat.label}</p>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Services Section */}
        <section className="about-services mb-5">
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className="section-title">What We Do</h2>
              <p className="section-subtitle">
                We offer comprehensive video production services that transform ideas into 
                engaging visual content. Each service is tailored to meet your specific needs.
              </p>
            </Col>
          </Row>
          <Row>
            {services.map((service, index) => (
              <Col key={service.id} lg={4} md={6} className="mb-4">
                <Card 
                  className="service-card border-0 shadow-lg h-100"
                  onClick={() => handleServiceClick(service)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="p-4">
                    <div 
                      className="service-icon"
                      style={{ backgroundColor: `${service.color}20`, color: service.color }}
                    >
                      <service.icon />
                    </div>
                    <h4 className="service-title">{service.title}</h4>
                    <p className="service-description">{service.description}</p>
                    <div className="service-skills">
                      {service.skills.slice(0, 2).map((skill, i) => (
                        <Badge key={i} bg="light" text="dark" className="me-1 mb-1">
                          {skill}
                        </Badge>
                      ))}
                      {service.skills.length > 2 && (
                        <Badge bg="primary" className="me-1 mb-1">
                          +{service.skills.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Values Section */}
        <section className="about-values mb-5">
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className="section-title">Our Values</h2>
              <p className="section-subtitle">
                These core principles guide everything we do and shape our approach to every project.
              </p>
            </Col>
          </Row>
          <Row>
            {values.map((value, index) => (
              <Col key={index} lg={3} md={6} className="mb-4">
                <Card className="value-card border-0 shadow-sm h-100 text-center">
                  <Card.Body className="p-4">
                    <div className="value-icon">
                      <value.icon />
                    </div>
                    <h5 className="value-title">{value.title}</h5>
                    <p className="value-description">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Team Section */}
        <section className="about-team mb-5">
          <Row>
            <Col lg={8} className="mx-auto text-center mb-5">
              <h2 className="section-title">Meet Our Team</h2>
              <p className="section-subtitle">
                Our talented team of creators, technicians, and storytellers work together 
                to bring your vision to life with passion and expertise.
              </p>
            </Col>
          </Row>
          <Row>
            {team.map((member, index) => (
              <Col key={index} lg={4} md={6} className="mb-4">
                <Card className="team-card border-0 shadow-lg">
                  <Card.Body className="p-4 text-center">
                    <div className="team-image-container">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="team-image"
                        width="100"
                        height="100"
                      />
                    </div>
                    <h5 className="team-name">{member.name}</h5>
                    <p className="team-role">{member.role}</p>
                    <p className="team-bio">{member.bio}</p>
                    <div className="team-skills mb-3">
                      {member.skills.map((skill, i) => (
                        <Badge key={i} bg="light" text="dark" className="me-1 mb-1">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="team-social">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="social-link">
                          <FaLinkedin />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="social-link">
                          <FaTwitter />
                        </a>
                      )}
                      {member.social.instagram && (
                        <a href={member.social.instagram} className="social-link">
                          <FaInstagram />
                        </a>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Testimonial Section */}
        <section className="about-testimonial mb-5">
          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="testimonial-card border-0 shadow-lg bg-gradient-primary text-white">
                <Card.Body className="p-5 text-center">
                  <FaQuoteLeft className="quote-icon mb-3" />
                  <blockquote className="testimonial-quote">
                    "Nebula Media transformed our vision into reality. Their attention to detail 
                    and creative expertise exceeded our expectations. The team's professionalism 
                    and dedication to quality make them our go-to video production partner."
                  </blockquote>
                  <div className="testimonial-author">
                    <h5>Jessica Thompson</h5>
                    <p>Marketing Director, TechCorp</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA Section */}
        <section className="about-cta">
          <Card className="cta-card border-0 shadow-lg">
            <Card.Body className="p-5 text-center">
              <h2 className="cta-title mb-3">Ready to Start Your Project?</h2>
              <p className="cta-description mb-4">
                Let's discuss how we can bring your vision to life with our comprehensive 
                video production services. Get in touch for a free consultation.
              </p>
              <div className="cta-buttons">
                <Button variant="primary" size="lg" className="me-3">
                  Get Free Quote
                </Button>
                <Button variant="outline-primary" size="lg">
                  View Our Work
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Service Detail Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          {selectedService && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  <selectedService.icon className="me-2" style={{ color: selectedService.color }} />
                  {selectedService.title}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="p-4">
                <p className="lead mb-4">{selectedService.details}</p>
                <h6 className="mb-3">Technologies & Skills:</h6>
                <div className="mb-4">
                  {selectedService.skills.map((skill, index) => (
                    <Badge key={index} bg="primary" className="me-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="skill-progress">
                  <h6 className="mb-3">Our Expertise Level:</h6>
                  <ProgressBar 
                    now={95} 
                    label="95%" 
                    variant="success" 
                    className="mb-2"
                  />
                  <small className="text-muted">Based on client satisfaction and project success rate</small>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
                <Button variant="primary">
                  Get Quote for This Service
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </div>
  );
}

export default About;