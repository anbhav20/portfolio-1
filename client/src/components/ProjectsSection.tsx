import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
  delay: number;
  sourceCodeLink?: string; // Optional GitHub repo link
}

// Customizable projects array - edit this to add your own projects
const projects: Project[] = [
  {
    id: 1,
    title: "Movie Recommendation & OTT Availability",
    description: "Search for movies, get recommendations using ML, view trailers, and check OTT availability.",
    imageUrl: "/assets/images/projects/movie-recommendation.jpg", // Place image in client/public/assets/images/projects/
    link: "https://movie-recommendation-ml-4ixm.onrender.com",
    sourceCodeLink: "https://github.com/yourusername/movie-recommendation",
    tags: ["React", "ML", "API"],
    delay: 0
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "A responsive admin dashboard for managing an online store with real-time data visualization.",
    imageUrl: "/assets/images/projects/ecommerce-dashboard.jpg",
    link: "#",
    sourceCodeLink: "https://github.com/yourusername/ecommerce-dashboard",
    tags: ["React", "Chart.js", "Firebase"],
    delay: 200
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A feature-rich task manager with categories, priorities, and deadline reminders.",
    imageUrl: "/assets/images/projects/task-manager.jpg",
    link: "#",
    sourceCodeLink: "https://github.com/yourusername/task-manager",
    tags: ["JavaScript", "LocalStorage", "PWA"],
    delay: 400
  }
];

const ProjectsSection: React.FC = () => {
  // Function to handle view project button clicks
  const handleViewProject = (link: string, e: React.MouseEvent) => {
    if (link === "#") {
      e.preventDefault();
      alert("This project is still in development. Check back soon!");
    }
    // Otherwise let the link navigate as normal
  };

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 relative" data-aos="fade-up">
          My Projects
          <div className="absolute w-20 h-1 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-2"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay={project.delay}
            >
              <div className="h-48 overflow-hidden">
                <div 
                  className="w-full h-full bg-gray-300 transform hover:scale-105 transition-transform duration-500 flex items-center justify-center"
                >
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
                          (parent as HTMLElement).classList.add('flex', 'items-center', 'justify-center');
                          const titleSpan = document.createElement('span');
                          titleSpan.className = 'text-gray-600 font-medium px-4 text-center';
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
                          (parent as HTMLElement).classList.add('flex', 'items-center', 'justify-center');
                          const titleSpan = document.createElement('span');
                          titleSpan.className = 'text-gray-600 font-medium px-4 text-center';
                          titleSpan.textContent = project.title;
                          parent.appendChild(titleSpan);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs py-1 px-2 bg-blue-100 text-blue-700 rounded-full"
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
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={(e) => handleViewProject(project.link, e)}
                  >
                    View Project
                  </a>
                  {project.sourceCodeLink && (
                    <a 
                      href={project.sourceCodeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
