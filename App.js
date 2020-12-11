import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";


const DB = SQLite.openDatabase("notes.db");

function NotesScreen({ navigation }) {

  const [notes, setNotes] = useState([
    {title: "Walk the dog", done: false, id:"0"},
    {title: "Buy Eggs from Supermarket", done: false, id:"1"},
  ]);

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

  function addNote() {
   let newNote = {
     title: "Sample new note",
     done: false,
     id: notes.length.toString(),
   };
   setNotes([...notes, newNote]);
  }

  function renderItem({ item }){
    return (
      <View 
        style={{
          padding:10,
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomColor: "#ccc",
          borderBottomWidth: 1,
        }}
        >
          <Text style={{ textAlign:"left", fontSize:16 }}> {item.title} </Text>
        </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
       style={{ width: "100%"}}
       data={notes}
       renderItem={renderItem}
       />
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            headerTitle: "Notes, a ToDo App",
            headerTintColor: "#000080",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
            headerStyle: {
              height: 120,
              backgroundColor: "yellow",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowRadius: 5,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
