import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getToken, SERVER_URL } from "../service/AuthService";
import { GlobalStyles } from "../components/style";

//User screen
const UserScreen = ({ navigation }) => {
  const [user, setUser] = useState({});
  const globalStyles = GlobalStyles();

  //Fetch user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${SERVER_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to retrieve user");
        }
        const data = await response.json();
        // Exclude password and format dates
        const formattedData = {
          username: data.username,
          created_at: formatDate(data.created_at),
          updated_at: formatDate(data.updated_at),
        };
        setUser(formattedData);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };

    fetchUser();
  }, []);

  //Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Text style={[globalStyles.title, styles.title]}>Information</Text>
      {/*Display username*/}
      <Text style={globalStyles.label}>Username: {user.username}</Text>
      {/*Display date created*/}
      <Text style={globalStyles.label}>Created At: {user.created_at}</Text>
      {/*Display date updated*/}
      <Text style={globalStyles.label}>Updated At: {user.updated_at}</Text>
    </View>
  );
};

//Local styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default UserScreen;
