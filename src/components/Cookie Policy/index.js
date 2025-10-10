import React from 'react';
import { Container, Row, Col, Card, Accordion, Alert, Badge } from 'react-bootstrap';
import { 
    FaCookie, 
    FaShieldAlt, 
    FaChartBar, 
    FaCog, 
    FaUserShield, 
    FaExclamationTriangle,
    FaCheckCircle,
    FaInfoCircle,
    FaEnvelope,
    FaCalendarAlt,
    FaGlobe,
    FaCode,
    FaEdit,
    FaTrash,
    FaClock,
    FaLock
} from 'react-icons/fa';

const CookiePolicy = () => {
    const lastUpdated = "October 4, 2025";

    const cookieTypes = [
        {
            id: 'essential',
            icon: FaShieldAlt,
            title: 'Essential Cookies',
            color: 'success',
            description: 'Required for basic site functionality',
            duration: 'Session to 1 year',
            canDisable: false,
            examples: [
                {
                    name: 'session_id',
                    purpose: 'Maintains your session state across pages',
                    duration: 'Session',
                    type: 'First-party'
                },
                {
                    name: 'theme_preference',
                    purpose: 'Remembers your dark/light mode selection',
                    duration: '1 year',
                    type: 'First-party'
                },
                {
                    name: 'cookie_consent',
                    purpose: 'Records your cookie preferences',
                    duration: '1 year',
                    type: 'First-party'
                },
                {
                    name: 'auth_token',
                    purpose: 'Authenticates your login session',
                    duration: '30 days',
                    type: 'First-party'
                }
            ]
        },
        {
            id: 'functional',
            icon: FaCog,
            title: 'Functional Cookies',
            color: 'primary',
            description: 'Enable enhanced functionality and personalization',
            duration: '30 days to 1 year',
            canDisable: true,
            examples: [
                {
                    name: 'user_preferences',
                    purpose: 'Stores your customized settings and preferences',
                    duration: '1 year',
                    type: 'First-party'
                },
                {
                    name: 'language_preference',
                    purpose: 'Remembers your language selection',
                    duration: '1 year',
                    type: 'First-party'
                },
                {
                    name: 'notification_settings',
                    purpose: 'Manages your notification preferences',
                    duration: '90 days',
                    type: 'First-party'
                },
                {
                    name: 'layout_config',
                    purpose: 'Saves your dashboard layout customizations',
                    duration: '6 months',
                    type: 'First-party'
                }
            ]
        },
        {
            id: 'analytics',
            icon: FaChartBar,
            title: 'Analytics Cookies',
            color: 'info',
            description: 'Help us understand how visitors interact with our site',
            duration: '30 days to 2 years',
            canDisable: true,
            examples: [
                {
                    name: '_ga',
                    purpose: 'Google Analytics - distinguishes users',
                    duration: '2 years',
                    type: 'Third-party'
                },
                {
                    name: '_gid',
                    purpose: 'Google Analytics - distinguishes users',
                    duration: '24 hours',
                    type: 'Third-party'
                },
                {
                    name: '_gat',
                    purpose: 'Google Analytics - throttles request rate',
                    duration: '1 minute',
                    type: 'Third-party'
                },
                {
                    name: 'analytics_session',
                    purpose: 'Tracks session duration and interactions',
                    duration: '30 minutes',
                    type: 'First-party'
                }
            ]
        },
        {
            id: 'performance',
            icon: FaCode,
            title: 'Performance Cookies',
            color: 'warning',
            description: 'Monitor site performance and optimize user experience',
            duration: 'Session to 30 days',
            canDisable: true,
            examples: [
                {
                    name: 'performance_metrics',
                    purpose: 'Collects page load times and resource usage',
                    duration: '7 days',
                    type: 'First-party'
                },
                {
                    name: 'error_tracking',
                    purpose: 'Captures and reports technical errors',
                    duration: '30 days',
                    type: 'First-party'
                },
                {
                    name: 'cdn_cache',
                    purpose: 'Optimizes content delivery speed',
                    duration: 'Session',
                    type: 'Third-party'
                }
            ]
        }
    ];

    const sections = [
        {
            id: 'what-are-cookies',
            icon: FaInfoCircle,
            title: 'What Are Cookies?',
            color: 'primary',
            content: [
                {
                    subtitle: 'Definition',
                    text: 'Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing site usage, and enabling certain features.'
                },
                {
                    subtitle: 'How They Work',
                    text: 'When you visit Nebula3D Dev, our web server sends a cookie to your browser, which stores it on your device. On subsequent visits, your browser sends the cookie back to our server, allowing us to recognize you and customize your experience.'
                },
                {
                    subtitle: 'Types of Data Stored',
                    text: 'Cookies may store various types of information including session identifiers, user preferences, authentication tokens, language settings, theme choices, and analytics data. All data is stored securely and used only for the purposes outlined in this policy.'
                }
            ]
        },
        {
            id: 'why-we-use',
            icon: FaCookie,
            title: 'Why We Use Cookies',
            color: 'success',
            content: [
                {
                    subtitle: 'Essential Site Functions',
                    text: 'We use cookies to enable core functionality such as user authentication, session management, security features, and maintaining your preferences across different pages of our website.'
                },
                {
                    subtitle: 'Enhanced User Experience',
                    text: 'Cookies help us remember your settings (like theme preferences, language selection, and dashboard customizations) so you don\'t have to re-enter them each time you visit our site.'
                },
                {
                    subtitle: 'Performance Optimization',
                    text: 'We use cookies to monitor and improve site performance, including page load times, resource usage, error tracking, and overall system stability to provide you with the fastest possible experience.'
                },
                {
                    subtitle: 'Analytics and Insights',
                    text: 'Analytics cookies help us understand how visitors use our site, which pages are most popular, how users navigate through our content, and where improvements can be made. This data is aggregated and anonymized.'
                }
            ]
        },
        {
            id: 'managing-cookies',
            icon: FaCog,
            title: 'Managing Your Cookie Preferences',
            color: 'warning',
            content: [
                {
                    subtitle: 'Cookie Consent Banner',
                    text: 'When you first visit Nebula3D Dev, you\'ll see a cookie consent banner that allows you to accept or customize your cookie preferences. You can choose which types of cookies to enable or disable (except essential cookies which are required for site functionality).'
                },
                {
                    subtitle: 'Browser Settings',
                    text: 'Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies, accept only certain cookies, or notify you when a cookie is being set. However, blocking all cookies may prevent you from accessing certain features of our site.'
                },
                {
                    subtitle: 'Changing Preferences',
                    text: 'You can change your cookie preferences at any time by accessing the cookie settings in our website footer or by clearing your browser cookies. Note that changing these settings may affect your user experience and site functionality.'
                },
                {
                    subtitle: 'Third-Party Cookies',
                    text: 'Some cookies on our site are set by third-party services (like Google Analytics). You can opt out of these cookies through the third-party provider\'s website or by using browser extensions designed for this purpose.'
                }
            ]
        },
        {
            id: 'browser-controls',
            icon: FaGlobe,
            title: 'Browser-Specific Instructions',
            color: 'info',
            content: [
                {
                    subtitle: 'Google Chrome',
                    text: 'Settings > Privacy and security > Cookies and other site data. Here you can block all cookies, block third-party cookies, or clear cookies on exit. You can also see and remove specific cookies.'
                },
                {
                    subtitle: 'Mozilla Firefox',
                    text: 'Settings > Privacy & Security > Cookies and Site Data. Choose to accept or block cookies, clear data on close, and manage exceptions for specific websites.'
                },
                {
                    subtitle: 'Safari',
                    text: 'Preferences > Privacy > Manage Website Data. You can block all cookies, remove stored cookies, or prevent cross-site tracking.'
                },
                {
                    subtitle: 'Microsoft Edge',
                    text: 'Settings > Cookies and site permissions > Cookies and site data. Configure whether to allow sites to save and read cookie data, and manage exceptions.'
                }
            ]
        },
        {
            id: 'data-retention',
            icon: FaClock,
            title: 'Cookie Duration & Retention',
            color: 'secondary',
            content: [
                {
                    subtitle: 'Session Cookies',
                    text: 'Session cookies are temporary and are automatically deleted when you close your browser. These are used for essential functions like maintaining your login state during a browsing session.'
                },
                {
                    subtitle: 'Persistent Cookies',
                    text: 'Persistent cookies remain on your device for a set period (from days to years) or until you manually delete them. These cookies remember your preferences and settings across multiple visits to our site.'
                },
                {
                    subtitle: 'Automatic Expiration',
                    text: 'All cookies we set have defined expiration dates. Once expired, they are automatically deleted by your browser. The specific duration for each cookie type is listed in the Cookie Types section above.'
                },
                {
                    subtitle: 'Manual Deletion',
                    text: 'You can delete cookies at any time through your browser settings or by using the cookie management tools on our website. Deleting cookies will reset your preferences and may require you to log in again.'
                }
            ]
        },
        {
            id: 'third-party',
            icon: FaUserShield,
            title: 'Third-Party Cookies',
            color: 'danger',
            content: [
                {
                    subtitle: 'Google Analytics',
                    text: 'We use Google Analytics to analyze website traffic and user behavior. Google sets cookies (_ga, _gid, _gat) to collect anonymous usage data. You can opt out using the Google Analytics Opt-out Browser Add-on.'
                },
                {
                    subtitle: 'Content Delivery Networks',
                    text: 'We use CDNs to deliver content faster and more reliably. These services may set cookies to optimize content delivery and caching. These cookies do not collect personal information.'
                },
                {
                    subtitle: 'Third-Party Privacy Policies',
                    text: 'Third-party services that set cookies on our site have their own privacy policies. We recommend reviewing their policies: Google Privacy Policy, Cloudflare Privacy Policy, and other service providers we use.'
                },
                {
                    subtitle: 'Control Over Third-Party Cookies',
                    text: 'You can disable third-party cookies through our cookie consent banner, your browser settings, or by visiting the third-party provider\'s opt-out page. Note that this may affect certain site features.'
                }
            ]
        },
        {
            id: 'security',
            icon: FaLock,
            title: 'Cookie Security',
            color: 'success',
            content: [
                {
                    subtitle: 'Secure Transmission',
                    text: 'We use secure HTTPS connections to transmit cookies, ensuring that cookie data is encrypted during transmission between your browser and our servers.'
                },
                {
                    subtitle: 'HttpOnly Flags',
                    text: 'Sensitive cookies (like authentication tokens) are marked as HttpOnly, which prevents them from being accessed by client-side JavaScript, protecting against cross-site scripting (XSS) attacks.'
                },
                {
                    subtitle: 'SameSite Attribute',
                    text: 'We use the SameSite cookie attribute to prevent cross-site request forgery (CSRF) attacks by restricting how cookies are sent with cross-origin requests.'
                },
                {
                    subtitle: 'Regular Security Audits',
                    text: 'We regularly review and update our cookie practices to ensure they meet current security standards and protect your data from unauthorized access or misuse.'
                }
            ]
        },
        {
            id: 'updates',
            icon: FaEdit,
            title: 'Updates to This Policy',
            color: 'warning',
            content: [
                {
                    subtitle: 'Policy Changes',
                    text: 'We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our business practices. The "Last Updated" date at the top of this page indicates when the policy was last revised.'
                },
                {
                    subtitle: 'Notification of Changes',
                    text: 'For significant changes to this policy, we will notify you through a prominent notice on our website or via email (if you have an account with us). We encourage you to review this policy periodically.'
                },
                {
                    subtitle: 'Continued Use',
                    text: 'Your continued use of our website after any changes to this Cookie Policy constitutes your acceptance of the updated terms. If you disagree with any changes, you may adjust your cookie settings or discontinue use of our site.'
                }
            ]
        },
        {
            id: 'contact',
            icon: FaEnvelope,
            title: 'Contact Us',
            color: 'primary',
            content: [
                {
                    subtitle: 'Questions & Concerns',
                    text: 'If you have any questions about our use of cookies or this Cookie Policy, please don\'t hesitate to contact us. We\'re committed to transparency and will respond to your inquiries promptly.'
                },
                {
                    subtitle: 'Data Rights',
                    text: 'For questions about your data rights, including the right to access, modify, or delete cookie data, please refer to our Privacy Policy or contact our Data Protection Officer.'
                },
                {
                    subtitle: 'Technical Support',
                    text: 'If you\'re experiencing technical issues related to cookies or need assistance managing your cookie preferences, our support team is here to help.'
                }
            ]
        }
    ];

    return (
        <div className="cookie-policy-page" style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '4rem' }}>
            <Container>
                {/* Hero Section */}
                <Row className="mb-5">
                    <Col>
                        <div className="text-center mb-4">
                            <FaCookie 
                                style={{ 
                                    fontSize: '4rem', 
                                    color: 'var(--primary-color)',
                                    marginBottom: '1rem'
                                }} 
                            />
                            <h1 style={{ 
                                color: 'var(--text-primary)', 
                                fontWeight: '700',
                                fontSize: '2.5rem',
                                marginBottom: '1rem'
                            }}>
                                Cookie Policy
                            </h1>
                            <p style={{ 
                                color: 'var(--text-muted)', 
                                fontSize: '1.1rem',
                                maxWidth: '800px',
                                margin: '0 auto'
                            }}>
                                This Cookie Policy explains how Nebula3D Dev uses cookies and similar tracking technologies 
                                to recognize you when you visit our website. It explains what these technologies are, why 
                                we use them, and your rights to control our use of them.
                            </p>
                            <div className="mt-3">
                                <Badge bg="info" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                                    <FaCalendarAlt className="me-2" />
                                    Last Updated: {lastUpdated}
                                </Badge>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Important Notice */}
                <Row className="mb-4">
                    <Col>
                        <Alert variant="warning" className="d-flex align-items-start">
                            <FaExclamationTriangle className="me-3 mt-1" style={{ fontSize: '1.5rem' }} />
                            <div>
                                <Alert.Heading style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                    Important Notice
                                </Alert.Heading>
                                <p style={{ marginBottom: '0' }}>
                                    By continuing to use our website, you consent to our use of cookies as described in this policy. 
                                    Essential cookies are necessary for site functionality and cannot be disabled. You can manage 
                                    preferences for non-essential cookies through our cookie consent banner or browser settings.
                                </p>
                            </div>
                        </Alert>
                    </Col>
                </Row>

                {/* Quick Summary */}
                <Row className="mb-5">
                    <Col lg={4} className="mb-3">
                        <Card className="h-100" style={{ 
                            background: 'var(--bg-surface)', 
                            border: '1px solid var(--border-color)',
                            borderRadius: '1rem'
                        }}>
                            <Card.Body className="text-center">
                                <FaCheckCircle style={{ fontSize: '2.5rem', color: '#28a745', marginBottom: '1rem' }} />
                                <h5 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                                    Full Control
                                </h5>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    You have complete control over non-essential cookies. Manage your preferences anytime 
                                    through our cookie banner or browser settings.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} className="mb-3">
                        <Card className="h-100" style={{ 
                            background: 'var(--bg-surface)', 
                            border: '1px solid var(--border-color)',
                            borderRadius: '1rem'
                        }}>
                            <Card.Body className="text-center">
                                <FaShieldAlt style={{ fontSize: '2.5rem', color: '#007bff', marginBottom: '1rem' }} />
                                <h5 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                                    Secure & Private
                                </h5>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    All cookies are transmitted securely via HTTPS. We use HttpOnly and SameSite attributes 
                                    to protect your data from unauthorized access.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} className="mb-3">
                        <Card className="h-100" style={{ 
                            background: 'var(--bg-surface)', 
                            border: '1px solid var(--border-color)',
                            borderRadius: '1rem'
                        }}>
                            <Card.Body className="text-center">
                                <FaInfoCircle style={{ fontSize: '2.5rem', color: '#17a2b8', marginBottom: '1rem' }} />
                                <h5 style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                                    Transparent Usage
                                </h5>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                                    We clearly explain what cookies we use, why we use them, and how long they last. 
                                    No hidden tracking or unexpected data collection.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Cookie Types Section */}
                <Row className="mb-5">
                    <Col>
                        <h2 style={{ 
                            color: 'var(--text-primary)', 
                            fontWeight: '700',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            Types of Cookies We Use
                        </h2>
                        {cookieTypes.map((type, index) => (
                            <Card 
                                key={type.id} 
                                className="mb-4" 
                                style={{ 
                                    background: 'var(--bg-surface)', 
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '1rem'
                                }}
                            >
                                <Card.Body>
                                    <div className="d-flex align-items-center mb-3">
                                        <div 
                                            className={`bg-${type.color} bg-opacity-10 rounded-circle p-3 me-3`}
                                            style={{ display: 'inline-flex' }}
                                        >
                                            <type.icon style={{ fontSize: '1.5rem', color: `var(--bs-${type.color})` }} />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                                                {type.title}
                                            </h4>
                                            <p style={{ color: 'var(--text-muted)', marginBottom: '0', fontSize: '0.95rem' }}>
                                                {type.description}
                                            </p>
                                        </div>
                                        <div className="text-end">
                                            <Badge bg={type.canDisable ? 'secondary' : 'success'}>
                                                {type.canDisable ? 'Optional' : 'Required'}
                                            </Badge>
                                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                <FaClock className="me-1" />
                                                {type.duration}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table table-sm" style={{ marginBottom: '0' }}>
                                            <thead>
                                                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                                    <th style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Cookie Name</th>
                                                    <th style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Purpose</th>
                                                    <th style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Duration</th>
                                                    <th style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Type</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {type.examples.map((cookie, idx) => (
                                                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                        <td style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                                            {cookie.name}
                                                        </td>
                                                        <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                            {cookie.purpose}
                                                        </td>
                                                        <td style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                            {cookie.duration}
                                                        </td>
                                                        <td>
                                                            <Badge bg={cookie.type === 'First-party' ? 'primary' : 'warning'} className="text-white">
                                                                {cookie.type}
                                                            </Badge>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>

                {/* Detailed Sections */}
                <Row className="mb-5">
                    <Col>
                        <h2 style={{ 
                            color: 'var(--text-primary)', 
                            fontWeight: '700',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            Detailed Information
                        </h2>
                        <Accordion defaultActiveKey="0">
                            {sections.map((section, index) => (
                                <Accordion.Item 
                                    key={section.id} 
                                    eventKey={index.toString()}
                                    style={{ 
                                        background: 'var(--bg-surface)', 
                                        border: '1px solid var(--border-color)',
                                        marginBottom: '1rem',
                                        borderRadius: '0.5rem',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Accordion.Header>
                                        <div className="d-flex align-items-center">
                                            <div 
                                                className={`bg-${section.color} bg-opacity-10 rounded-circle p-2 me-3`}
                                                style={{ display: 'inline-flex' }}
                                            >
                                                <section.icon style={{ fontSize: '1.25rem', color: `var(--bs-${section.color})` }} />
                                            </div>
                                            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>
                                                {section.title}
                                            </span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body style={{ background: 'var(--bg-primary)' }}>
                                        {section.content.map((item, idx) => (
                                            <div key={idx} className="mb-3">
                                                <h6 style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                                                    {item.subtitle}
                                                </h6>
                                                <p style={{ color: 'var(--text-muted)', marginBottom: '0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>
                </Row>

                {/* Contact CTA */}
                <Row>
                    <Col>
                        <Card 
                            style={{ 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '1rem',
                                color: 'white'
                            }}
                        >
                            <Card.Body className="text-center p-4">
                                <FaEnvelope style={{ fontSize: '3rem', marginBottom: '1rem', opacity: '0.9' }} />
                                <h3 style={{ fontWeight: '700', marginBottom: '1rem' }}>
                                    Questions About Our Cookie Policy?
                                </h3>
                                <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem', opacity: '0.9' }}>
                                    We're here to help! If you have any questions about how we use cookies or need 
                                    assistance managing your preferences, please don't hesitate to reach out.
                                </p>
                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                    <div>
                                        <strong>General Inquiries:</strong>
                                        <br />
                                        <a href="mailto:info@nebula3ddev.com" style={{ color: 'white', textDecoration: 'underline' }}>
                                            info@nebula3ddev.com
                                        </a>
                                    </div>
                                    <div>
                                        <strong>Privacy Officer:</strong>
                                        <br />
                                        <a href="mailto:privacy@nebula3ddev.com" style={{ color: 'white', textDecoration: 'underline' }}>
                                            privacy@nebula3ddev.com
                                        </a>
                                    </div>
                                    <div>
                                        <strong>Technical Support:</strong>
                                        <br />
                                        <a href="mailto:support@nebula3ddev.com" style={{ color: 'white', textDecoration: 'underline' }}>
                                            support@nebula3ddev.com
                                        </a>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Footer Note */}
                <Row className="mt-4">
                    <Col className="text-center">
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            This Cookie Policy is effective as of {lastUpdated}. By using our website, you acknowledge 
                            that you have read and understood this policy.
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CookiePolicy;