import React from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
  delay: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Movie Recommendation & OTT Availability",
    description: "Search for movies, get recommendations using ML, view trailers, and check OTT availability.",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    link: "https://movie-recommendation-ml-4ixm.onrender.com",
    tags: ["React", "ML", "API"],
    delay: 0
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    description: "A responsive admin dashboard for managing an online store with real-time data visualization.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    link: "#",
    tags: ["React", "Chart.js", "Firebase"],
    delay: 200
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A feature-rich task manager with categories, priorities, and deadline reminders.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
    link: "#",
    tags: ["JavaScript", "LocalStorage", "PWA"],
    delay: 400
  }
];

const ProjectsSection: React.FC = () => {
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
                  <span className="text-gray-600 font-medium">{project.title}</span>
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
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
