"use client";
import { createContext, useEffect, useState } from "react";

// This is the context that will be used to provide the theme and the toggle function to the children
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  // Set a default theme based on the OS preference or light mode if window is not available
  const [theme, setTheme] = useState(true); // default to light mode
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check user's OS theme preference
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const defaultTheme = prefersDarkScheme ? false : true;

      // Fetch theme from localStorage or use the OS preference
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme !== null) {
        setTheme(JSON.parse(storedTheme));
      } else {
        setTheme(defaultTheme);
      }
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      // Update the theme class after the initial render
      document.documentElement.className = theme ? "light" : "dark";
      // Save the current theme in localStorage
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
