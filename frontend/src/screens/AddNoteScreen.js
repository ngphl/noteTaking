import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { getToken, SERVER_URL } from "../service/AuthService";
import { GlobalStyles } from "../components/style";
import { useTheme } from "../components/theme";

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { darkMode } = useTheme();
  const globalStyles = GlobalStyles();

  //Check if note has empty value
  const handleAddNote = async () => {
    if (!title || !content) {
      Alert.alert("Note Error", "Title and content must not be empty");
      return;
    }
    try {
      //Send POST request
      const token = await getToken();
      const response = await fetch(`${SERVER_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      Alert.alert("Success", "Note added successfully");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  //Check darkmode and change color accordingly
  const placeholderColor = darkMode ? "#bbb" : "#888";

  return (
    <View style={[styles.container, globalStyles.background]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/*Title input*/}
        <TextInput
          style={[styles.titleSpace, globalStyles.title]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
          placeholderTextColor={placeholderColor}
        />
        {/*Content input*/}
        <TextInput
          style={[styles.contentSpace, globalStyles.content]}
          value={content}
          onChangeText={setContent}
          placeholder="Enter Content"
          placeholderTextColor={placeholderColor}
          multiline
        />
      </ScrollView>
      {/*Add note button*/}
      <View style={[styles.footer, globalStyles.background]}>
        <Button
          title="Add Note"
          onPress={handleAddNote}
          style={globalStyles.icon}
        />
      </View>
    </View>
  );
};

//Local style
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  scrollContent: { flexGrow: 1 },
  titleSpace: {
    marginBottom: 16,
  },
  contentSpace: { marginBottom: 16 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
});

export default AddNoteScreen;
