import React, { useState } from 'react';
import './Pages.css';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is Be100x Learning Platform?",
      answer: "Be100x is a comprehensive Learning Management System (LMS) designed to provide high-quality tech education. Our platform offers interactive courses, live mentoring, and hands-on projects in various technology domains including web development, mobile development, AI/ML, and more."
    },
    {
      question: "How do I enroll in a course?",
      answer: "Enrolling in a course is simple! Browse our course catalog, select your desired course, and click the 'Enroll Now' button. You can pay using various payment methods including credit/debit cards and UPI. Once enrolled, you'll get immediate access to the course materials."
    },
    {
      question: "What are the payment options available?",
      answer: "We accept multiple payment methods including credit/debit cards, UPI, net banking, and EMI options. We also offer flexible payment plans for our long-term courses. All payments are secured using industry-standard encryption."
    },
    {
      question: "Do you provide job assistance?",
      answer: "Yes! We provide comprehensive job assistance including resume building, mock interviews, and career counseling. We have partnerships with leading tech companies and help connect our students with relevant job opportunities."
    },
    {
      question: "What is the course completion certificate?",
      answer: "Upon successful completion of a course, you'll receive a verified digital certificate. Our certificates are industry-recognized and can be shared directly on LinkedIn. They include details of the skills you've mastered and projects completed."
    },
    {
      question: "How can I access course materials?",
      answer: "Once enrolled, you can access course materials 24/7 through our platform. Content includes video lectures, reading materials, assignments, and projects. You can learn at your own pace and revisit the materials anytime during your subscription period."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Frequently Asked Questions</h1>
      <p className="page-subtitle">Find answers to common questions about our platform and courses</p>

      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'show' : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-contact">
        <h3>Still have questions?</h3>
        <p>If you couldn't find the answer to your question, feel free to contact our support team.</p>
        <button className="contact-support-btn">Contact Support</button>
      </div>
    </div>
  );
};

export default FAQs; 