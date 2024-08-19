"use client";
import { createContext, useEffect, useState } from "react";

// This is the context that will be used to provide the theme and the toggle function to the children
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  // Check user's OS theme preference
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const defaultTheme = prefersDarkScheme ? false : true;

  // This is the state that will be used to store the theme
  const [theme, setTheme] = useState(defaultTheme);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // After the component has mounted, get the theme from localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme !== null) {
      setTheme(JSON.parse(storedTheme));
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    // Update the theme class after the initial render
    document.documentElement.className = theme ? "light" : "dark";
    // Save the current theme in localStorage
    if (hasMounted) {
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  }, [theme, hasMounted]);

  // This is a function that will toggle the theme
  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
