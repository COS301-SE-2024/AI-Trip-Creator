import React, { useContext } from 'react';
import { ThemeContext } from './themeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
};

export default ThemeSwitch;
