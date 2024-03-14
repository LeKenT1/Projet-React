import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ListCocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

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
    };

    fetchCocktails();
  }, [page]);

  const toggleFavorite = (item) => {
    if (favorites.some(cocktail => cocktail.idDrink === item.idDrink)) {
      // Retirer le cocktail des favoris s'il y est déjà
      setFavorites(prevFavorites => prevFavorites.filter(cocktail => cocktail.idDrink !== item.idDrink));
    } else {
      // Ajouter le cocktail aux favoris
      setFavorites(prevFavorites => [...prevFavorites, item]);
    }
  };

//   const handleLoadMore = () => {
//     if (!loading) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };

const goToDetails = async (item) => {
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`);
    const cocktailDetails = response.data.drinks && response.data.drinks[0];
    // Naviguer vers la page de détails en passant les détails du cocktail comme paramètre
    navigation.navigate('Details', { cocktailDetails });
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du cocktail :', error);
  }
};

// const toggleFavorite = (item) => {
//   dispatch({ type: 'TOGGLE_FAVORITE', payload: item });
// };

const renderItem = ({ item }) => (
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
    <TouchableOpacity onPress={() => goToDetails(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ width: 50, height: 50, marginRight: 10 }}
          />
        <Text>{item.strDrink}</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => toggleFavorite(item)}>
      <Text style={{marginRight: 10}}>{favorites.some(cocktail => cocktail.idDrink === item.idDrink) ? '❤️' : '♡'}</Text>
    </TouchableOpacity>
  </View>
);



  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={cocktails}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
        // onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  );
};

export default ListCocktail;
