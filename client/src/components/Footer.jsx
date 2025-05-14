import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h2>Campus 360</h2>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h3>Quick Link</h3>
            <ul>
              <li><a href="../pages/FooterPages.jsx/Service.jsx">Service</a></li>
              <li><a href="../pages/FooterPages.jsx/Blog.jsx">Blog</a></li>
              <li><a href="../pages/FooterPages.jsx/Project.jsx">Project</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <ul>
              <li><a href="../pages/FooterPages.jsx/Contact.jsx">Contact</a></li>
              <li><a href="../pages/FooterPages.jsx/FAQs.jsx">FAQs</a></li>
              <li><a href="../pages/FooterPages.jsx/PrivacyPolicy.jsx">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>House-15</li>
              <li>+91 9336537195</li>
              <li>shyampandey2525@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="#" className="social-icon"><FaFacebookF /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
          <a href="#" className="social-icon"><FaLinkedinIn /></a>
          <a href="#" className="social-icon"><FaWhatsapp /></a>
        </div>
        <p className="copyright">Copyright ©2025,shyam pandey All right Reserved</p>
      </div>
    </footer>
  );
};

export default Footer; 