import React from 'react';
import { ThemeProvider } from './themeContext';
import ThemeSwitch from './themeSwitch';
import Splash from './components/splash/splash';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeSwitch />
      <Splash />
      {/* Other components */}
    </ThemeProvider>
  );
};

export default App;
