import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./src/Home/index";
import AddCarro from "./src/AddCarro/index";
import EditCarro from "./src/EditCarro/index";
import Login from "./src/Login/index";
import Sobre from "./src/Sobre";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Navegação em gaveta (Drawer)
function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#D4AF37" },
        headerTintColor: "#0D0D0D",
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Adicionar Carro" component={AddCarro} />
      <Drawer.Screen name="Sobre" component={Sobre} />
    </Drawer.Navigator>
  );
}

// App principal com Stack + Drawer
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} />
        <Stack.Screen name="Editar Carro" component={EditCarro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
