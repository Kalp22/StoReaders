"use client";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

// This is the context that will be used to provide the theme and the toggle function to the children
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const [preference, setPreference] = useState(false);
  const [theme, setTheme] = useLocalStorage("theme", !preference);

  useEffect(() => {
    // Set initial theme preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setPreference(true);
    } else {
      setPreference(false);
    }

    // Subscribe to changes in the preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setPreference(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    // Update theme class after the initial render
    document.documentElement.className = theme ? "light" : "dark";
  }, [theme]);

  // This is a function that will toggle the theme
  const toggleTheme = () => {
    setTheme(!theme);
  };

  // This is the context provider that will provide the theme and the toggle function to the children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div>{children}</div>
    </ThemeContext.Provider>
  );
}
