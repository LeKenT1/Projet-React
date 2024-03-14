import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>{strDrink}</Text>
      <Text style={styles.subtitle}>Catégorie : {strCategory}</Text>
      <Text style={styles.subtitle}>Verre : {strGlass}</Text>
      <Text style={styles.subtitle}>Ingrédients :</Text>
      {ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.ingredient}>{ingredient}</Text>
      ))}
      <Text style={styles.instructions}>Instructions : {strInstructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 3,
  },
  instructions: {
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default DetailsScreen;
