"use client";
import { createContext } from "react";

import useLocalStorage from "use-local-storage";

// This is the context that will be used to provide the theme and the toggle function to the children
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  // This is a hook that will check if the user has a preference for dark mode
  const preference =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage("theme", !preference);

  // This is a function that will toggle the theme
  const toggleTheme = () => {
    setTheme(!theme);
  };

  // This is the context provider that will provide the theme and the toggle function to the children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme ? "light" : "dark"}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
