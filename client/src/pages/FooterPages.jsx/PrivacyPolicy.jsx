import React from 'react';
import './Pages.css';

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <h1 className="page-title">Privacy Policy</h1>
      <p className="page-subtitle">Last updated: March 15, 2024</p>

      <div className="privacy-content">
        <section className="policy-section">
          <h2>1. Introduction</h2>
          <p>
            Be100x ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our learning management system platform.
          </p>
        </section>

        <section className="policy-section">
          <h2>2. Information We Collect</h2>
          <h3>2.1 Personal Information</h3>
          <ul>
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing information</li>
            <li>Educational background</li>
            <li>Profile information</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <ul>
            <li>Course progress and completion data</li>
            <li>Assessment results</li>
            <li>Learning preferences</li>
            <li>Device and browser information</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Providing and improving our services</li>
            <li>Personalizing your learning experience</li>
            <li>Processing payments</li>
            <li>Communicating with you about courses and updates</li>
            <li>Analyzing platform usage and effectiveness</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="policy-section">
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>6. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@be100x.com
            <br />
            Address: House-15, Tech Park, Silicon Valley, CA 94025
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 