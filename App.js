import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Ionicons} from "@expo/vector-icons";


function NotesScreen({navigation}){

  useEffect (()=>{
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={addNote}>
          <Ionicons
            name="create"
            size={35}
            color="#000080"
            style={{ marginRight:15 }}
          />
        </TouchableOpacity>
      )
    })
  })

  function addNote() {
    console.log("Add Note")
  }

  return (
    <View style={styles.container}>
       <Text>Open up App.js to start working on your app!</Text>
       <StatusBar style="auto" />
    </View>
  )
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
            headerTintColor:"#000080",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 30,
            },
            headerStyle: {
              height: 120,
              backgroundColor: "yellow",
              borderBottomColor: "#ccc",
              borderBottomWidth: 1,
              shadowColor:"black",
              shadowOpacity:0.2,
              shadowRadius:5,

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
    backgroundColor: '#ffc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
