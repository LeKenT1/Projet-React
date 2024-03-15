import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const ListCocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  // Chargez les favoris sauvegardés lors du montage initial
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('favorites');
        if (savedFavorites !== null) {
          setFavorites(JSON.parse(savedFavorites));
        }
      } catch (error) {
        console.error('Erreur lors du chargement des favoris :', error);
      }
    };

    loadFavorites();
  }, []);

  // Sauvegardez les favoris dès qu'ils changent
  useEffect(() => {
    const saveFavorites = async () => {
      try {
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Erreur lors de la sauvegarde des favoris :', error);
      }
    };

    saveFavorites();
  }, [favorites]);

  useEffect(() => {
    const fetchCocktails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail`);
        const newCocktails = response.data.drinks || [];
        setCocktails(prevCocktails => [...prevCocktails, ...newCocktails]);
      } catch (error) {
        console.error('Erreur lors de la récupération des cocktails :', error);
      }
      setLoading(false);
      setLoadingData(false); // Arrête l'animation une fois les données chargées
    };

    fetchCocktails();
  }, [page]);

  const toggleFavorite = (item) => {
    if (favorites.some(cocktail => cocktail.idDrink === item.idDrink)) {
      setFavorites(prevFavorites => prevFavorites.filter(cocktail => cocktail.idDrink !== item.idDrink));
    } else {
      setFavorites(prevFavorites => [...prevFavorites, item]);
    }
  };

  const goToDetails = async (item) => {
    try {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`);
      const cocktailDetails = response.data.drinks && response.data.drinks[0];
      navigation.navigate('Details', { cocktailDetails });
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du cocktail :', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => goToDetails(item)}>
        <View style={styles.item}>
          <Image
            source={{ uri: item.strDrinkThumb }}
            style={styles.image}
          />
          <Text style={styles.text}>{item.strDrink}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFavorite(item)}>
        <Text style={styles.favorite}>{favorites.some(cocktail => cocktail.idDrink === item.idDrink) ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {loadingData ? (
        <LottieView
          source={require('../media/loader.json')} 
          autoPlay
          loop
        />
      ) : (
        <FlatList
          data={cocktails}
          renderItem={renderItem}
          keyExtractor={(item) => item.idDrink}
          contentContainerStyle={styles.listContainer}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9C4',
  },
  listContainer: {
    paddingHorizontal: 16, // Marge horizontale pour les cartes
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  favorite: {
    fontSize: 20,
    marginRight: 10,
  },
});

export default ListCocktail;
