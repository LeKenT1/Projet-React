import { View, Text } from "react-native";
import ListCocktail from "./ListCocktail";
import DetailsCocktail from "./DetailsCocktail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Liste des cocktails" component={ListCocktail} />
      <Stack.Screen name="Details" component={DetailsCocktail} />
    </Stack.Navigator>
  );
}
