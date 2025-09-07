import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Tabs, Tab } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { authAPI, apiHelpers } from '../../services/api';

const AuthModal = ({ show, onHide, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    // Login fields
    login: '',
    password: '',
    // Register fields
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    registerPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (show) {
      // Reset form when modal opens
      setFormData({
        login: '',
        password: '',
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        registerPassword: '',
        confirmPassword: ''
      });
      setError('');
      setSuccess('');
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData.login, formData.password);
      setSuccess('Login successful!');
      
      // Call success callback
      if (onAuthSuccess) {
        onAuthSuccess(response.user);
      }
      
      // Close modal after short delay
      setTimeout(() => {
        onHide();
      }, 1000);

    } catch (error) {
      const errorInfo = apiHelpers.handleError(error);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate passwords match
    if (formData.registerPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.registerPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.registerPassword,
        firstName: formData.firstName || undefined,
        lastName: formData.lastName || undefined
      };

      const response = await authAPI.register(userData);
      setSuccess('Registration successful! You are now logged in.');
      
      // Call success callback
      if (onAuthSuccess) {
        onAuthSuccess(response.user);
      }
      
      // Close modal after short delay
      setTimeout(() => {
        onHide();
      }, 1500);

    } catch (error) {
      const errorInfo = apiHelpers.handleError(error);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <FaUser className="me-2" />
          {activeTab === 'login' ? 'Sign In' : 'Create Account'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" className="mb-3">
            {success}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          fill
        >
          <Tab eventKey="login" title="Sign In">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control
                  type="text"
                  name="login"
                  value={formData.login}
                  onChange={handleInputChange}
                  placeholder="Enter username or email"
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    required
                    disabled={loading}
                  />
                  <Button
                    variant="link"
                    className="position-absolute end-0 top-50 translate-middle-y p-0 me-2"
                    style={{ border: 'none', background: 'none' }}
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading || !formData.login || !formData.password}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <FaLock className="me-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="register" title="Sign Up">
            <Form onSubmit={handleRegister}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First name"
                      disabled={loading}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last name"
                      disabled={loading}
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Username *</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Choose a username"
                  required
                  disabled={loading}
                />
                <Form.Text className="text-muted">
                  3-50 characters, letters, numbers, and underscores only
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  required
                  disabled={loading}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password *</Form.Label>
                <Form.Control
                  type="password"
                  name="registerPassword"
                  value={formData.registerPassword}
                  onChange={handleInputChange}
                  placeholder="Create password"
                  required
                  disabled={loading}
                />
                <Form.Text className="text-muted">
                  At least 6 characters
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password *</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  required
                  disabled={loading}
                />
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="success"
                  disabled={
                    loading || 
                    !formData.username || 
                    !formData.email || 
                    !formData.registerPassword || 
                    !formData.confirmPassword
                  }
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <FaUser className="me-2" />
                      Create Account
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </Tab>
        </Tabs>

        <div className="text-center mt-3">
          <small className="text-muted">
            By signing up, you can save your favorite videos, create playlists, and track your viewing progress.
          </small>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;