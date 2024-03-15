import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const DetailsScreen = ({ route }) => {
  const { cocktailDetails } = route.params;

  if (!cocktailDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aucun détail disponible</Text>
      </View>
    );
  }

  const { strDrink, strCategory, strGlass, strInstructions } = cocktailDetails;
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktailDetails[`strIngredient${i}`];
    const measure = cocktailDetails[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${ingredient} - ${measure}`);
    } else {
      break;
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{strDrink}</Text>
        <Text style={styles.subtitle}>
          <Text style={styles.boldText}>Catégorie :</Text> {strCategory}
        </Text>
        <Text style={styles.subtitle}>
          <Text style={styles.boldText}>Verre :</Text> {strGlass}
        </Text>
        <Text style={styles.instructions}>Ingrédients :</Text>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            {ingredient}
          </Text>
        ))}
        <Text style={styles.instructions}>Instructions :</Text>
        <Text style={styles.instructionsText}>{strInstructions}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: "#FFF9C4",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  boldText: {
    fontWeight: 'bold',
  },  
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
    color: "#666",
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: "center",
    color: "#666",
  },
  instructions: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  instructionsText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default DetailsScreen;
