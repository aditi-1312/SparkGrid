import GenerateEnergy from 'components/GenerateEnergy/GenerateEnergy';
import React from 'react';

const GenerateEnergyPage = () => {
  const backgroundImage = require('../assets/images/body-background.png');

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <GenerateEnergy />
    </div>
  );
};

export default GenerateEnergyPage;
