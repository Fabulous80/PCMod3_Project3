import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";


function NotesScreen(){

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
