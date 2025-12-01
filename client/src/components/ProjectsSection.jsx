import React, { useState } from 'react';

// Customizable projects array - edit this to add your own projects
const projects = [
  {
    id: 1,
    title: "Movie Recommendation & OTT Availability",
    description: "Search for movies, get recommendations using ML, view trailers, and check OTT availability.",
    imageUrl: "/assets/images/projects/movie-recommendation.jpg", // Place image in client/public/assets/images/projects/
    link: "https://movie-recommendation-ml-4ixm.onrender.com",
    sourceCodeLink: "https://github.com/anbhav20/Movie-Recommendation-ML-2",
    tags: [  "Flask","Python","JavaScript","Tailwind CSS","TMDB API","Machine Learning" ],
    
    delay: 0
  },
  {
    id: 2,
    title: "Personal Portfolio Website",
    description: "A modern React portfolio showcasing projects and skills with smooth animations and theme switching.",
    imageUrl: "/assets/images/projects/portfolio.jpg",
    link: "https://portfolio-1-a01n.onrender.com",
    sourceCodeLink: "https://github.com/anbhav20/portfolio-1",
    tags: ["React", "JavaScript", "Vite", "Tailwind CSS", "Shadcn", "Node.js", "Express.js", "AOS", "Nodemailer"],
    delay: 200
  },
  {
    id: 3,
    title: "CompusConnect(it'll be coming soon)",
    description: "A feature-rich MERN web app for Indian college students that brings together real-time chat, college‑specific groups, nearby peer discovery, and a verified job/internship board.",
    imageUrl: "/assets/images/projects/task-manager.jpg",
    link: "#",
    sourceCodeLink: "https://github.com/yourusername/task-manager",
    tags: ["JavaScript", "LocalStorage", "PWA"],
    delay: 400
  }
];

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative transition-colors" 
           onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 z-10 transition-colors"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        
        {/* Project Image */}
        <div className="h-64 w-full overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentNode;
              if (parent) {
                parent.classList.add('bg-gray-200', 'dark:bg-gray-700', 'flex', 'items-center', 'justify-center');
                const initial = document.createElement('span');
                initial.className = 'text-2xl font-bold text-gray-600 dark:text-gray-300';
                initial.textContent = project.title.charAt(0);
                parent.appendChild(initial);
              }
            }}
          />
        </div>
        
        {/* Project Details */}
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-100">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="text-sm py-1 px-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="flex items-center">
                <i className="fas fa-external-link-alt mr-2"></i> Visit Project
              </span>
            </a>
            {project.sourceCodeLink && (
              <a 
                href={project.sourceCodeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                <span className="flex items-center">
                  <i className="fab fa-github mr-2"></i> View Source Code
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Function to handle view project button clicks
  const handleViewProject = (link, e) => {
    if (link === "#") {
      e.preventDefault();
      alert("This project is still in development. Check back soon!");
    }
    // Otherwise let the link navigate as normal
  };
  
  // Function to show project details modal
  const showProjectDetails = (project) => {
    setSelectedProject(project);
  };
  
  // Function to close the modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 relative text-gray-800 dark:text-gray-100 transition-colors" data-aos="fade-up">
          My Projects
          <div className="absolute w-20 h-1 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-2"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-400 border-2 border-transparent"
              data-aos="fade-up"
              data-aos-delay={project.delay}
            >
              <div className="h-48 overflow-hidden group">
                <div 
                  className="w-full h-full bg-gray-300 dark:bg-gray-700 transform group-hover:scale-110 transition-transform duration-500 flex items-center justify-center relative cursor-pointer"
                  onClick={() => showProjectDetails(project)}
                >
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg transform scale-75 group-hover:scale-100 transition-transform">
                      <i className="fas fa-search mr-2"></i> Quick View
                    </span>
                  </div>
                  {/* Show project thumbnail if available */}
                  {project.imageUrl.startsWith('/assets') ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails, show project title as fallback
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentNode;
                        if (parent) {
                          parent.classList.add('flex', 'items-center', 'justify-center');
                          const titleSpan = document.createElement('span');
                          titleSpan.className = 'text-gray-600 dark:text-gray-300 font-medium px-4 text-center';
                          titleSpan.textContent = project.title;
                          parent.appendChild(titleSpan);
                        }
                      }}
                    />
                  ) : (
                    // Use remote image URLs directly
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback for external images too
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentNode;
                        if (parent) {
                          parent.classList.add('flex', 'items-center', 'justify-center');
                          const titleSpan = document.createElement('span');
                          titleSpan.className = 'text-gray-600 dark:text-gray-300 font-medium px-4 text-center';
                          titleSpan.textContent = project.title;
                          parent.appendChild(titleSpan);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-800 dark:text-gray-100">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs py-1 px-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full transform transition-all duration-300 hover:scale-110 hover:bg-blue-200 dark:hover:bg-blue-800/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:translate-y-px hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={(e) => handleViewProject(project.link, e)}
                  >
                    <span className="flex items-center">
                      <i className="fas fa-external-link-alt mr-2"></i> View Project
                    </span>
                  </a>
                  {project.sourceCodeLink && (
                    <a 
                      href={project.sourceCodeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 transform hover:translate-y-px hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
                    >
                      <span className="flex items-center">
                        <i className="fab fa-github mr-2"></i> Source Code
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <ProjectModal project={selectedProject} onClose={closeModal} />
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;