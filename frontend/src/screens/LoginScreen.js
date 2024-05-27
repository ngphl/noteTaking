import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { login } from "../service/AuthService";
import { useTheme } from "../components/theme";
import { GlobalStyles } from "../components/style";

//Login screen
const LoginScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const globalStyles = GlobalStyles();
  const { darkMode } = useTheme();

  //Handle Login functionalities
  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  //Darkmode color
  const placeholderColor = darkMode ? "#bbb" : "#888";

  return (
    <View style={[styles.container, globalStyles.background]}>
      {/*Username input*/}
      <Text style={globalStyles.label}>Username</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.content]}
        value={username}
        onChangeText={setUserName}
        placeholder="Enter username"
        placeholderTextColor={placeholderColor}
      />
      {/*Password input*/}
      <Text style={globalStyles.label}>Password</Text>
      <TextInput
        style={[globalStyles.input, globalStyles.content]}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        placeholderTextColor={placeholderColor}
        secureTextEntry={true}
      />
      {/*Login button*/}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//Local style
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

export default LoginScreen;
