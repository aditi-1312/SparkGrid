import { Marketplace } from 'components/MarketPlace/MarketPlace';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import React from 'react';

const MarketplacePage = () => {
  const backgroundImage = require('../assets/images/body-background.png');

  return (
    <DashboardLayout
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <DashboardNavbar />
      <Marketplace />
    </DashboardLayout>
  );
};

export default MarketplacePage;
