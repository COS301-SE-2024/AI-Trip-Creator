import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
              default: "#121212",
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
