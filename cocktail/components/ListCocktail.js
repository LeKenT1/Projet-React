import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ListCocktail = () => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

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

  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
      <Image
        source={{ uri: item.strDrinkThumb }}
        style={{ width: 50, height: 50, marginRight: 10 }}
      />
      <Text>{item.strDrink}</Text>
    </View>
  );

//   const handleLoadMore = () => {
//     if (!loading) {
//       setPage(prevPage => prevPage + 1);
//     }
//   };

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
