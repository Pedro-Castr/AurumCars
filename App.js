//importações referentes a navegação e as telas
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Home/index";
import AddCarro from "./src/AddCarro/index";
import EditTask from "./src/EditTask/index";

//definição do Stack
const Stack = createStackNavigator();

//função principal e tela inicial
export default function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: "#0D0D0D",
            headerStyle: {
              backgroundColor: "#D4AF37",
            },
          }}
        />

        <Stack.Screen
          name="AddCarro"
          component={AddCarro}
          options={{
            headerTintColor: "#0D0D0D",
            headerStyle: {
              backgroundColor: "#D4AF37",
            },
          }}
        />

        <Stack.Screen
          name="Edit Task"
          component={EditTask}
          options={{
            headerTintColor: "#0D0D0D",
            headerStyle: {
              backgroundColor: "#D4AF37",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
