import { StyleSheet } from "react-native";
import { useTheme } from "./theme";

export function GlobalStyles() {
  const { isLargeText } = useTheme();
  const { darkMode } = useTheme();

  const textColor = darkMode ? "#fff" : "#000";
  const backgroundColor = darkMode ? "#282828" : "#fff";
  const iconColor = darkMode ? "#a688fa" : "#000";

  const styles = StyleSheet.create({
    title: {
      fontSize: isLargeText ? 36 : 24,
      color: textColor,
    },
    icon: {
      color: iconColor,
    },
    content: {
      fontSize: isLargeText ? 24 : 16,
      color: textColor,
    },
    label: {
      fontSize: isLargeText ? 27 : 18,
      marginBottom: 8,
      color: textColor,
    },
    input: {
      height: isLargeText ? 55 : 40,
      borderColor: "#ccc",
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 8,
      color: textColor,
    },
    background: {
      backgroundColor: backgroundColor,
    },
    date: {
      fontSize: isLargeText ? 21 : 14,
    },
    appName: {
      fontSize: isLargeText ? 48 : 32,
      color: textColor,
    },
    subHeading: {
      fontSize: isLargeText ? 24 : 16,
      color: textColor,
    },
  });

  return styles;
}
