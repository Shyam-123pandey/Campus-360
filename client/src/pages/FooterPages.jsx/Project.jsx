import React from 'react';
import './Pages.css';

const Project = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      student: "Team Alpha",
      technology: "MERN Stack",
      description: "A full-featured e-commerce platform with user authentication, product management, and payment integration.",
      completion: "98%"
    },
    {
      title: "AI-Powered Chat Application",
      student: "Team Beta",
      technology: "Python, TensorFlow, React",
      description: "An intelligent chat application that uses natural language processing to provide contextual responses.",
      completion: "85%"
    },
    {
      title: "Learning Management System",
      student: "Team Gamma",
      technology: "Next.js, Node.js, MongoDB",
      description: "A comprehensive LMS with course creation, student management, and progress tracking features.",
      completion: "92%"
    },
    {
      title: "Mobile Fitness App",
      student: "Team Delta",
      technology: "React Native, Firebase",
      description: "A cross-platform fitness application with workout tracking, nutrition planning, and social features.",
      completion: "75%"
    }
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Student Projects</h1>
      <p className="page-subtitle">Showcasing innovative projects built by our talented students</p>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-info">
              <p><strong>Team:</strong> {project.student}</p>
              <p><strong>Technology:</strong> {project.technology}</p>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: project.completion }}
                ></div>
              </div>
              <span className="completion-text">{project.completion}</span>
            </div>
            <button className="view-project-btn">View Project</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project; 