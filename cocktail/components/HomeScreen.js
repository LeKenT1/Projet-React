import { View, Text } from "react-native";
import ListCocktail from "./ListCocktail";

export default function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ListCocktail/>
      </View>
    );
  }