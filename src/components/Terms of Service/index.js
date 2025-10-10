import React from 'react';
import { Container, Row, Col, Card, Accordion, Alert } from 'react-bootstrap';
import { 
  FaFileContract, 
  FaHandshake, 
  FaShieldAlt, 
  FaGavel,
  FaUserShield,
  FaDollarSign,
  FaExclamationTriangle,
  FaBan,
  FaCheckCircle,
  FaCopyright,
  FaBalanceScale,
  FaEnvelope,
  FaCalendarAlt,
  FaInfoCircle,
  FaEdit,
  FaUndo
} from 'react-icons/fa';

function TermsOfService() {
  const lastUpdated = "October 4, 2025";
  const effectiveDate = "October 4, 2025";

  const sections = [
    {
      id: "acceptance",
      icon: FaHandshake,
      title: "Acceptance of Terms",
      color: "#667eea",
      content: [
        {
          subtitle: "Agreement to Terms",
          text: "By accessing or using Nebula3D Dev's website, services, or applications (collectively, the 'Services'), you agree to be bound by these Terms of Service ('Terms'). If you do not agree to these Terms, you must not access or use our Services."
        },
        {
          subtitle: "Eligibility",
          text: "You must be at least 18 years old and have the legal capacity to enter into contracts to use our Services. By using our Services, you represent and warrant that you meet these requirements."
        },
        {
          subtitle: "Business Use",
          text: "Our Services are intended for business and professional use. If you are using our Services on behalf of an organization, you represent that you have the authority to bind that organization to these Terms."
        },
        {
          subtitle: "Account Registration",
          text: "Certain features of our Services may require you to register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials."
        }
      ]
    },
    {
      id: "services",
      icon: FaCheckCircle,
      title: "Description of Services",
      color: "#4facfe",
      content: [
        {
          subtitle: "Web Development Services",
          text: "Nebula3D Dev provides custom web application development, including but not limited to: front-end development, back-end development, full-stack applications, API development, database design, UI/UX design, mobile application development, and cloud deployment services."
        },
        {
          subtitle: "Service Scope",
          text: "The specific scope, deliverables, timeline, and pricing for each project will be outlined in a separate Statement of Work (SOW) or project agreement. The SOW will form part of the contract between you and Nebula3D Dev and will be subject to these Terms."
        },
        {
          subtitle: "Service Availability",
          text: "We strive to provide continuous availability of our Services, but we do not guarantee uninterrupted access. We may suspend or discontinue any part of our Services at any time, with or without notice, for maintenance, updates, or other reasons."
        },
        {
          subtitle: "Changes to Services",
          text: "We reserve the right to modify, update, or discontinue any aspect of our Services at any time. We will provide reasonable notice of material changes that may affect your use of our Services."
        }
      ]
    },
    {
      id: "client-obligations",
      icon: FaUserShield,
      title: "Client Obligations and Responsibilities",
      color: "#f093fb",
      content: [
        {
          subtitle: "Cooperation and Communication",
          text: "You agree to provide timely feedback, approvals, and all necessary information, materials, and access required for us to perform our Services. Delays in providing required materials may affect project timelines and costs."
        },
        {
          subtitle: "Content and Materials",
          text: "You are responsible for providing all content, text, images, logos, and other materials for your project. You represent and warrant that you own or have the necessary rights to use and authorize us to use all such materials."
        },
        {
          subtitle: "Third-Party Services",
          text: "If your project requires third-party services (hosting, APIs, licenses, etc.), you are responsible for obtaining and maintaining these services at your own expense unless otherwise specified in the SOW."
        },
        {
          subtitle: "Testing and Acceptance",
          text: "You agree to test all deliverables in a timely manner and provide specific, detailed feedback. Acceptance will be deemed given if you do not provide written objections within the testing period specified in the SOW (typically 7-14 days)."
        },
        {
          subtitle: "Prohibited Uses",
          text: "You may not use our Services for any illegal purpose, to violate any laws, to infringe on intellectual property rights, to distribute malware or harmful code, to engage in fraudulent activities, or to harass, abuse, or harm others."
        }
      ]
    },
    {
      id: "payment",
      icon: FaDollarSign,
      title: "Payment Terms and Fees",
      color: "#5cb85c",
      content: [
        {
          subtitle: "Project Pricing",
          text: "All fees for our Services will be specified in the applicable SOW or project agreement. Pricing may be fixed-price, hourly, or based on milestones, as agreed upon in writing."
        },
        {
          subtitle: "Payment Schedule",
          text: "Unless otherwise specified, payment terms are as follows: (1) 50% deposit due upon project commencement, (2) 25% due at midpoint/milestone, (3) 25% due upon final delivery. For hourly projects, invoices are typically issued monthly."
        },
        {
          subtitle: "Late Payments",
          text: "Invoices are due within 15 days of the invoice date unless otherwise agreed. Late payments may incur a fee of 1.5% per month (18% annually) or the maximum rate permitted by law, whichever is less. We reserve the right to suspend work on overdue accounts."
        },
        {
          subtitle: "Expenses and Additional Costs",
          text: "Unless included in the SOW, you will be responsible for reimbursing reasonable expenses such as third-party software licenses, stock assets, hosting fees, domain registration, and other project-specific costs."
        },
        {
          subtitle: "Taxes",
          text: "All fees are exclusive of applicable taxes, duties, or similar governmental charges. You are responsible for paying all such taxes except for taxes based on our net income."
        },
        {
          subtitle: "Refunds",
          text: "Deposits are non-refundable once work has commenced. Refunds for completed work will be provided only in cases of material breach by Nebula3D Dev and will be prorated based on work completed."
        }
      ]
    },
    {
      id: "intellectual-property",
      icon: FaCopyright,
      title: "Intellectual Property Rights",
      color: "#f0ad4e",
      content: [
        {
          subtitle: "Client Ownership",
          text: "Upon full payment of all fees, you will own the final deliverables specifically created for your project, including custom code, designs, and documentation as specified in the SOW."
        },
        {
          subtitle: "Nebula3D Dev Ownership",
          text: "We retain ownership of: (1) all pre-existing intellectual property, (2) reusable components, frameworks, and tools, (3) general knowledge and techniques, (4) any work product created before full payment is received."
        },
        {
          subtitle: "License to Pre-Existing Works",
          text: "We grant you a non-exclusive, perpetual, royalty-free license to use any of our pre-existing intellectual property incorporated into your project deliverables, solely for the purposes of using those deliverables."
        },
        {
          subtitle: "Portfolio Rights",
          text: "We reserve the right to display your project in our portfolio, marketing materials, and case studies unless you request confidentiality in writing. We may use anonymized or generic descriptions if confidentiality is required."
        },
        {
          subtitle: "Third-Party Components",
          text: "Projects may incorporate third-party open-source libraries and components, which are licensed under their respective terms. You are responsible for complying with such licenses in your use of the deliverables."
        },
        {
          subtitle: "Moral Rights",
          text: "To the extent permitted by law, you waive any moral rights in the deliverables and agree that we may make reasonable modifications in the course of providing services."
        }
      ]
    },
    {
      id: "confidentiality",
      icon: FaShieldAlt,
      title: "Confidentiality and Non-Disclosure",
      color: "#d9534f",
      content: [
        {
          subtitle: "Confidential Information",
          text: "Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of the engagement. Confidential Information includes business plans, technical data, customer lists, pricing, and any information marked as confidential."
        },
        {
          subtitle: "Protection Obligations",
          text: "Each party agrees to: (1) use Confidential Information only for the purposes of the engagement, (2) protect it with the same degree of care used for their own confidential information, (3) limit disclosure to employees and contractors with a need to know, (4) not disclose to third parties without prior written consent."
        },
        {
          subtitle: "Exclusions",
          text: "Confidentiality obligations do not apply to information that: (1) was publicly known at the time of disclosure, (2) becomes publicly known through no fault of the receiving party, (3) was rightfully known prior to disclosure, (4) is independently developed, (5) is required to be disclosed by law."
        },
        {
          subtitle: "Duration",
          text: "Confidentiality obligations survive for three (3) years after the termination of the engagement or until the information becomes publicly available through no fault of the receiving party, whichever occurs first."
        }
      ]
    },
    {
      id: "warranties",
      icon: FaCheckCircle,
      title: "Warranties and Representations",
      color: "#5bc0de",
      content: [
        {
          subtitle: "Service Warranty",
          text: "We warrant that: (1) our Services will be performed in a professional and workmanlike manner, (2) deliverables will substantially conform to the specifications in the SOW, (3) we have the right and authority to provide the Services and grant the licenses described herein."
        },
        {
          subtitle: "Defect Correction",
          text: "For a period of 30 days after delivery (the 'Warranty Period'), we will correct any defects or errors that prevent deliverables from substantially conforming to the agreed specifications at no additional charge."
        },
        {
          subtitle: "Client Warranties",
          text: "You warrant that: (1) you have the right to use all materials provided to us, (2) your use of deliverables will comply with all applicable laws, (3) you have the authority to enter into this agreement, (4) all information provided to us is accurate and complete."
        },
        {
          subtitle: "Disclaimer",
          text: "EXCEPT AS EXPRESSLY PROVIDED HEREIN, OUR SERVICES AND DELIVERABLES ARE PROVIDED 'AS IS' WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT."
        },
        {
          subtitle: "No Guarantee of Results",
          text: "While we strive for excellence, we do not guarantee specific results, such as increased traffic, sales, search engine rankings, or business outcomes resulting from our Services."
        }
      ]
    },
    {
      id: "liability",
      icon: FaBalanceScale,
      title: "Limitation of Liability",
      color: "#667eea",
      content: [
        {
          subtitle: "Liability Cap",
          text: "TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL AGGREGATE LIABILITY ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICES WILL NOT EXCEED THE TOTAL FEES PAID BY YOU FOR THE SPECIFIC PROJECT GIVING RISE TO THE CLAIM IN THE 12 MONTHS PRECEDING THE CLAIM."
        },
        {
          subtitle: "Excluded Damages",
          text: "IN NO EVENT WILL Nebula3D Dev BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, BUSINESS INTERRUPTION, OR LOSS OF GOODWILL, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."
        },
        {
          subtitle: "Exceptions",
          text: "The limitations in this section do not apply to: (1) our gross negligence or willful misconduct, (2) our breach of confidentiality obligations, (3) our infringement of third-party intellectual property rights, (4) damages that cannot be limited by applicable law."
        },
        {
          subtitle: "Allocation of Risk",
          text: "The limitations of liability reflect the allocation of risk between the parties. The fees charged reflect this allocation of risk and the limitations of liability specified herein."
        }
      ]
    },
    {
      id: "indemnification",
      icon: FaShieldAlt,
      title: "Indemnification",
      color: "#4facfe",
      content: [
        {
          subtitle: "Client Indemnification",
          text: "You agree to indemnify, defend, and hold harmless Nebula3D Dev and its officers, directors, employees, and contractors from any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising from: (1) your use of deliverables, (2) content or materials you provide, (3) your breach of these Terms, (4) your violation of any law or third-party rights."
        },
        {
          subtitle: "Nebula3D Dev Indemnification",
          text: "We agree to indemnify you from claims that deliverables created solely by us infringe any third-party copyright, trademark, or trade secret, provided you: (1) promptly notify us of the claim, (2) give us control of the defense and settlement, (3) provide reasonable assistance at our expense."
        },
        {
          subtitle: "Indemnification Process",
          text: "The indemnifying party must: (1) be given prompt written notice of any claim, (2) have sole control of the defense and settlement (with the other party's reasonable cooperation), (3) not settle in a way that admits liability or imposes obligations on the indemnified party without consent."
        }
      ]
    },
    {
      id: "termination",
      icon: FaBan,
      title: "Termination and Cancellation",
      color: "#d9534f",
      content: [
        {
          subtitle: "Termination for Convenience",
          text: "Either party may terminate a project by providing 15 days' written notice. Upon termination, you must pay for all work completed up to the termination date, including work-in-progress prorated based on completion percentage."
        },
        {
          subtitle: "Termination for Cause",
          text: "Either party may terminate immediately if the other party: (1) materially breaches these Terms and fails to cure within 15 days of written notice, (2) becomes insolvent or files for bankruptcy, (3) ceases business operations."
        },
        {
          subtitle: "Effect of Termination",
          text: "Upon termination: (1) you must pay all outstanding fees, (2) we will deliver all completed work-in-progress, (3) each party must return or destroy the other's Confidential Information, (4) rights and licenses granted will terminate unless full payment has been made."
        },
        {
          subtitle: "Survival",
          text: "The following sections survive termination: Payment Terms, Intellectual Property Rights, Confidentiality, Warranties (to the extent of deliverables paid for), Limitation of Liability, Indemnification, and Dispute Resolution."
        }
      ]
    },
    {
      id: "dispute-resolution",
      icon: FaGavel,
      title: "Dispute Resolution",
      color: "#f0ad4e",
      content: [
        {
          subtitle: "Informal Resolution",
          text: "In the event of any dispute, claim, or controversy, the parties agree to first attempt to resolve the matter informally through good-faith negotiations for at least 30 days before pursuing formal dispute resolution."
        },
        {
          subtitle: "Mediation",
          text: "If informal negotiations fail, the parties agree to attempt to resolve the dispute through mediation administered by a mutually agreed-upon mediator or mediation service. The costs of mediation will be shared equally."
        },
        {
          subtitle: "Arbitration",
          text: "If mediation is unsuccessful, any remaining dispute will be resolved by binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration will be conducted in [Your City, State], and judgment on the award may be entered in any court of competent jurisdiction."
        },
        {
          subtitle: "Exceptions to Arbitration",
          text: "Either party may seek injunctive relief in court for: (1) intellectual property infringement, (2) breach of confidentiality, (3) collection of unpaid fees. Either party may also pursue claims in small claims court if eligible."
        },
        {
          subtitle: "Class Action Waiver",
          text: "YOU AND Nebula3D Dev AGREE THAT DISPUTES WILL BE RESOLVED ON AN INDIVIDUAL BASIS. YOU WAIVE ANY RIGHT TO PARTICIPATE IN A CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING."
        }
      ]
    },
    {
      id: "general",
      icon: FaFileContract,
      title: "General Provisions",
      color: "#5cb85c",
      content: [
        {
          subtitle: "Entire Agreement",
          text: "These Terms, together with any SOW or project agreement, constitute the entire agreement between you and Nebula3D Dev regarding the Services and supersede all prior or contemporaneous communications and proposals."
        },
        {
          subtitle: "Amendments",
          text: "We reserve the right to modify these Terms at any time. We will notify you of material changes by email or through our website. Your continued use of Services after changes take effect constitutes acceptance of the modified Terms."
        },
        {
          subtitle: "Assignment",
          text: "You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations to any affiliate or in connection with a merger, acquisition, or sale of assets."
        },
        {
          subtitle: "Force Majeure",
          text: "Neither party will be liable for any failure or delay in performance due to circumstances beyond their reasonable control, including natural disasters, war, terrorism, labor disputes, government actions, or internet/utility failures."
        },
        {
          subtitle: "Independent Contractors",
          text: "The relationship between you and Nebula3D Dev is that of independent contractors. Nothing in these Terms creates a partnership, joint venture, employment, or agency relationship."
        },
        {
          subtitle: "Severability",
          text: "If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect, and the invalid provision will be modified to be valid and enforceable to the maximum extent possible."
        },
        {
          subtitle: "Waiver",
          text: "No waiver of any provision of these Terms will be deemed a further or continuing waiver of such provision or any other provision. Our failure to assert any right or provision under these Terms does not constitute a waiver of such right or provision."
        },
        {
          subtitle: "Notices",
          text: "All notices under these Terms must be in writing and sent to the addresses specified in the SOW or to legal@nebula3ddev.com. Notices are effective upon receipt when sent by email or three days after mailing when sent by certified mail."
        },
        {
          subtitle: "Governing Law",
          text: "These Terms are governed by the laws of [Your State], without regard to conflict of law principles. Any disputes not subject to arbitration will be resolved in the state or federal courts located in [Your County, State]."
        }
      ]
    },
    {
      id: "contact",
      icon: FaEnvelope,
      title: "Contact Information",
      color: "#667eea",
      content: [
        {
          subtitle: "Legal Inquiries",
          text: "For questions about these Terms of Service, please contact us at: Email: legal@nebula3ddev.com | Phone: +1 (416) 856-5764 | Address: Nebula3D Dev, 46 Wildfire Road, Woodbridge, ON L4L 8Y9"
        },
        {
          subtitle: "Business Inquiries",
          text: "For new project inquiries or general business questions: Email: hello@nebula3ddev.com | Phone: +1 (416) 856-5764"
        }
      ]
    }
  ];

  return (
    <div className="terms-of-service-page">
      <Container fluid className="px-4">
        {/* Hero Section */}
        <section className="terms-hero text-center mb-5 py-5">
          <div className="terms-icon mb-4">
            <FaFileContract size={80} style={{ color: '#667eea' }} />
          </div>
          <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            Terms of Service
          </h1>
          <p className="lead mb-4" style={{ color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto' }}>
            Please read these terms carefully before using Nebula3D Dev's services. 
            These terms govern your use of our web development services and applications.
          </p>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="d-flex align-items-center justify-content-center gap-4 mb-3">
                <div className="d-flex align-items-center">
                  <FaCalendarAlt className="me-2" style={{ color: 'var(--primary-color)' }} />
                  <div className="text-start">
                    <small style={{ color: 'var(--text-muted)', display: 'block' }}>Last Updated</small>
                    <strong style={{ color: 'var(--text-secondary)' }}>{lastUpdated}</strong>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaCheckCircle className="me-2" style={{ color: '#5cb85c' }} />
                  <div className="text-start">
                    <small style={{ color: 'var(--text-muted)', display: 'block' }}>Effective Date</small>
                    <strong style={{ color: 'var(--text-secondary)' }}>{effectiveDate}</strong>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Important Notice */}
        <section className="terms-notice mb-5">
          <Alert variant="warning" className="shadow-sm">
            <div className="d-flex align-items-start">
              <FaExclamationTriangle size={24} className="me-3 mt-1" />
              <div>
                <Alert.Heading>Important Legal Agreement</Alert.Heading>
                <p className="mb-0">
                  These Terms of Service constitute a legally binding agreement between you and Nebula3D Dev. 
                  By using our services, you acknowledge that you have read, understood, and agree to be bound by these terms. 
                  If you do not agree, please do not use our services. This agreement includes important provisions regarding 
                  limitation of liability, dispute resolution, and arbitration.
                </p>
              </div>
            </div>
          </Alert>
        </section>

        {/* Quick Summary */}
        <section className="terms-summary mb-5">
          <Card className="shadow-sm" style={{ 
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-3">
                <FaInfoCircle size={24} className="me-2" style={{ color: '#667eea' }} />
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 0 }}>Key Highlights</h3>
              </div>
              <Row>
                <Col md={4} className="mb-3">
                  <div className="summary-item">
                    <FaHandshake className="mb-2" size={32} style={{ color: '#4facfe' }} />
                    <h6 style={{ color: 'var(--text-primary)' }}>Professional Services</h6>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Clear terms for web development projects, deliverables, and timelines.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="summary-item">
                    <FaCopyright className="mb-2" size={32} style={{ color: '#f0ad4e' }} />
                    <h6 style={{ color: 'var(--text-primary)' }}>Your IP Protection</h6>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      You own the final deliverables upon full payment of all project fees.
                    </p>
                  </div>
                </Col>
                <Col md={4} className="mb-3">
                  <div className="summary-item">
                    <FaBalanceScale className="mb-2" size={32} style={{ color: '#5cb85c' }} />
                    <h6 style={{ color: 'var(--text-primary)' }}>Fair & Transparent</h6>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Clear payment terms, warranties, and dispute resolution procedures.
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </section>

        {/* Detailed Sections */}
        <section className="terms-details mb-5">
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
        <section className="terms-contact text-center py-5 mb-5">
          <Card className="shadow-lg" style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: 'var(--radius-xl)',
            color: 'white'
          }}>
            <Card.Body className="p-5">
              <FaEnvelope size={60} className="mb-4" />
              <h3 className="mb-3">Questions About These Terms?</h3>
              <p className="lead mb-4" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                Our legal team is here to help clarify any questions you may have about 
                these Terms of Service or your rights and obligations.
              </p>
              <div className="contact-details">
                <p className="mb-2">
                  <strong>Legal Inquiries:</strong> legal@nebula3ddev.com
                </p>
                <p className="mb-2">
                  <strong>Business Inquiries:</strong> hello@nebula3ddev.com
                </p>
                <p className="mb-0">
                  <strong>Phone:</strong> +1 (416) 856-5764
                </p>
              </div>
            </Card.Body>
          </Card>
        </section>

        {/* Footer Note */}
        <section className="terms-footer text-center pb-5">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '800px', margin: '0 auto' }}>
            These Terms of Service are effective as of {effectiveDate} and apply to all users of 
            Nebula3D Dev's services. By engaging our services, you acknowledge that you have read, 
            understood, and agree to be bound by these terms. We recommend that you print or save 
            a copy of these terms for your records.
          </p>
        </section>
      </Container>
    </div>
  );
}

export default TermsOfService;