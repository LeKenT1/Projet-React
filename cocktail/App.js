import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./components/HomeScreen";
import FavoriteCocktail from "./components/FavoriteCocktail";
import FavoriteCocktailsProvider from "./store/dataFavoriteCocktail";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            } else if (route.name === 'Favoris') {
              iconName = focused ? 'heart' : 'heart-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            display: 'flex',
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Favoris" component={FavoriteCocktail} initialParams={{ initialData: 'Initial data' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
