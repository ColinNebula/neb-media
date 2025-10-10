import React from 'react';
import { Container, Row, Col, Card, Accordion } from 'react-bootstrap';
import { 
  FaShieldAlt, 
  FaLock, 
  FaUserSecret, 
  FaCookie,
  FaDatabase,
  FaEnvelope,
  FaGlobe,
  FaUserCheck,
  FaExclamationTriangle,
  FaFileContract,
  FaCalendarAlt,
  FaInfoCircle
} from 'react-icons/fa';

function PrivacyPolicy() {
  const lastUpdated = "October 4, 2025";

  const sections = [
    {
      id: "information-collection",
      icon: FaDatabase,
      title: "Information We Collect",
      color: "#667eea",
      content: [
        {
          subtitle: "Personal Information",
          text: "When you use our services or contact us, we may collect personal information including but not limited to: your name, email address, phone number, company name, job title, and project requirements. This information is collected when you fill out contact forms, request quotes, sign up for newsletters, or engage with our services."
        },
        {
          subtitle: "Technical Information",
          text: "We automatically collect certain technical information when you visit our website, including: IP address, browser type and version, device type, operating system, referring URLs, pages visited, time spent on pages, and clickstream data. This helps us understand how visitors interact with our website and improve user experience."
        },
        {
          subtitle: "Cookies and Tracking Technologies",
          text: "We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities. These technologies help us remember your preferences, understand user behavior, and provide personalized experiences. You can control cookie settings through your browser preferences."
        },
        {
          subtitle: "Project-Related Information",
          text: "When you engage our development services, we may collect information related to your project including: project specifications, design preferences, business requirements, API credentials (encrypted), and any other information necessary to deliver our services effectively."
        }
      ]
    },
    {
      id: "information-use",
      icon: FaUserCheck,
      title: "How We Use Your Information",
      color: "#4facfe",
      content: [
        {
          subtitle: "Service Delivery",
          text: "We use your information primarily to provide, maintain, and improve our web development services. This includes communicating with you about projects, processing requests, delivering completed work, and providing technical support."
        },
        {
          subtitle: "Communication",
          text: "We may use your contact information to send you project updates, respond to inquiries, send newsletters (if subscribed), notify you about service changes, and provide customer support. You can opt out of marketing communications at any time."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We analyze usage data to understand how our services are used, identify areas for improvement, develop new features, fix bugs, and enhance overall user experience. This helps us build better applications and provide superior service."
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with legal obligations, enforce our terms of service, protect our rights and property, prevent fraud, and ensure the security of our platform and users."
        }
      ]
    },
    {
      id: "information-sharing",
      icon: FaGlobe,
      title: "Information Sharing and Disclosure",
      color: "#f093fb",
      content: [
        {
          subtitle: "Third-Party Service Providers",
          text: "We may share your information with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you. These include: hosting providers (AWS, Azure), analytics services (Google Analytics), email services (SendGrid, Mailchimp), payment processors (Stripe, PayPal), and project management tools. All providers are bound by confidentiality agreements."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or prominent notice on our website of any change in ownership or use of your personal information."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, court order, or government regulation, or if we believe disclosure is necessary to: comply with legal processes, enforce our agreements, protect our rights and property, or protect the safety of our users or the public."
        },
        {
          subtitle: "With Your Consent",
          text: "We may share your information with other third parties when we have your explicit consent to do so. We will always ask for your permission before sharing your information in ways not covered by this privacy policy."
        }
      ]
    },
    {
      id: "data-security",
      icon: FaLock,
      title: "Data Security",
      color: "#5cb85c",
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement industry-standard security measures to protect your personal information including: SSL/TLS encryption for data transmission, encrypted databases, secure authentication protocols, regular security audits, firewall protection, and access controls limiting employee access to personal information."
        },
        {
          subtitle: "Data Encryption",
          text: "All sensitive data is encrypted both in transit (using HTTPS/SSL) and at rest (using AES-256 encryption). Payment information is never stored on our servers and is processed through PCI-DSS compliant payment gateways."
        },
        {
          subtitle: "Access Controls",
          text: "We maintain strict access controls to ensure that only authorized personnel can access personal information. All employees and contractors sign confidentiality agreements and receive training on data protection practices."
        },
        {
          subtitle: "Incident Response",
          text: "In the unlikely event of a data breach, we have procedures in place to respond quickly, assess the impact, notify affected users, and take corrective action. We will notify you within 72 hours of discovering any breach that may affect your personal information."
        }
      ]
    },
    {
      id: "data-retention",
      icon: FaCalendarAlt,
      title: "Data Retention",
      color: "#f0ad4e",
      content: [
        {
          subtitle: "Retention Periods",
          text: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required by law. Active client data is retained for the duration of our business relationship plus 7 years for tax and legal compliance purposes."
        },
        {
          subtitle: "Data Deletion",
          text: "When information is no longer needed, we securely delete or anonymize it. You can request deletion of your personal information at any time by contacting us at privacy@nebula3ddev.com. Some information may be retained in backup systems for up to 90 days after deletion."
        },
        {
          subtitle: "Project Archives",
          text: "For quality assurance and legal purposes, we may retain project-related information (excluding personal data) for up to 10 years. This includes code repositories, design files, and project documentation necessary for maintenance and support."
        }
      ]
    },
    {
      id: "your-rights",
      icon: FaUserSecret,
      title: "Your Privacy Rights",
      color: "#d9534f",
      content: [
        {
          subtitle: "Access and Portability",
          text: "You have the right to access your personal information and request a copy in a structured, commonly used, machine-readable format. We will provide this information within 30 days of your request."
        },
        {
          subtitle: "Correction and Updates",
          text: "You can request correction of inaccurate or incomplete personal information. We encourage you to keep your information up to date by logging into your account or contacting us directly."
        },
        {
          subtitle: "Deletion and Erasure",
          text: "You have the right to request deletion of your personal information, subject to certain legal exceptions (e.g., tax records, legal compliance). We will honor deletion requests within 30 days unless legally required to retain information."
        },
        {
          subtitle: "Opt-Out and Preferences",
          text: "You can opt out of marketing communications at any time by clicking the unsubscribe link in emails or contacting us. You can also manage cookie preferences through your browser settings."
        },
        {
          subtitle: "Objection and Restriction",
          text: "You have the right to object to processing of your personal information for certain purposes and request restriction of processing under specific circumstances. Contact us to exercise these rights."
        }
      ]
    },
    {
      id: "cookies",
      icon: FaCookie,
      title: "Cookies and Tracking",
      color: "#5bc0de",
      content: [
        {
          subtitle: "Types of Cookies We Use",
          text: "Essential Cookies: Required for website functionality. Performance Cookies: Help us analyze website usage. Functional Cookies: Remember your preferences. Targeting Cookies: Used for personalized marketing (with consent)."
        },
        {
          subtitle: "Third-Party Cookies",
          text: "We use third-party services that may set cookies including: Google Analytics (website analytics), social media platforms (sharing features), and advertising networks (remarketing). These third parties have their own privacy policies."
        },
        {
          subtitle: "Managing Cookies",
          text: "You can control and delete cookies through your browser settings. Note that disabling certain cookies may affect website functionality. Most browsers allow you to: view cookies, delete cookies, block cookies, and set preferences for specific websites."
        }
      ]
    },
    {
      id: "international",
      icon: FaGlobe,
      title: "International Data Transfers",
      color: "#667eea",
      content: [
        {
          subtitle: "Data Processing Locations",
          text: "Your information may be transferred to and processed in countries other than your country of residence, including the United States. We ensure that such transfers comply with applicable data protection laws and implement appropriate safeguards."
        },
        {
          subtitle: "Privacy Shield and Standard Clauses",
          text: "When transferring data internationally, we rely on legal mechanisms such as Standard Contractual Clauses approved by the European Commission, adequacy decisions, and other legally recognized transfer mechanisms."
        },
        {
          subtitle: "Data Protection Standards",
          text: "Regardless of where data is processed, we maintain the same high standards of data protection and security described in this policy. All international transfers are encrypted and protected."
        }
      ]
    },
    {
      id: "childrens-privacy",
      icon: FaExclamationTriangle,
      title: "Children's Privacy",
      color: "#d9534f",
      content: [
        {
          subtitle: "Age Restrictions",
          text: "Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you are under 18, please do not use our services or provide any information."
        },
        {
          subtitle: "Parental Notification",
          text: "If we become aware that we have collected personal information from a child under 18, we will take steps to delete such information immediately. Parents or guardians who believe we may have information about a child should contact us at privacy@nebula3ddev.com."
        }
      ]
    },
    {
      id: "changes",
      icon: FaFileContract,
      title: "Changes to This Policy",
      color: "#4facfe",
      content: [
        {
          subtitle: "Policy Updates",
          text: "We may update this privacy policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the new policy on this page and updating the 'Last Updated' date."
        },
        {
          subtitle: "Notification of Changes",
          text: "For significant changes, we will provide additional notice such as email notification or a prominent website banner. We encourage you to review this policy periodically to stay informed about how we protect your information."
        },
        {
          subtitle: "Continued Use",
          text: "Your continued use of our services after any changes to this policy constitutes your acceptance of the updated terms. If you do not agree with changes, please discontinue use of our services and contact us to delete your information."
        }
      ]
    },
    {
      id: "contact",
      icon: FaEnvelope,
      title: "Contact Information",
      color: "#5cb85c",
      content: [
        {
          subtitle: "Privacy Inquiries",
          text: "If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us at: Email: privacy@nebula3ddev.com | Phone: +1 (416) 856-5764 | Address: Nebula3D Dev, 46 Wildfire Road, Woodbridge, ON L4L 8Y9"
        },
        {
          subtitle: "Data Protection Officer",
          text: "For European users, you can contact our Data Protection Officer at: dpo@nebula3ddev.com. We will respond to all requests within 30 days in accordance with GDPR requirements."
        },
        {
          subtitle: "Supervisory Authority",
          text: "If you are located in the European Economic Area, you have the right to lodge a complaint with a supervisory authority if you believe our processing of your personal information violates data protection laws."
        }
      ]
    }
  ];

  return (
    <div className="privacy-policy-page">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="privacy-hero text-center mb-5 py-5">
          <div className="privacy-icon mb-4">
            <FaShieldAlt size={80} style={{ color: '#667eea' }} />
          </div>
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <p className="lead mb-4" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
            At Nebula3D Dev, we take your privacy seriously. This policy explains how we collect, 
            use, and protect your personal information.
          </p>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <FaCalendarAlt style={{ color: 'var(--primary-color)' }} />
            <span style={{ color: 'var(--text-secondary)' }}>
              Last Updated: <strong>{lastUpdated}</strong>
            </span>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="privacy-summary mb-5">
          <Card className="shadow-sm" style={{ 
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <FaInfoCircle size={24} className="me-2" style={{ color: '#667eea' }} />
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 0 }}>Quick Summary</h3>
              </div>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="summary-item">
                    <FaLock className="mb-2" size={32} style={{ color: '#5cb85c' }} />
                    <h6 style={{ color: 'var(--text-primary)' }}>Your Data is Secure</h6>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      We use industry-standard encryption and security measures to protect your information.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="summary-item">
                    <FaUserCheck className="mb-2" size={32} style={{ color: '#4facfe' }} />
                    <h6 style={{ color: 'var(--text-primary)' }}>You Have Control</h6>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Access, update, or delete your personal information anytime by contacting us.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="summary-item">
                    <FaShieldAlt className="mb-2" size={32} style={{ color: '#d9534f' }} />
                    <h6 style={{ color: 'var(--text-primary)' }}>Transparent Practices</h6>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      We're clear about what we collect, why we collect it, and how we use it.
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>

        {/* Detailed Sections */}
        <section className="privacy-details mb-5">
          <Accordion defaultActiveKey="0">
            {sections.map((section, index) => (
              <Accordion.Item 
                eventKey={index.toString()} 
                key={section.id}
                className="mb-3"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden'
                }}
              >
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <div 
                      className="section-icon me-3"
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: `${section.color}20`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: section.color
                      }}
                    >
                      <section.icon size={24} />
                    </div>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: 0, fontSize: '1.25rem' }}>
                      {section.title}
                    </h4>
                  </div>
                </Accordion.Header>
                <Accordion.Body style={{ background: 'var(--bg-surface-alt)' }}>
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4">
                      {item.subtitle && (
                        <h6 style={{ 
                          color: section.color, 
                          fontWeight: '600',
                          marginBottom: '0.75rem' 
                        }}>
                          {item.subtitle}
                        </h6>
                      )}
                      <p style={{ 
                        color: 'var(--text-secondary)', 
                        lineHeight: '1.8',
                        marginBottom: itemIndex === section.content.length - 1 ? 0 : '1.5rem'
                      }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>

        {/* Contact CTA */}
        <section className="privacy-contact text-center py-5 mb-5">
          <Card className="shadow-lg" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: 'var(--radius-xl)',
            color: 'white'
          }}>
            <Card.Body className="p-5">
              <FaEnvelope size={60} className="mb-4" />
              <h3 className="mb-3">Have Questions About Your Privacy?</h3>
              <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                We're here to help. Contact our privacy team with any questions or concerns 
                about how we handle your personal information.
              </p>
              <div className="contact-details">
                <p className="mb-2">
                  <strong>Email:</strong> privacy@nebula3ddev.com
                </p>
                <p className="mb-2">
                  <strong>Phone:</strong> +1 (416) 856-5764
                </p>
                <p className="mb-0">
                  <strong>Response Time:</strong> Within 48 hours
                </p>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Footer Note */}
        <section className="privacy-footer text-center pb-5">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            This privacy policy is effective as of {lastUpdated} and applies to all information 
            collected through our website and services. By using Nebula3D Dev's services, you consent 
            to the practices described in this policy.
          </p>
        </section>
      </Container>
    </div>
  );
}

export default PrivacyPolicy;