import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./components/HomeScreen";
import FavoriteCocktail from "./components/FavoriteCocktail";
import FavoriteCocktailsProvider from "./store/favoriteCocktail"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <FavoriteCocktailsProvider> */}
        <Tab.Navigator>
          <Tab.Screen name="Accueil" component={HomeScreen} />
          <Tab.Screen name="Favoris" component={FavoriteCocktail} />
        </Tab.Navigator>
      {/* </FavoriteCocktailsProvider> */}
    </NavigationContainer>
  );
}
