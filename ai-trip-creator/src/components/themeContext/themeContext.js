// // src/components/ThemeContext.js
// import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const ThemeContext = createContext();

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProviderWrapper = ({ children }) => {
//   const [mode, setMode] = useState('light');

//   const theme = useMemo(() => createTheme({
//     palette: {
//       mode,
//       ...(mode === 'dark' && {
//         background: {
//           default: '#3A3B3C', // Use a lighter shade of grey for dark mode
//           paper: '#1d1d1d',
//         },
//         text: {
//           primary: '#e0e0e0',
//         },
//       }),
//     },
//   }), [mode]);

//   const toggleTheme = () => {
//     setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
//   };

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', mode);
//   }, [mode]);

//   return (
//     <ThemeContext.Provider value={{ mode, toggleTheme }}>
//       <ThemeProvider theme={theme}>
//         {children}
//       </ThemeProvider>
//     </ThemeContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "dark" && {
            background: {
              default: "#121212", // Use a lighter shade of grey for dark mode
              paper: "#1d1d1d",
            },
            text: {
              primary: "#e0e0e0",
            },
          }),
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
