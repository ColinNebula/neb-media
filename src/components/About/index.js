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
  FaDesktop,
  FaReact,
  FaNode,
  FaDocker,
  FaAws,
  FaDatabase,
  FaMobile,
  FaServer,
  FaCloud,
  FaEnvelope
} from 'react-icons/fa';
import logo from '../../assets/images/nebula-dev-logo.svg';

function About() {
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showTechModal, setShowTechModal] = useState(false);

  const services = [
    {
      id: 'web-app',
      title: 'Web App Development',
      icon: FaDesktop,
      description: 'Custom web applications built with modern frameworks and best practices.',
      details: 'We specialize in building scalable, performant web applications using React, Vue, Angular, and Node.js. From single-page applications to complex enterprise systems, we deliver solutions tailored to your business needs.',
      skills: ['React', 'Vue.js', 'Node.js', 'TypeScript'],
      color: '#358ed3'
    },
    {
      id: 'mobile-dev',
      title: 'Mobile Development',
      icon: FaCogs,
      description: 'Native and cross-platform mobile apps for iOS and Android.',
      details: 'Create stunning mobile experiences with React Native, Flutter, or native development. We build apps that are fast, intuitive, and provide seamless user experiences across all devices.',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      color: '#7eb8dc'
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: FaPaintBrush,
      description: 'Beautiful, intuitive interfaces that users love.',
      details: 'Our design team creates user-centered designs that combine aesthetics with functionality. We focus on creating engaging experiences that drive conversions and user satisfaction.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      color: '#5cb85c'
    },
    {
      id: 'api-dev',
      title: 'API Development',
      icon: FaCube,
      description: 'Robust RESTful and GraphQL APIs for seamless integration.',
      details: 'Build powerful backend systems with secure, scalable APIs. We design and implement APIs that are well-documented, easy to integrate, and built to handle growth.',
      skills: ['REST API', 'GraphQL', 'MongoDB', 'PostgreSQL'],
      color: '#f0ad4e'
    },
    {
      id: 'cloud',
      title: 'Cloud Solutions',
      icon: FaMagic,
      description: 'Scalable cloud infrastructure and deployment strategies.',
      details: 'Deploy and manage your applications on AWS, Azure, or Google Cloud. We handle everything from containerization to CI/CD pipelines, ensuring your apps run smoothly at scale.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      color: '#d9534f'
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Solutions',
      icon: FaCode,
      description: 'Complete online store development with payment integration.',
      details: 'Build your online business with custom e-commerce platforms. We integrate payment gateways, inventory management, and create seamless shopping experiences that drive sales.',
      skills: ['Shopify', 'WooCommerce', 'Stripe', 'PayPal'],
      color: '#5bc0de'
    }
  ];

  const team = [
    {
      name: 'Colin Nebula',
      role: 'Founder & Lead Developer',
      bio: 'Full-stack developer with 8+ years of experience building scalable web applications and leading development teams.',
      image: logo,
      skills: ['React', 'Node.js', 'Architecture'],
      social: {
        linkedin: '#',
        twitter: '#',
        instagram: '#'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      bio: 'Passionate about creating beautiful, performant user interfaces with modern JavaScript frameworks and design systems.',
      image: logo,
      skills: ['React', 'Vue.js', 'UI/UX'],
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Mike Rodriguez',
      role: 'Backend Engineer',
      bio: 'Expert in building robust APIs and scalable backend systems with focus on security and performance optimization.',
      image: logo,
      skills: ['Node.js', 'Python', 'DevOps'],
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
      description: 'Our dedication to modern development practices drives us to build exceptional applications.'
    }
  ];

  const technologies = [
    {
      category: 'Frontend',
      icon: FaReact,
      color: '#61DAFB',
      techs: [
        { name: 'React', level: 95, description: 'Building modern, interactive UIs' },
        { name: 'Vue.js', level: 90, description: 'Progressive JavaScript framework' },
        { name: 'TypeScript', level: 92, description: 'Type-safe JavaScript development' },
        { name: 'Next.js', level: 88, description: 'React framework for production' },
        { name: 'Tailwind CSS', level: 90, description: 'Utility-first CSS framework' },
        { name: 'Bootstrap', level: 95, description: 'Responsive design framework' }
      ]
    },
    {
      category: 'Backend',
      icon: FaServer,
      color: '#68A063',
      techs: [
        { name: 'Node.js', level: 93, description: 'JavaScript runtime for servers' },
        { name: 'Express.js', level: 94, description: 'Web application framework' },
        { name: 'Python', level: 85, description: 'Versatile programming language' },
        { name: 'GraphQL', level: 87, description: 'API query language' },
        { name: 'REST API', level: 95, description: 'RESTful web services' },
        { name: 'WebSocket', level: 88, description: 'Real-time communication' }
      ]
    },
    {
      category: 'Database',
      icon: FaDatabase,
      color: '#4DB33D',
      techs: [
        { name: 'MongoDB', level: 92, description: 'NoSQL document database' },
        { name: 'PostgreSQL', level: 90, description: 'Relational database system' },
        { name: 'MySQL', level: 88, description: 'Popular SQL database' },
        { name: 'Redis', level: 85, description: 'In-memory data structure store' },
        { name: 'Firebase', level: 87, description: 'Real-time database platform' }
      ]
    },
    {
      category: 'Mobile',
      icon: FaMobile,
      color: '#3DDC84',
      techs: [
        { name: 'React Native', level: 90, description: 'Cross-platform mobile apps' },
        { name: 'Flutter', level: 85, description: 'UI toolkit for mobile' },
        { name: 'iOS (Swift)', level: 80, description: 'Native iOS development' },
        { name: 'Android (Kotlin)', level: 80, description: 'Native Android development' },
        { name: 'PWA', level: 92, description: 'Progressive web applications' }
      ]
    },
    {
      category: 'DevOps & Cloud',
      icon: FaCloud,
      color: '#FF9900',
      techs: [
        { name: 'AWS', level: 88, description: 'Amazon Web Services' },
        { name: 'Docker', level: 90, description: 'Containerization platform' },
        { name: 'Kubernetes', level: 82, description: 'Container orchestration' },
        { name: 'CI/CD', level: 89, description: 'Continuous integration/deployment' },
        { name: 'GitHub Actions', level: 91, description: 'Automated workflows' },
        { name: 'Nginx', level: 87, description: 'Web server and reverse proxy' }
      ]
    },
    {
      category: 'Tools & Others',
      icon: FaCogs,
      color: '#F05032',
      techs: [
        { name: 'Git', level: 95, description: 'Version control system' },
        { name: 'VS Code', level: 96, description: 'Code editor' },
        { name: 'Figma', level: 88, description: 'Design and prototyping' },
        { name: 'Webpack', level: 85, description: 'Module bundler' },
        { name: 'Jest', level: 90, description: 'JavaScript testing framework' },
        { name: 'Postman', level: 92, description: 'API development tool' }
      ]
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
                Building Your 
                <span className="text-primary"> Digital Future</span>
              </h1>
              <p className="lead mb-4">
                Since our inception, Nebula Dev has been delivering cutting-edge web applications 
                tailored to the unique needs of each client. Our dedicated team combines 
                technical excellence with innovative solutions to create powerful digital platforms.
              </p>
              <div className="hero-buttons">
                <Button variant="primary" size="lg" className="me-3">
                  <FaPlay className="me-2" />
                  View Projects
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => setShowTechModal(true)}>
                  Our Technologies
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
                    "Nebula Dev transformed our business with a powerful web platform. Their technical expertise 
                    and attention to detail exceeded our expectations. The team's professionalism 
                    and dedication to quality make them our go-to development partner."
                  </blockquote>
                  <div className="testimonial-author">
                    <h5>Jessica Thompson</h5>
                    <p>CTO, TechCorp</p>
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
                Let's discuss how we can build your next web application with our comprehensive 
                development services. Get in touch for a free consultation.
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

        {/* Technologies Modal */}
        <Modal 
          show={showTechModal} 
          onHide={() => setShowTechModal(false)} 
          size="xl"
          centered
          className="technologies-modal"
        >
          <Modal.Header 
            closeButton 
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none'
            }}
          >
            <Modal.Title>
              <FaCogs className="me-2" />
              Our Technology Stack
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ 
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: '2rem',
            maxHeight: '70vh',
            overflowY: 'auto'
          }}>
            <div className="text-center mb-4">
              <h4 style={{ color: 'var(--text-primary)' }}>
                Cutting-Edge Tools & Frameworks We Master
              </h4>
              <p className="lead" style={{ color: 'var(--text-muted)' }}>
                We leverage the latest technologies to build robust, scalable, and innovative solutions
              </p>
            </div>

            {technologies.map((category, catIndex) => (
              <div key={catIndex} className="tech-category mb-5">
                <div className="d-flex align-items-center mb-4">
                  <div 
                    className="tech-category-icon me-3"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '12px',
                      background: `${category.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: category.color
                    }}
                  >
                    <category.icon size={30} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {category.category}
                    </h4>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                      {category.techs.length} technologies
                    </p>
                  </div>
                </div>

                <Row>
                  {category.techs.map((tech, techIndex) => (
                    <Col md={6} lg={4} key={techIndex} className="mb-3">
                      <Card 
                        className="tech-card h-100"
                        style={{
                          background: 'var(--bg-surface-alt)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Card.Body className="p-3">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 style={{ color: 'var(--text-primary)', marginBottom: '0' }}>
                              {tech.name}
                            </h6>
                            <Badge 
                              bg={tech.level >= 90 ? 'success' : tech.level >= 80 ? 'primary' : 'warning'}
                              style={{ fontSize: '0.75rem' }}
                            >
                              {tech.level}%
                            </Badge>
                          </div>
                          <p style={{ 
                            color: 'var(--text-muted)', 
                            fontSize: '0.85rem', 
                            marginBottom: '0.75rem' 
                          }}>
                            {tech.description}
                          </p>
                          <ProgressBar 
                            now={tech.level} 
                            variant={tech.level >= 90 ? 'success' : tech.level >= 80 ? 'primary' : 'warning'}
                            style={{ height: '6px' }}
                          />
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}

            <div className="text-center mt-5 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                Ready to Start Your Project?
              </h5>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Let's leverage these technologies to build something amazing together
              </p>
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => {
                  setShowTechModal(false);
                  // You can add navigation to contact page here
                }}
              >
                <FaEnvelope className="me-2" />
                Get in Touch
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default About;