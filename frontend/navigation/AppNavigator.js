import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../src/screens/SplashScreen";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import HomeScreen from "../src/screens/HomeScreen";
import AddNoteScreen from "../src/screens/AddNoteScreen";
import NoteDetailScreen from "../src/screens/NoteDetailScreen";
import SettingScreen from "../src/screens/SettingScreen";
import AboutScreen from "../src/screens/AboutScreen";
import UserScreen from "../src/screens/UserScreen";
import ConfigScreen from "../src/screens/ConfigScreen";
import { ThemeProvider, useTheme } from "../src/components/theme";
import { GlobalStyles } from "../src/components/style";
import { FontAwesome5 } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  const { darkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "book-open";
          } else if (route.name === "Settings") {
            iconName = "user-cog";
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: darkMode ? "#a688fa" : "#5e43f3", // Active icon color
        tabBarInactiveTintColor: darkMode ? "#888" : "#888", // Inactive icon color
        tabBarStyle: {
          backgroundColor: darkMode ? "#282828" : "#fff", // Tab bar background color
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { darkMode } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: {
          backgroundColor: darkMode ? "#282828" : "#fff",
        },
        headerTintColor: darkMode ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="AddNote"
        component={AddNoteScreen}
        options={{ title: "Add Note" }}
      />
      <Stack.Screen
        name="NoteDetail"
        component={NoteDetailScreen}
        options={{ title: false }}
      />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ title: false }}
      />
      <Stack.Screen name="Config" component={ConfigScreen} />
    </Stack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default AppNavigator;
