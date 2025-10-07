import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Accordion, 
  Card, 
  Badge, 
  Button,
  InputGroup,
  Form,
  Modal,
  ProgressBar
} from 'react-bootstrap';
import { 
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaMapMarkerAlt,
  FaClock,
  FaCloudUploadAlt,
  FaDownload,
  FaDollarSign,
  FaCreditCard,
  FaHandshake,
  FaUsers,
  FaSearch,
  FaPhone,
  FaEnvelope,
  FaExternalLinkAlt,
  FaVideo,
  FaEdit,
  FaPalette,
  FaCode,
  FaPlay,
  FaRocket,
  FaDesktop,
  FaLightbulb,
  FaCog,
  FaCheckCircle
} from 'react-icons/fa';

function Faq({ setCurrentTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeKey, setActiveKey] = useState(null);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const faqData = [
    {
      id: 'services',
      category: 'Services',
      icon: FaVideo,
      color: '#358ed3',
      questions: [
        {
          id: 'location',
          question: 'Where is Nebula Media located?',
          answer: 'We are located in Vaughan, Ontario, Canada at 55 Main Street. Our studio is equipped with state-of-the-art technology for video production and editing. We also offer remote collaboration for clients worldwide.',
          icon: FaMapMarkerAlt
        },
        {
          id: 'timeline',
          question: 'How long does it take to complete my video project?',
          answer: 'Project timelines vary depending on complexity and scope. Simple editing projects typically take 3-5 business days, while complex productions with 3D animation or extensive post-production can take 2-4 weeks. We provide detailed timelines during our initial consultation.',
          icon: FaClock
        },
        {
          id: 'services-offered',
          question: 'What services does Nebula Media offer?',
          answer: 'We provide comprehensive video production services including: video editing, 3D animation, motion graphics, color correction, audio mixing, visual effects, drone footage, corporate videos, promotional content, and digital marketing solutions.',
          icon: FaEdit
        }
      ]
    },
    {
      id: 'process',
      category: 'Project Process',
      icon: FaCloudUploadAlt,
      color: '#7eb8dc',
      questions: [
        {
          id: 'file-upload',
          question: 'How do I send my videos to Nebula Media?',
          answer: 'We offer multiple secure file transfer methods: Our secure client portal (preferred), Google Drive, Dropbox, WeTransfer, or physical media delivery. For large files over 10GB, we recommend our dedicated upload portal or scheduling a pickup service.',
          icon: FaCloudUploadAlt
        },
        {
          id: 'download',
          question: 'How do I receive my completed video?',
          answer: 'Completed projects are delivered through our secure client portal with download links. We provide multiple formats (MP4, MOV, etc.) and resolutions. You\'ll receive email notifications when your project is ready, and files remain accessible for 30 days.',
          icon: FaDownload
        },
        {
          id: 'revisions',
          question: 'How many revisions are included?',
          answer: 'We include up to 3 rounds of revisions in our standard packages. Additional revisions are available at competitive rates. We work closely with clients during the review process to ensure your vision is perfectly realized.',
          icon: FaPalette
        }
      ]
    },
    {
      id: 'pricing',
      category: 'Pricing & Payment',
      icon: FaDollarSign,
      color: '#5cb85c',
      questions: [
        {
          id: 'pricing',
          question: 'What does Nebula Media charge for video editing?',
          answer: 'Our pricing is project-based and depends on factors like video length, complexity, turnaround time, and specific requirements. Basic editing starts at $500, while complex productions with 3D animation range from $2,000-$10,000+. We provide detailed quotes after consultation.',
          icon: FaDollarSign
        },
        {
          id: 'payment',
          question: 'What payment methods do you accept?',
          answer: 'We accept multiple payment methods: Bank transfers, PayPal, credit cards (Visa, MasterCard, American Express), and cryptocurrency. We typically require 50% upfront for new clients, with the balance due upon completion.',
          icon: FaCreditCard
        },
        {
          id: 'packages',
          question: 'Do you offer package deals or discounts?',
          answer: 'Yes! We offer package deals for multiple videos, ongoing partnerships, and bulk projects. Educational institutions and non-profits receive special pricing. Contact us to discuss custom packages tailored to your needs.',
          icon: FaHandshake
        }
      ]
    },
    {
      id: 'business',
      category: 'Business Inquiries',
      icon: FaUsers,
      color: '#f0ad4e',
      questions: [
        {
          id: 'sponsorship',
          question: 'Do you accept sponsorship or media partnerships?',
          answer: 'Absolutely! We\'re proud community supporters and work with businesses of all sizes. We offer various partnership opportunities including sponsored content, collaborative projects, and media partnerships. Contact us to discuss opportunities.',
          icon: FaHandshake
        },
        {
          id: 'hiring',
          question: 'Are you currently hiring?',
          answer: 'We\'re always looking for talented individuals! While our core team is well-established, we frequently collaborate with freelancers and contractors. Check our careers page or contact us with your portfolio if you\'re interested in joining our network.',
          icon: FaUsers
        },
        {
          id: 'technology',
          question: 'What technology and software do you use?',
          answer: 'We use industry-leading software including Adobe Creative Suite (Premiere Pro, After Effects, Photoshop), DaVinci Resolve, Cinema 4D, Blender for 3D work, and Pro Tools for audio. Our hardware includes 4K cameras, professional lighting, and high-end workstations.',
          icon: FaCode
        }
      ]
    }
  ];

  const filteredFaqs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const handleAccordionToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return(
    <div className="professional-faq">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="faq-hero mb-5">
          <Row className="align-items-center text-center">
            <Col lg={8} className="mx-auto">
              <Badge bg="primary" className="mb-3">
                <FaQuestionCircle className="me-2" />
                Help Center
              </Badge>
              <h1 className="display-4 fw-bold mb-3">
                Frequently Asked 
                <span className="text-primary"> Questions</span>
              </h1>
              <p className="lead mb-4">
                Find answers to common questions about our video production services, 
                processes, and everything you need to know about working with Nebula Media.
              </p>
              
              {/* Search Box */}
              <div className="faq-search-container mb-4">
                <InputGroup size="lg" className="faq-search">
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search for answers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </InputGroup>
              </div>

              {/* Quick Stats */}
              <Row className="faq-stats">
                <Col sm={4} className="mb-3">
                  <div className="stat-item">
                    <h4 className="stat-number">25+</h4>
                    <p className="stat-label">Common Questions</p>
                  </div>
                </Col>
                <Col sm={4} className="mb-3">
                  <div className="stat-item">
                    <h4 className="stat-number">4</h4>
                    <p className="stat-label">Main Categories</p>
                  </div>
                </Col>
                <Col sm={4} className="mb-3">
                  <div className="stat-item">
                    <h4 className="stat-number">24hr</h4>
                    <p className="stat-label">Response Time</p>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        {/* FAQ Categories */}
        <Row className="mb-5">
          {filteredFaqs.map((category, categoryIndex) => (
            <Col lg={6} key={category.id} className="mb-4">
              <Card className="faq-category-card border-0 shadow-lg h-100">
                <Card.Body className="p-4">
                  <div className="category-header mb-4">
                    <div 
                      className="category-icon"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      <category.icon />
                    </div>
                    <h3 className="category-title">{category.category}</h3>
                    <p className="category-subtitle">
                      {category.questions.length} question{category.questions.length !== 1 ? 's' : ''}
                    </p>
                  </div>

                  <Accordion flush>
                    {category.questions.map((faq, index) => (
                      <Accordion.Item 
                        key={faq.id} 
                        eventKey={`${category.id}-${index}`}
                        className="faq-accordion-item"
                      >
                        <Accordion.Header className="faq-question-header">
                          <div className="question-content">
                            <faq.icon className="question-icon me-3" />
                            <span className="question-text">{faq.question}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body className="faq-answer">
                          <p>{faq.answer}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* No Results Message */}
        {searchTerm && filteredFaqs.length === 0 && (
          <Row className="mb-5">
            <Col lg={8} className="mx-auto text-center">
              <Card className="no-results-card border-0 shadow">
                <Card.Body className="p-5">
                  <FaQuestionCircle className="no-results-icon mb-3" />
                  <h4>No results found</h4>
                  <p className="text-muted mb-4">
                    We couldn't find any questions matching "{searchTerm}". 
                    Try different keywords or browse our categories above.
                  </p>
                  <Button 
                    variant="outline-primary" 
                    onClick={() => setSearchTerm('')}
                  >
                    Clear Search
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Contact CTA */}
        <section className="faq-cta">
          <Card className="cta-card border-0 shadow-lg bg-gradient-primary text-white">
            <Card.Body className="p-5 text-center">
              <h2 className="cta-title mb-3">Still Have Questions?</h2>
              <p className="cta-description mb-4">
                Can't find the answer you're looking for? Our team is here to help! 
                Get in touch and we'll provide personalized assistance for your project.
              </p>
              <div className="cta-buttons">
                <Button 
                  variant="light" 
                  size="lg" 
                  href="tel:416.856.5764"
                  className="me-3"
                >
                  <FaPhone className="me-2" />
                  Call Us Now
                </Button>
                <Button 
                  variant="outline-light" 
                  size="lg"
                  href="mailto:nebulamedia3d@gmail.com"
                >
                  <FaEnvelope className="me-2" />
                  Send Email
                </Button>
              </div>
              <div className="mt-4">
                <small className="opacity-75">
                  Average response time: 2-4 hours during business hours
                </small>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Additional Resources */}
        <section className="additional-resources mb-5">
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h3 className="section-title mb-4">Additional Resources</h3>
              <Row>
                <Col md={4} className="mb-3">
                  <Card className="resource-card border-0 shadow-sm h-100">
                    <Card.Body className="p-4 text-center">
                      <FaVideo className="resource-icon mb-3" />
                      <h5>Portfolio</h5>
                      <p className="text-muted">View our latest work and case studies</p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setShowPortfolioModal(true)}
                      >
                        View Portfolio <FaExternalLinkAlt className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3">
                  <Card className="resource-card border-0 shadow-sm h-100">
                    <Card.Body className="p-4 text-center">
                      <FaDollarSign className="resource-icon mb-3" />
                      <h5>Pricing Guide</h5>
                      <p className="text-muted">Get detailed pricing information</p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setShowPricingModal(true)}
                      >
                        View Pricing <FaExternalLinkAlt className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4} className="mb-3">
                  <Card className="resource-card border-0 shadow-sm h-100">
                    <Card.Body className="p-4 text-center">
                      <FaUsers className="resource-icon mb-3" />
                      <h5>About Us</h5>
                      <p className="text-muted">Learn more about our team and mission</p>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setShowAboutModal(true)}
                      >
                        About Us <FaExternalLinkAlt className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        {/* Portfolio Modal */}
        <Modal 
          show={showPortfolioModal} 
          onHide={() => setShowPortfolioModal(false)}
          size="xl"
          centered
          className="portfolio-modal"
        >
          <Modal.Header closeButton style={{ 
            background: 'var(--primary-gradient)',
            color: 'white',
            border: 'none'
          }}>
            <Modal.Title>
              <FaVideo className="me-2" />
              Our Portfolio
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ 
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: '2rem'
          }}>
            <div className="text-center mb-4">
              <h3 style={{ color: 'var(--text-primary)' }}>Featured Projects</h3>
              <p className="lead" style={{ color: 'var(--text-muted)' }}>
                Explore our latest video production work and creative solutions
              </p>
            </div>

            <Row className="g-4">
              <Col md={6}>
                <Card style={{
                  background: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{
                    background: 'var(--primary-gradient)',
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <FaVideo size={48} color="white" />
                  </div>
                  <Card.Body>
                    <h5 style={{ color: 'var(--text-primary)' }}>Corporate Video Production</h5>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Professional corporate videos with 3D animation, motion graphics, and high-end post-production.
                    </p>
                    <Badge bg="primary" className="me-2">Video Editing</Badge>
                    <Badge bg="secondary" className="me-2">3D Animation</Badge>
                    <Badge bg="success">Motion Graphics</Badge>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card style={{
                  background: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{
                    background: 'var(--secondary-gradient)',
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <FaPalette size={48} color="white" />
                  </div>
                  <Card.Body>
                    <h5 style={{ color: 'var(--text-primary)' }}>Creative Content</h5>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Engaging social media content, promotional videos, and branded multimedia experiences.
                    </p>
                    <Badge bg="primary" className="me-2">Social Media</Badge>
                    <Badge bg="secondary" className="me-2">Branding</Badge>
                    <Badge bg="success">Color Grading</Badge>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card style={{
                  background: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{
                    background: 'var(--accent-gradient)',
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <FaPlay size={48} color="white" />
                  </div>
                  <Card.Body>
                    <h5 style={{ color: 'var(--text-primary)' }}>Event Coverage</h5>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Complete event video production with multi-camera setups and live streaming capabilities.
                    </p>
                    <Badge bg="primary" className="me-2">Multi-Camera</Badge>
                    <Badge bg="secondary" className="me-2">Live Streaming</Badge>
                    <Badge bg="success">Drone Footage</Badge>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6}>
                <Card style={{
                  background: 'var(--bg-surface-alt)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)'
                }}>
                  <div style={{
                    background: 'var(--dark-gradient)',
                    padding: '2rem',
                    textAlign: 'center'
                  }}>
                    <FaRocket size={48} color="white" />
                  </div>
                  <Card.Body>
                    <h5 style={{ color: 'var(--text-primary)' }}>Product Launches</h5>
                    <p style={{ color: 'var(--text-muted)' }}>
                      Dynamic product showcase videos with cinematic visuals and compelling storytelling.
                    </p>
                    <Badge bg="primary" className="me-2">Product Videos</Badge>
                    <Badge bg="secondary" className="me-2">VFX</Badge>
                    <Badge bg="success">Audio Design</Badge>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <p style={{ color: 'var(--text-muted)' }}>
                Want to see more? Visit our video player to explore our full portfolio
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowPortfolioModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Pricing Modal */}
        <Modal 
          show={showPricingModal} 
          onHide={() => setShowPricingModal(false)}
          size="lg"
          centered
          className="pricing-modal"
        >
          <Modal.Header closeButton style={{ 
            background: 'var(--secondary-gradient)',
            color: 'white',
            border: 'none'
          }}>
            <Modal.Title>
              <FaDollarSign className="me-2" />
              Pricing Guide
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ 
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: '2rem'
          }}>
            <div className="text-center mb-4">
              <h3 style={{ color: 'var(--text-primary)' }}>Our Pricing Structure</h3>
              <p className="lead" style={{ color: 'var(--text-muted)' }}>
                Transparent and competitive pricing for video production and development services
              </p>
            </div>

            {/* Video Production Pricing */}
            <div className="mb-4">
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                <FaVideo className="me-2" />
                Video Production Services
              </h5>
              <Row className="g-4">
                <Col md={6}>
                  <Card style={{
                    background: 'var(--bg-surface-alt)',
                    border: '2px solid var(--primary-color)',
                    borderRadius: 'var(--radius-lg)',
                    height: '100%'
                  }}>
                    <Card.Body className="text-center p-4">
                      <FaEdit size={40} style={{ color: 'var(--primary-color)' }} className="mb-3" />
                      <h4 style={{ color: 'var(--text-primary)' }}>Basic Editing</h4>
                      <h2 style={{ color: 'var(--primary-color)', margin: '1rem 0' }}>$500+</h2>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        color: 'var(--text-muted)',
                        textAlign: 'left'
                      }}>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--primary-color)' }} />Up to 5 minutes</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--primary-color)' }} />Color correction</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--primary-color)' }} />Basic transitions</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--primary-color)' }} />Audio mixing</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--primary-color)' }} />3-5 day turnaround</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card style={{
                    background: 'var(--bg-surface-alt)',
                    border: '2px solid var(--secondary-color)',
                    borderRadius: 'var(--radius-lg)',
                    height: '100%'
                  }}>
                    <Card.Body className="text-center p-4">
                      <FaPalette size={40} style={{ color: 'var(--secondary-color)' }} className="mb-3" />
                      <h4 style={{ color: 'var(--text-primary)' }}>Advanced Production</h4>
                      <h2 style={{ color: 'var(--secondary-color)', margin: '1rem 0' }}>$1,500+</h2>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        color: 'var(--text-muted)',
                        textAlign: 'left'
                      }}>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--secondary-color)' }} />Up to 15 minutes</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--secondary-color)' }} />Motion graphics</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--secondary-color)' }} />Visual effects</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--secondary-color)' }} />Sound design</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: 'var(--secondary-color)' }} />1-2 week turnaround</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={12}>
                  <Card style={{
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white'
                  }}>
                    <Card.Body className="text-center p-4">
                      <FaRocket size={40} className="mb-3" />
                      <h4>Premium Video Package</h4>
                      <h2 style={{ margin: '1rem 0' }}>$2,000 - $10,000+</h2>
                      <p className="mb-3">
                        Complete video production with 3D animation, complex VFX, multi-camera setups, 
                        drone footage, and comprehensive post-production services.
                      </p>
                      <Row>
                        <Col sm={6} className="mb-2">
                          <small><FaCheckCircle className="me-2" />Unlimited length</small>
                        </Col>
                        <Col sm={6} className="mb-2">
                          <small><FaCheckCircle className="me-2" />3D animation</small>
                        </Col>
                        <Col sm={6} className="mb-2">
                          <small><FaCheckCircle className="me-2" />Advanced VFX</small>
                        </Col>
                        <Col sm={6} className="mb-2">
                          <small><FaCheckCircle className="me-2" />Custom timeline</small>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            {/* Web & Mobile Development Pricing */}
            <div className="mb-4">
              <h5 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
                <FaDesktop className="me-2" />
                Web & Mobile Development Services
              </h5>
              <Row className="g-4">
                <Col md={4}>
                  <Card style={{
                    background: 'var(--bg-surface-alt)',
                    border: '2px solid #5cb85c',
                    borderRadius: 'var(--radius-lg)',
                    height: '100%'
                  }}>
                    <Card.Body className="text-center p-4">
                      <FaCode size={40} style={{ color: '#5cb85c' }} className="mb-3" />
                      <h4 style={{ color: 'var(--text-primary)' }}>Web Pages</h4>
                      <h2 style={{ color: '#5cb85c', margin: '1rem 0' }}>$1,000+</h2>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        color: 'var(--text-muted)',
                        textAlign: 'left',
                        fontSize: '0.9rem'
                      }}>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#5cb85c' }} />Landing pages</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#5cb85c' }} />Responsive design</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#5cb85c' }} />SEO optimized</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#5cb85c' }} />Contact forms</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#5cb85c' }} />1-2 week delivery</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card style={{
                    background: 'var(--bg-surface-alt)',
                    border: '2px solid #f0ad4e',
                    borderRadius: 'var(--radius-lg)',
                    height: '100%'
                  }}>
                    <Card.Body className="text-center p-4">
                      <FaDesktop size={40} style={{ color: '#f0ad4e' }} className="mb-3" />
                      <h4 style={{ color: 'var(--text-primary)' }}>Web Applications</h4>
                      <h2 style={{ color: '#f0ad4e', margin: '1rem 0' }}>$5,000+</h2>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        color: 'var(--text-muted)',
                        textAlign: 'left',
                        fontSize: '0.9rem'
                      }}>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#f0ad4e' }} />Custom features</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#f0ad4e' }} />React/Vue/Angular</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#f0ad4e' }} />Database integration</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#f0ad4e' }} />User authentication</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#f0ad4e' }} />4-8 week delivery</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card style={{
                    background: 'var(--bg-surface-alt)',
                    border: '2px solid #d9534f',
                    borderRadius: 'var(--radius-lg)',
                    height: '100%'
                  }}>
                    <Card.Body className="text-center p-4">
                      <FaRocket size={40} style={{ color: '#d9534f' }} className="mb-3" />
                      <h4 style={{ color: 'var(--text-primary)' }}>Mobile Apps</h4>
                      <h2 style={{ color: '#d9534f', margin: '1rem 0' }}>$8,000+</h2>
                      <ul style={{ 
                        listStyle: 'none', 
                        padding: 0,
                        color: 'var(--text-muted)',
                        textAlign: 'left',
                        fontSize: '0.9rem'
                      }}>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#d9534f' }} />iOS & Android</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#d9534f' }} />React Native/Flutter</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#d9534f' }} />API integration</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#d9534f' }} />Push notifications</li>
                        <li className="mb-2"><FaCheckCircle className="me-2" style={{ color: '#d9534f' }} />8-12 week delivery</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>

            <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
              <p style={{ color: 'var(--text-muted)' }}>
                <strong>Note:</strong> Final pricing depends on project complexity, length, and specific requirements. 
                Contact us for a detailed quote tailored to your needs.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowPricingModal(false)}>
              Close
            </Button>
            <Button 
              variant="primary"
              onClick={() => {
                setShowPricingModal(false);
                if (setCurrentTab) {
                  setCurrentTab('contact');
                }
              }}
            >
              Request Custom Quote
            </Button>
          </Modal.Footer>
        </Modal>

        {/* About Us Modal */}
        <Modal 
          show={showAboutModal} 
          onHide={() => setShowAboutModal(false)}
          size="lg"
          centered
          className="about-modal"
        >
          <Modal.Header closeButton style={{ 
            background: 'var(--accent-gradient)',
            color: 'white',
            border: 'none'
          }}>
            <Modal.Title>
              <FaUsers className="me-2" />
              About Nebula Media
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ 
            background: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            padding: '2rem'
          }}>
            <div className="text-center mb-4">
              <h3 style={{ color: 'var(--text-primary)' }}>Who We Are</h3>
              <p className="lead" style={{ color: 'var(--text-muted)' }}>
                Your trusted partner in professional video production and creative media solutions
              </p>
            </div>

            <div className="mb-4">
              <h5 style={{ color: 'var(--text-primary)' }}>Our Mission</h5>
              <p style={{ color: 'var(--text-muted)' }}>
                At Nebula Media, we're passionate about transforming ideas into captivating visual stories. 
                Based in Vaughan, Ontario, we combine cutting-edge technology with creative excellence to 
                deliver video production services that exceed expectations.
              </p>
            </div>

            <div className="mb-4">
              <h5 style={{ color: 'var(--text-primary)' }}>What We Do</h5>
              <Row>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <FaVideo size={24} style={{ color: 'var(--primary-color)' }} className="me-3 mt-1" />
                    <div>
                      <h6 style={{ color: 'var(--text-primary)' }}>Video Editing</h6>
                      <small style={{ color: 'var(--text-muted)' }}>
                        Professional editing with advanced color grading and effects
                      </small>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <FaDesktop size={24} style={{ color: 'var(--secondary-color)' }} className="me-3 mt-1" />
                    <div>
                      <h6 style={{ color: 'var(--text-primary)' }}>3D Animation</h6>
                      <small style={{ color: 'var(--text-muted)' }}>
                        Stunning 3D animations and motion graphics
                      </small>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <FaLightbulb size={24} style={{ color: 'var(--accent-color)' }} className="me-3 mt-1" />
                    <div>
                      <h6 style={{ color: 'var(--text-primary)' }}>Creative Services</h6>
                      <small style={{ color: 'var(--text-muted)' }}>
                        Concept development and creative direction
                      </small>
                    </div>
                  </div>
                </Col>
                <Col md={6} className="mb-3">
                  <div className="d-flex align-items-start">
                    <FaCog size={24} style={{ color: '#5cb85c' }} className="me-3 mt-1" />
                    <div>
                      <h6 style={{ color: 'var(--text-primary)' }}>Post-Production</h6>
                      <small style={{ color: 'var(--text-muted)' }}>
                        Complete post-production and finishing services
                      </small>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-4">
              <h5 style={{ color: 'var(--text-primary)' }}>Our Stats</h5>
              <Row className="text-center">
                <Col xs={4}>
                  <h3 style={{ color: 'var(--primary-color)' }}>150+</h3>
                  <small style={{ color: 'var(--text-muted)' }}>Projects Completed</small>
                </Col>
                <Col xs={4}>
                  <h3 style={{ color: 'var(--primary-color)' }}>75+</h3>
                  <small style={{ color: 'var(--text-muted)' }}>Happy Clients</small>
                </Col>
                <Col xs={4}>
                  <h3 style={{ color: 'var(--primary-color)' }}>10+</h3>
                  <small style={{ color: 'var(--text-muted)' }}>Years Experience</small>
                </Col>
              </Row>
            </div>

            <div className="text-center p-3" style={{ 
              background: 'var(--bg-surface-alt)',
              borderRadius: 'var(--radius-lg)'
            }}>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <strong>Ready to work together?</strong>
              </p>
              <div>
                <a href="tel:416.856.5764" style={{ color: 'var(--primary-color)', textDecoration: 'none', marginRight: '1.5rem' }}>
                  <FaPhone className="me-2" />
                  (416) 856-5764
                </a>
                <a href="mailto:nebulamedia3d@gmail.com" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
                  <FaEnvelope className="me-2" />
                  nebulamedia3d@gmail.com
                </a>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => setShowAboutModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default Faq;