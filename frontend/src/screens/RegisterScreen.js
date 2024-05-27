import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { register } from "../service/AuthService";
import { GlobalStyles } from "../components/style";
import { useTheme } from "../components/theme";

const RegisterScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const globalStyles = GlobalStyles();
  const { darkMode } = useTheme();

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert(
        "Validation Error",
        "Username and password must not be empty"
      );
      return;
    }

    try {
      const data = await register(username, password);
      Alert.alert("Success", "Registration Successful");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const placeholderColor = darkMode ? "#bbb" : "#888";

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Text style={globalStyles.label}>Username</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.content]}
        value={username}
        onChangeText={setUserName}
        placeholder="Enter username"
        placeholderTextColor={placeholderColor}
      />
      <Text style={globalStyles.label}>Password</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.content]}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        placeholderTextColor={placeholderColor}
        secureTextEntry
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
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
});

export default RegisterScreen;
