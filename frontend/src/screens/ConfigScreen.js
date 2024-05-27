import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../components/theme";
import { GlobalStyles } from "../components/style";
import { GlobalLayout } from "../components/Layout";

const ConfigScreen = () => {
  const { isLargeText, setIsLargeText } = useTheme();
  const { darkMode, setDarkMode } = useTheme();
  const globalStyles = GlobalStyles();

  return (
    <GlobalLayout>
      <View style={styles.view}>
        <Switch
          value={isLargeText}
          onValueChange={async () => {
            await AsyncStorage.setItem(
              "isLargeText",
              JSON.stringify(!isLargeText)
            );
            setIsLargeText(!isLargeText);
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
        <Text style={globalStyles.content}>Large Text</Text>
      </View>
      <View style={styles.view}>
        <Switch
          value={darkMode}
          onValueChange={async () => {
            await AsyncStorage.setItem("darkMode", JSON.stringify(!darkMode));
            setDarkMode(!darkMode);
          }}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
        />
        <Text style={globalStyles.content}>Dark Mode</Text>
      </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ConfigScreen;
