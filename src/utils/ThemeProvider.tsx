import { useState, createContext } from "react";
import React from "react";

type Theme = "light" | "dark";
type ThemeProvider = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeProvider>({} as ThemeProvider);

interface Props {
  children: JSX.Element;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
