import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getToken, SERVER_URL } from "../service/AuthService";
import { Ionicons } from "@expo/vector-icons";
import { GlobalLayout } from "../components/Layout";
import { GlobalStyles } from "../components/style";
import moment from "moment";

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const globalStyles = GlobalStyles();

  const fetchNotes = async () => {
    const token = await getToken();
    const response = await fetch(`${SERVER_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setNotes(data);

  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  return (
    <GlobalLayout>
      <View style={[styles.header, globalStyles.background]}>
        <Text style={globalStyles.title}>Note</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddNote")}
          style={styles.iconWrapper}
        >
          <Ionicons name="create-outline" size={30} style={globalStyles.icon} />
        </TouchableOpacity>
      </View>
      <View style={[styles.container, globalStyles.background]}>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.note}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("NoteDetail", { noteId: item.id })
                }
              >
                <Text style={[styles.date, globalStyles.date]}>
                  {moment(item.created_at).format("YYYY-MM-DD")}
                </Text>
                <Text style={[styles.titleSpace, globalStyles.title]}>
                  {item.title}
                </Text>
                <Text style={globalStyles.content}>{item.content}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </GlobalLayout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  iconWrapper: {
    padding: 5,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  titleSpace: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5, // Adjusted to provide space for the date
  },
  note: {
    padding: 12,
    borderBottomWidth: 1.5,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  date: {
    color: "#888", // Added for date spacing
  },
});

export default HomeScreen;
