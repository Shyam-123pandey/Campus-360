import React, { useState } from 'react';
import './Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    console.log('Form submitted:', formData);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">Get in touch with our team for any queries or support</p>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-item">
            <h3>📍 Address</h3>
            <p>House-15, Tech Park</p>
            <p>Silicon Valley, CA 94025</p>
          </div>
          <div className="info-item">
            <h3>📞 Phone</h3>
            <p>+91 9336537195</p>
            <p>Mon-Fri, 9:00 AM - 6:00 PM IST</p>
          </div>
          <div className="info-item">
            <h3>✉️ Email</h3>
            <p>shyampandey2525@gmail.com</p>
            <p>support@be100x.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact; 