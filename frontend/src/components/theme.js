import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const storedLargeText = await AsyncStorage.getItem("isLargeText");
        const parsedLargeText = storedLargeText ? JSON.parse(storedLargeText) : false;
        setIsLargeText(parsedLargeText);

        const storedDarkMode = await AsyncStorage.getItem("darkMode");
        const parsedDarkMode = storedDarkMode
          ? JSON.parse(storedDarkMode)
          : false;
        setDarkMode(parsedDarkMode);
      } catch (error) {
        console.error("Error loading theme:", error);
      }
    };
    getTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ isLargeText, setIsLargeText, darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
