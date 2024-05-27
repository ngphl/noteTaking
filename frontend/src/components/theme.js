import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Theme to store and use persist settings
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isLargeText, setIsLargeText] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const getTheme = async () => {
      try {
        //Large text option
        const storedLargeText = await AsyncStorage.getItem("isLargeText");
        const parsedLargeText = storedLargeText ? JSON.parse(storedLargeText) : false;
        setIsLargeText(parsedLargeText);

        //Dark mode option
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
