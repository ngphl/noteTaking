import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalStyles } from "../components/style";

const SplashScreen = ({ navigation }) => {
  const globalStyles = GlobalStyles();
  useEffect(() => {
    const checkAuth = async () => {
      // Check if a token is stored in AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.replace("Main"); // If token is found, navigate to Main screen
      }
    };
    checkAuth();
  }, [navigation]);

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Text style={[styles.appName, globalStyles.appName]}>Note Taking</Text>
      <Text style={[styles.subHeading, globalStyles.subHeading]}>
        Made by Long Nguyen
      </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.buttonText}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  appName: {
    marginBottom: 10,
  },
  subHeading: {
    marginBottom: 50, // Adjust as needed
  },
  buttonsContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#444", // Slightly dark grey color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10, // Slightly rounded edges
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 18,
  },
  loader: {
    marginTop: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    color: "#000",
  },
});

export default SplashScreen;
