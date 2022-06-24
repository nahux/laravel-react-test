import React, { useState } from 'react';
import driversData from './driversData';

export const DriverContext = React.createContext();

export const DriversProvider = ({ children }) => {
  const [drivers, setDrivers] = useState(driversData);
  const value = [drivers, setDrivers]

  return (
    <DriverContext.Provider value={value}>
      {children}
    </DriverContext.Provider>
  );
};
