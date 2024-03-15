import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteCocktail = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const favoritesString = await AsyncStorage.getItem("favorites");
      const favoritesArray = favoritesString ? JSON.parse(favoritesString) : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", { cocktailDetails: item })}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.strDrinkThumb }} style={styles.image} />
        <View style={styles.titleHeartContainer}>
          <Text style={styles.text}>{item.strDrink}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(item)}>
            <Text style={styles.favorite}>
              {favorites.some((cocktail) => cocktail.idDrink === item.idDrink)
                ? "❤️"
                : ""}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.idDrink}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.noFavoritesText}>Aucun favori pour le moment</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9C4",
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  titleHeartContainer: {
    marginTop: 5,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favorite: {
    marginLeft: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoriteCocktail;
