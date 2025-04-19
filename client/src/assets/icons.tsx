import React from 'react';

interface SkillIconProps {
  icon: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ icon }) => {
  return <i className={`fab ${icon}`}></i>;
};
