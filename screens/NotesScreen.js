import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

const db = SQLite.openDatabase("notes.db");
console.log(FileSystem.documentDirectory);

export default function NotesScreen({ navigation, route }) {
  const [notes, setNotes] = useState([]);

  function refreshNotes() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM notes",
        null,
        (txObj, { rows: { _array } }) => setNotes(_array),
        (txObj, error) => console.log(`Error, ${error}`)
      );
    });
  }

  // setup database
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS notes
            (id INTEGER PRIMARY KEY AUTOINCREMENT,
              title TEXT,
              done INT)
            `
        );
      },
      null,
      refreshNotes
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="create"
            size={35}
            color="#000080"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    if (route.params?.text) {
      db.transaction(
        (tx) => {
          tx.executeSql("INSERT INTO notes (done, title) VALUES (0, ?)", [
            route.params.text,
          ]);
        },
        null,
        refreshNotes
      );
    }
  }, [route.params?.text]);

  function addNote() {
    //  const newNote = {
    //    title: "Sample new note",
    //    done: false,
    //    id: notes.length.toString(),
    //  };
    //  setNotes([...notes, newNote]);
    navigation.navigate("Add Note");
  }

  function deleteNote(id) {
    db.transaction(
      (tx) => {
        tx.executeSql("DELETE FROM notes where id=?", [id], (tx, results) => {
          console.log("Results", results.rowsAffected);
          if (results.rowsAffected > 0) {
            alert("Task Deleted");
          }
        });
      },
      null,
      refreshNotes
    );
  }

  function renderItem({ item }) {
    return (
      <View
        style={{
          padding: 10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ textAlign: "left", fontSize: 16 }}> {item.title} </Text>

        <TouchableOpacity onPress={() => taskDone(item.id)}>
          <Ionicons
            name="checkmark-circle-outline"
            size={19}
            color="#000080"
            style={{ marginLeft: 200 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Ionicons
            name="trash"
            size={19}
            color="#000080"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc",
    alignItems: "center",
    justifyContent: "center",
  },
});
