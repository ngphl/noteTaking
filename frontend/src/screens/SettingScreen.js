import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { logout } from "../service/AuthService";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../components/style";

//Setting screen consist of Configuration/AccountInformation/About and Logout
const SettingScreen = ({ navigation }) => {
  const globalStyles = GlobalStyles();

  //Handle Logout functionality
  const handleLogout = async () => {
    await logout();
    navigation.replace("Splash");
  };

  return (
    <GlobalLayout>
      <Text style={[globalStyles.title, styles.header]}>Setting</Text>
      <View style={globalStyles.background}>
        {/*Configuration button*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Config")}
        >
          <Text style={styles.buttonText}>Configuration</Text>
        </TouchableOpacity>
        {/*Account information button*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("User")}
        >
          <Text style={styles.buttonText}>Account Information</Text>
        </TouchableOpacity>
        {/*About screen button*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("About")}
        >
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        {/*Logout button*/}
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </GlobalLayout>
  );
};

//Local style
const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    margin: 15,
  },
  button: {
    backgroundColor: "#575757", // Slightly dark grey color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10, // Slightly rounded edges
    marginVertical: 5,
    alignItems: "center",
    width: "80%",
    alignSelf: "center", // Center the buttons
  },
  buttonText: {
    color: "#fff", // White text color
    fontSize: 16,
  },
});

export default SettingScreen;
