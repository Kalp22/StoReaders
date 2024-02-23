"use client";
import { createContext, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";
import { usePathname } from "next/navigation";

// This is the context that will be used to provide the theme and the toggle function to the children
export const ThemeContext = createContext();

export default function ThemeContextProvider({ children }) {
  const currentPath = usePathname();

  // This is the state that will be used to store the theme
  const [theme, setTheme] = useLocalStorage("theme", true);
  // const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Update theme class after the initial render
    document.documentElement.className = theme ? "light" : "dark";
  }, [theme]);

  // useEffect(() => {
  //   // Simulate loading for a few seconds before setting loading to false
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   // Cleanup the timeout on component unmount
  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  // This is a function that will toggle the theme
  const toggleTheme = () => {
    setTheme(!theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>{children}</>
    </ThemeContext.Provider>
  );
}
