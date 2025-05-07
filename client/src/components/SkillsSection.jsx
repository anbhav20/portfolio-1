import React from 'react';
import { SkillIcon } from '@/assets/icons';

const skills = [
  { name: 'HTML', icon: 'fa-html5', proficiency: 90, delay: 200 },
  { name: 'CSS', icon: 'fa-css3-alt', proficiency: 85, delay: 300 },
  { name: 'JavaScript', icon: 'fa-js', proficiency: 50, delay: 400 },
  { name: 'React.js', icon: 'fa-react', proficiency: 40, delay: 500 },
  { name: 'C++', icon: 'fa-code', proficiency: 85, delay: 600 },
  { name: 'C', icon: 'fa-code', proficiency: 80, delay: 700 },
  { name: 'DSA', icon: 'fa-sitemap', proficiency: 50, delay: 800 },
  { name: 'Python', icon: 'fa-python', proficiency: 70, delay: 900 },
  { name: 'MongoDB', icon: 'fa-mongodb', proficiency: 60, delay: 1000 },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16 relative text-gray-800 dark:text-gray-100 transition-colors" data-aos="fade-up">
          My Skills
          <div className="absolute w-20 h-1 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 mt-2"></div>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={skill.delay}
            >
              <div className="text-blue-500 dark:text-blue-400 text-4xl mb-4">
                <SkillIcon icon={skill.icon} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{skill.name}</h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
                <div 
                  className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${skill.proficiency}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;