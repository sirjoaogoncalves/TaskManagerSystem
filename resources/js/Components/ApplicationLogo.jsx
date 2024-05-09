import React from 'react';
import customLogo from './FrogMandolin.png';

const ApplicationLogo = ({ className }) => {
  return (
    <div className={className}>
      <img  src={customLogo} alt="Custom Logo" />
    </div>
  );
};

export default ApplicationLogo;
