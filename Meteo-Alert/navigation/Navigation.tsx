import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Demo from "../pages/Demo";

import Connexion from "../pages/Connexion";
import Inscription from "../pages/Inscription";
import Accueil from "../pages/Accueil";
import DetailLieu from "../pages/DetailLieu";
import RechercheLieu from "../pages/RechercheLieu";

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Demo" component={Demo} options={{ headerShown: false }} />
        <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
        <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }} />
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="RechercheLieu" component={RechercheLieu} options={{ headerShown: false }} />
        <Stack.Screen name="DetailLieu" component={DetailLieu} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
