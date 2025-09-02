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
  Form
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
  FaCode
} from 'react-icons/fa';

function Faq() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeKey, setActiveKey] = useState(null);

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
                      <Button variant="outline-primary" size="sm">
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
                      <Button variant="outline-primary" size="sm">
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
                      <Button variant="outline-primary" size="sm">
                        About Us <FaExternalLinkAlt className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
}

export default Faq;