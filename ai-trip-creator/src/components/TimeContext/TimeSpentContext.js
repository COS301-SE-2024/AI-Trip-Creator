import React, { createContext, useState, useEffect, useRef } from 'react';

export const TimeSpentContext = createContext();

export const TimeSpentProvider = ({ children }) => {
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const updateTotalTimeSpent = () => {
      const endTime = Date.now();
      const timeSpent = (endTime - startTimeRef.current) / 1000; // time in seconds
      setTotalTimeSpent(prevTime => prevTime + timeSpent);
      startTimeRef.current = Date.now();
    };

    const interval = setInterval(updateTotalTimeSpent, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <TimeSpentContext.Provider value={{ totalTimeSpent, setTotalTimeSpent }}>
      {children}
    </TimeSpentContext.Provider>
  );
};