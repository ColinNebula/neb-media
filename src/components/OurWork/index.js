import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Badge, 
  Button,
  Modal,
  Tabs,
  Tab,
  InputGroup,
  Form
} from 'react-bootstrap';
import { 
  FaDesktop,
  FaMobile,
  FaCube,
  FaVideo,
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
  FaCode,
  FaRocket,
  FaLightbulb,
  FaCog,
  FaShoppingCart,
  FaGamepad,
  FaCamera,
  FaShieldAlt,
  FaSearch,
  FaFilter,
  FaStar,
  FaEye,
  FaHeart,
  FaShareAlt
} from 'react-icons/fa';

function OurWork({ setCurrentTab }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    // Nebula Apps - Real Projects
    {
      id: 1,
      title: 'Nebula Screen Capture',
      category: 'web-app',
      type: 'Progressive Web App',
      description: 'A state-of-the-art Progressive Web App (PWA) designed to deliver professional-grade screen recording capabilities directly in your browser. Built with modern web technologies, it offers a native app-like experience with the convenience of web accessibility.',
      image: null,
      technologies: ['React', 'PWA', 'WebRTC', 'IndexedDB', 'Service Workers'],
      features: [
        'Browser-based screen recording',
        'Professional-grade quality',
        'Offline functionality',
        'Native app-like experience',
        'No installation required'
      ],
      stats: {
        views: '45K+',
        users: '12K+',
        rating: '4.9'
      },
      gradient: 'var(--primary-gradient)',
      color: '#667eea',
      videoUrl: null,
      liveDemo: 'https://colinnebula.github.io/nebula-screen-capture/',
      github: 'https://github.com/ColinNebula/nebula-screen-capture'
    },
    {
      id: 2,
      title: 'Nebula VPN Client',
      category: 'web-app',
      type: 'Web Application',
      description: 'A modern, feature-rich VPN application designed to provide users with secure, private, and fast internet connections. Built with cutting-edge web technologies, it offers an intuitive interface combined with powerful functionality for both casual users and power users.',
      image: null,
      technologies: ['React', 'WebSockets', 'Encryption', 'Node.js', 'Material-UI'],
      features: [
        'Secure & private connections',
        'Fast internet speeds',
        'Intuitive interface',
        'Power user features',
        'Global server network'
      ],
      stats: {
        views: '38K+',
        users: '9K+',
        rating: '4.8'
      },
      gradient: 'var(--secondary-gradient)',
      color: '#f093fb',
      videoUrl: null,
      liveDemo: 'https://colinnebula.github.io/nebula-vpn-client/',
      github: 'https://github.com/ColinNebula/nebula-vpn-client'
    },
    {
      id: 3,
      title: 'Nebula Media Converter',
      category: 'web-app',
      type: 'Web Application',
      description: 'A cutting-edge, browser-based media conversion platform that brings professional-grade file processing directly to your web browser. Built with modern React technology and powered by FFmpeg.wasm for lightning-fast, client-side media processing. Transforming media files with the power of the cosmos.',
      image: null,
      technologies: ['React', 'FFmpeg.wasm', 'WebAssembly', 'IndexedDB', 'Web Workers'],
      features: [
        'Browser-based conversion',
        'Professional-grade processing',
        'Client-side processing',
        'Multiple format support',
        'Lightning-fast performance'
      ],
      stats: {
        views: '52K+',
        users: '15K+',
        rating: '4.9'
      },
      gradient: 'var(--accent-gradient)',
      color: '#f6d365',
      videoUrl: null,
      liveDemo: 'https://colinnebula.github.io/nebula-media-converter/',
      github: 'https://github.com/ColinNebula/nebula-media-converter'
    },
    {
      id: 4,
      title: 'Quibish',
      category: 'web-app',
      type: 'Communication Platform',
      description: 'A revolutionary communication platform that combines modern web technologies with innovative features to deliver an unparalleled messaging and calling experience. Built with React 19.1.1 and powered by cutting-edge services, Quibish offers enterprise-grade security, global connectivity, and intuitive user interaction.',
      image: null,
      technologies: ['React 19.1.1', 'WebRTC', 'Socket.io', 'Firebase', 'Encryption'],
      features: [
        'Messaging & calling',
        'Enterprise-grade security',
        'Global connectivity',
        'Intuitive UI/UX',
        'Real-time communication'
      ],
      stats: {
        views: '62K+',
        users: '18K+',
        rating: '5.0'
      },
      gradient: 'var(--dark-gradient)',
      color: '#5cb85c',
      videoUrl: null,
      liveDemo: 'https://colinnebula.github.io/quibish/',
      github: 'https://github.com/ColinNebula/quibish'
    },
    // Additional Web Applications
    {
      id: 5,
      title: 'E-Commerce Platform',
      category: 'web-app',
      type: 'Web Application',
      description: 'A comprehensive e-commerce platform built with React and Node.js, featuring real-time inventory management, secure payments, and advanced analytics.',
      image: null,
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
      features: [
        'Real-time inventory tracking',
        'Secure payment processing',
        'Advanced analytics dashboard',
        'Multi-vendor support',
        'Mobile-responsive design'
      ],
      stats: {
        views: '25K+',
        users: '5K+',
        rating: '4.8'
      },
      gradient: 'var(--primary-gradient)',
      color: '#667eea',
      videoUrl: 'https://www.youtube.com/embed/N2WhwHaicR4',
      liveDemo: '#',
      github: '#'
    },
    // Mobile Applications
    {
      id: 6,
      title: 'Fitness Tracker App',
      category: 'mobile-app',
      type: 'Mobile Application',
      description: 'Cross-platform fitness tracking app with workout plans, nutrition tracking, progress analytics, and social features.',
      image: null,
      technologies: ['React Native', 'Firebase', 'Redux', 'HealthKit', 'Google Fit'],
      features: [
        'Workout tracking',
        'Nutrition logging',
        'Progress analytics',
        'Social challenges',
        'Wearable integration'
      ],
      stats: {
        views: '45K+',
        users: '12K+',
        rating: '4.8'
      },
      gradient: 'var(--dark-gradient)',
      color: '#5cb85c',
      videoUrl: null,
      liveDemo: '#',
      github: '#'
    },
    {
      id: 7,
      title: 'Food Delivery App',
      category: 'mobile-app',
      type: 'Mobile Application',
      description: 'On-demand food delivery platform with real-time order tracking, multiple payment options, and restaurant management system.',
      image: null,
      technologies: ['Flutter', 'Node.js', 'PostgreSQL', 'Google Maps', 'Socket.io'],
      features: [
        'Real-time tracking',
        'Multiple payment methods',
        'Restaurant dashboard',
        'Order history',
        'Push notifications'
      ],
      stats: {
        views: '38K+',
        users: '9K+',
        rating: '4.6'
      },
      gradient: 'var(--primary-gradient)',
      color: '#f0ad4e',
      videoUrl: null,
      liveDemo: '#',
      github: '#'
    },
    // 3D Projects
    {
      id: 8,
      title: 'Sci-Fi Rider Character',
      category: '3d-project',
      type: '3D Animation',
      description: 'High-quality 3D character model with detailed texturing, rigging, and animation for sci-fi game environments.',
      image: null,
      technologies: ['Blender', 'Substance Painter', 'Maya', 'ZBrush', 'Unity'],
      features: [
        'Detailed character modeling',
        'Advanced rigging system',
        'PBR texturing',
        'Motion capture ready',
        'Game-engine optimized'
      ],
      stats: {
        views: '52K+',
        users: '15K+',
        rating: '4.9'
      },
      gradient: 'var(--secondary-gradient)',
      color: '#358ed3',
      videoUrl: null,
      liveDemo: '#',
      github: null
    },
    {
      id: 9,
      title: 'Byte Character Animation',
      category: '3d-project',
      type: '3D Animation',
      description: 'Stylized character animation with expressive movements, perfect for mobile games and interactive experiences.',
      image: null,
      technologies: ['Cinema 4D', 'After Effects', 'Redshift', 'Marvelous Designer'],
      features: [
        'Stylized character design',
        'Expressive animations',
        'Cloth simulation',
        'Optimized topology',
        'Multiple LOD levels'
      ],
      stats: {
        views: '41K+',
        users: '11K+',
        rating: '4.8'
      },
      gradient: 'var(--accent-gradient)',
      color: '#7eb8dc',
      videoUrl: null,
      liveDemo: '#',
      github: null
    },
    {
      id: 10,
      title: 'Architectural Visualization',
      category: '3d-project',
      type: '3D Visualization',
      description: 'Photorealistic architectural renders for residential and commercial projects with detailed interior and exterior scenes.',
      image: null,
      technologies: ['3ds Max', 'V-Ray', 'Corona', 'Photoshop', 'AutoCAD'],
      features: [
        'Photorealistic rendering',
        'Interior & exterior scenes',
        'Lighting simulation',
        'Material library',
        '360° panoramas'
      ],
      stats: {
        views: '28K+',
        users: '6K+',
        rating: '5.0'
      },
      gradient: 'var(--dark-gradient)',
      color: '#d9534f',
      videoUrl: null,
      liveDemo: '#',
      github: null
    },
    {
      id: 11,
      title: 'Product Visualization',
      category: '3d-project',
      type: '3D Visualization',
      description: 'High-end product visualization for marketing and e-commerce, featuring interactive 360° views and configurators.',
      image: null,
      technologies: ['Blender', 'Keyshot', 'Substance Designer', 'Three.js'],
      features: [
        '360° product views',
        'Interactive configurator',
        'PBR materials',
        'AR-ready models',
        'Web integration'
      ],
      stats: {
        views: '35K+',
        users: '8K+',
        rating: '4.9'
      },
      gradient: 'var(--primary-gradient)',
      color: '#667eea',
      videoUrl: null,
      liveDemo: '#',
      github: null
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: FaRocket, count: projects.length },
    { id: 'web-app', label: 'Web Apps', icon: FaDesktop, count: projects.filter(p => p.category === 'web-app').length },
    { id: 'mobile-app', label: 'Mobile Apps', icon: FaMobile, count: projects.filter(p => p.category === 'mobile-app').length },
    { id: '3d-project', label: '3D Projects', icon: FaCube, count: projects.filter(p => p.category === '3d-project').length }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  return (
    <div className="our-work-page">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="work-hero mb-5">
          <Row className="align-items-center text-center">
            <Col lg={8} className="mx-auto">
              <Badge bg="primary" className="mb-3 px-3 py-2">
                <FaRocket className="me-2" />
                Portfolio
              </Badge>
              <h1 className="display-4 fw-bold mb-3">
                Our Creative 
                <span className="text-gradient"> Work</span>
              </h1>
              <p className="lead mb-4" style={{ color: 'var(--text-muted)' }}>
                Explore our portfolio of web applications, mobile apps, and stunning 3D projects. 
                Each project represents our commitment to excellence and innovation.
              </p>

              {/* Search Bar */}
              <div className="search-container mb-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <InputGroup size="lg">
                  <InputGroup.Text style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-muted)'
                  }}>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search projects, technologies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </InputGroup>
              </div>

              {/* Stats */}
              <Row className="justify-content-center">
                <Col xs={6} sm={3} className="mb-3">
                  <h3 style={{ color: 'var(--primary-color)' }}>{projects.length}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Projects</p>
                </Col>
                <Col xs={6} sm={3} className="mb-3">
                  <h3 style={{ color: 'var(--primary-color)' }}>450K+</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Total Views</p>
                </Col>
                <Col xs={6} sm={3} className="mb-3">
                  <h3 style={{ color: 'var(--primary-color)' }}>100K+</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Users</p>
                </Col>
                <Col xs={6} sm={3} className="mb-3">
                  <h3 style={{ color: 'var(--primary-color)' }}>4.8</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Avg Rating</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        {/* Category Filter */}
        <section className="category-filter mb-5">
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? 'primary' : 'outline-primary'}
                    size="lg"
                    onClick={() => setActiveCategory(category.id)}
                    className="category-btn"
                    style={{
                      borderRadius: '50px',
                      padding: '0.75rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <category.icon />
                    {category.label}
                    <Badge 
                      bg={activeCategory === category.id ? 'light' : 'primary'}
                      text={activeCategory === category.id ? 'primary' : 'light'}
                      className="ms-2"
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </section>

        {/* Projects Grid */}
        <section className="projects-grid mb-5">
          <Row>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <Col lg={4} md={6} key={project.id} className="mb-4">
                  <Card 
                    className="project-card h-100 border-0 shadow-lg"
                    style={{
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onClick={() => handleProjectClick(project)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    {/* Project Header with Gradient */}
                    <div style={{
                      background: project.gradient,
                      padding: '3rem 2rem',
                      textAlign: 'center',
                      position: 'relative'
                    }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto'
                      }}>
                        {project.category === 'web-app' && <FaDesktop size={40} color="white" />}
                        {project.category === 'mobile-app' && <FaMobile size={40} color="white" />}
                        {project.category === '3d-project' && <FaCube size={40} color="white" />}
                      </div>
                      <Badge 
                        bg="light" 
                        text="dark"
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          fontSize: '0.7rem'
                        }}
                      >
                        {project.type}
                      </Badge>
                    </div>

                    <Card.Body className="p-4">
                      <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                        {project.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: '0.9rem',
                        marginBottom: '1rem',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-3">
                        {project.technologies.slice(0, 3).map((tech, idx) => (
                          <Badge 
                            key={idx} 
                            bg="secondary" 
                            className="me-2 mb-2"
                            style={{ fontSize: '0.75rem' }}
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge 
                            bg="secondary" 
                            className="mb-2"
                            style={{ fontSize: '0.75rem' }}
                          >
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="d-flex justify-content-between align-items-center pt-3" style={{
                        borderTop: '1px solid var(--border-color)'
                      }}>
                        <div className="d-flex align-items-center gap-3">
                          <small style={{ color: 'var(--text-muted)' }}>
                            <FaEye className="me-1" /> {project.stats.views}
                          </small>
                          <small style={{ color: 'var(--text-muted)' }}>
                            <FaStar className="me-1" style={{ color: '#f0ad4e' }} /> {project.stats.rating}
                          </small>
                        </div>
                        <Button 
                          variant="link" 
                          size="sm"
                          style={{ color: project.color, textDecoration: 'none' }}
                        >
                          View Details <FaExternalLinkAlt className="ms-1" />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col lg={12}>
                <Card className="text-center p-5 border-0" style={{ background: 'var(--bg-surface)' }}>
                  <Card.Body>
                    <FaSearch size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h4 style={{ color: 'var(--text-primary)' }}>No projects found</h4>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Try adjusting your search or filter criteria
                    </p>
                    <Button 
                      variant="outline-primary"
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </section>

        {/* Call to Action */}
        <section className="work-cta mb-5">
          <Card className="border-0 shadow-lg" style={{
            background: 'var(--primary-gradient)',
            color: 'white',
            borderRadius: 'var(--radius-lg)'
          }}>
            <Card.Body className="p-5 text-center">
              <h2 className="mb-3">Have a Project in Mind?</h2>
              <p className="lead mb-4">
                Let's collaborate and bring your ideas to life with cutting-edge technology and creative excellence
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button 
                  variant="light" 
                  size="lg"
                  onClick={() => setCurrentTab && setCurrentTab('contact')}
                >
                  <FaRocket className="me-2" />
                  Start a Project
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  onClick={() => setCurrentTab && setCurrentTab('video-player')}
                >
                  <FaPlay className="me-2" />
                  Watch Demo Reel
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>

      {/* Project Detail Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="xl"
        centered
        className="project-detail-modal"
      >
        {selectedProject && (
          <>
            <Modal.Header 
              closeButton 
              style={{ 
                background: selectedProject.gradient,
                color: 'white',
                border: 'none'
              }}
            >
              <Modal.Title className="d-flex align-items-center">
                {selectedProject.category === 'web-app' && <FaDesktop className="me-2" />}
                {selectedProject.category === 'mobile-app' && <FaMobile className="me-2" />}
                {selectedProject.category === '3d-project' && <FaCube className="me-2" />}
                {selectedProject.title}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ 
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              padding: '2rem'
            }}>
              <Tabs defaultActiveKey="overview" className="mb-4">
                <Tab eventKey="overview" title="Overview">
                  <div className="mb-4">
                    <h5 style={{ color: 'var(--text-primary)' }}>About This Project</h5>
                    <p style={{ color: 'var(--text-muted)' }}>{selectedProject.description}</p>
                  </div>

                  <Row>
                    <Col md={6} className="mb-4">
                      <h6 style={{ color: 'var(--text-primary)' }}>Key Features</h6>
                      <ul style={{ color: 'var(--text-muted)' }}>
                        {selectedProject.features.map((feature, idx) => (
                          <li key={idx} className="mb-2">{feature}</li>
                        ))}
                      </ul>
                    </Col>
                    <Col md={6} className="mb-4">
                      <h6 style={{ color: 'var(--text-primary)' }}>Technologies Used</h6>
                      <div className="d-flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <Badge key={idx} bg="primary" className="px-3 py-2">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </Col>
                  </Row>

                  <div className="stats-row" style={{
                    background: 'var(--bg-surface-alt)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    marginTop: '2rem'
                  }}>
                    <Row className="text-center">
                      <Col xs={4}>
                        <h4 style={{ color: selectedProject.color }}>{selectedProject.stats.views}</h4>
                        <small style={{ color: 'var(--text-muted)' }}>Total Views</small>
                      </Col>
                      <Col xs={4}>
                        <h4 style={{ color: selectedProject.color }}>{selectedProject.stats.users}</h4>
                        <small style={{ color: 'var(--text-muted)' }}>Active Users</small>
                      </Col>
                      <Col xs={4}>
                        <h4 style={{ color: selectedProject.color }}>{selectedProject.stats.rating} <FaStar size={20} color="#f0ad4e" /></h4>
                        <small style={{ color: 'var(--text-muted)' }}>Rating</small>
                      </Col>
                    </Row>
                  </div>
                </Tab>

                {selectedProject.videoUrl && (
                  <Tab eventKey="demo" title="Demo">
                    <div className="video-container mb-3">
                      <iframe 
                        width="100%" 
                        height="500" 
                        src={selectedProject.videoUrl} 
                        title={selectedProject.title}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                  </Tab>
                )}

                <Tab eventKey="details" title="Technical Details">
                  <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    Project Specifications
                  </h5>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Card style={{ 
                        background: 'var(--bg-surface-alt)',
                        border: '1px solid var(--border-color)'
                      }}>
                        <Card.Body>
                          <h6 style={{ color: 'var(--text-primary)' }}>
                            <FaCode className="me-2" />
                            Development Stack
                          </h6>
                          <div className="mt-3">
                            {selectedProject.technologies.map((tech, idx) => (
                              <div key={idx} className="mb-2">
                                <Badge bg="secondary" className="me-2">{tech}</Badge>
                              </div>
                            ))}
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Card style={{ 
                        background: 'var(--bg-surface-alt)',
                        border: '1px solid var(--border-color)'
                      }}>
                        <Card.Body>
                          <h6 style={{ color: 'var(--text-primary)' }}>
                            <FaRocket className="me-2" />
                            Key Features
                          </h6>
                          <ul style={{ color: 'var(--text-muted)', marginTop: '1rem', paddingLeft: '1.25rem' }}>
                            {selectedProject.features.map((feature, idx) => (
                              <li key={idx} className="mb-1">{feature}</li>
                            ))}
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer style={{ background: 'var(--bg-surface)' }}>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              {selectedProject.liveDemo && (
                <Button 
                  variant="primary"
                  onClick={() => window.open(selectedProject.liveDemo, '_blank')}
                >
                  <FaExternalLinkAlt className="me-2" />
                  View Live Demo
                </Button>
              )}
              {selectedProject.github && (
                <Button 
                  variant="dark"
                  onClick={() => window.open(selectedProject.github, '_blank')}
                >
                  <FaGithub className="me-2" />
                  View on GitHub
                </Button>
              )}
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default OurWork;
