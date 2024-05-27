import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { getToken, SERVER_URL } from "../service/AuthService";
import { GlobalStyles } from "../components/style";
import moment from "moment";

//Note detail screen
const NoteDetailScreen = ({ route, navigation }) => {
  const { noteId } = route.params;
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isInitialFetch, setInitialFetch] = useState(true);
  const globalStyles = GlobalStyles();

  //Fetch the specific note when user pressed from Home Screen
  useEffect(() => {
    const fetchNote = async () => {
      const token = await getToken();
      const response = await fetch(`${SERVER_URL}/api/notes/${noteId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNote(data);
      setTitle(data.title);
      setContent(data.content);
      //Set initial fetch false as the note has been fetched
      setInitialFetch(false);
    };
    fetchNote();
  }, [noteId]);


  //Update the notes into the database whenever title or content is changed
  useEffect(() => {
    //If its first fetch then don't execeut
    if (isInitialFetch) return;
    const updateNote = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`${SERVER_URL}/api/notes/${noteId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });
        if (!response.ok) {
          throw new Error("Failed to update note");
        }
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    };
    const timeoutId = setTimeout(updateNote, 500);
    return () => clearTimeout(timeoutId);
  }, [title, content]);

  //Handle delete function
  const handleDelete = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${SERVER_URL}/api/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      Alert.alert("Success", "Note deleted successfully");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  // If there's no note loaded, display loading instead
  if (!note) {
    return (
      <View style={[styles.container, globalStyles.background]}>
        <Text style={globalStyles.content}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, globalStyles.background]}>
      <ScrollView>
        {/*Display date*/}
        <Text style={[styles.date, globalStyles.date]}>
          Created on: {moment(note.created_at).format("YYYY-MM-DD")}
        </Text>
        {/*Display Title, if title is deleted there's placeholder*/}
        <TextInput
          style={[globalStyles.title, styles.titleSpace]}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter title"
        />
        {/*Display content, if content is deleted there's placeholder*/}
        <TextInput
          style={globalStyles.content}
          value={content}
          onChangeText={setContent}
          placeholder="Enter content"
          multiline
        />
      </ScrollView>
      {/*Delete note button*/}
      <View style={[styles.footer, globalStyles.background]}>
        <Button title="Delete Note" onPress={handleDelete} color="#dd3439" />
      </View>
    </View>
  );
};

//Local style
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titleSpace: {
    marginBottom: 16,
  },
  date: {
    color: "#888",
    marginBottom: 16,
  },
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

export default NoteDetailScreen;
