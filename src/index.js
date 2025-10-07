import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { initializeSentry } from './config/monitoring';
import { enforceHTTPS, checkSecureConnection } from './config/https';

// Initialize security features
enforceHTTPS();
checkSecureConnection();

// Initialize Sentry monitoring
initializeSentry();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for offline support and PWA
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('App is cached for offline use');
  },
  onUpdate: (registration) => {
    console.log('New version available! Please refresh.');
    // Optional: Show update notification to user
    if (window.confirm('New version available! Refresh now?')) {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  },
});

// Performance monitoring
reportWebVitals((metric) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
});

