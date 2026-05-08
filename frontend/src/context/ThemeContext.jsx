import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const themeStyles = {
    dark: {
      bg: "#0f172a",
      card: "rgba(30,41,59,0.8)",
      text: "#e2e8f0",
      accent: "#38bdf8",
    },
    light: {
      bg: "#f1f5f9",
      card: "rgba(255,255,255,0.8)",
      text: "#0f172a",
      accent: "#0ea5e9",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, styles: themeStyles[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
