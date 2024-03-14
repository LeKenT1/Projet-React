import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const FavoriteCocktail = ({ favorites }) => {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: item.strDrinkThumb }}
          style={{ width: 50, height: 50, marginRight: 10 }}
        />
        <Text>{item.strDrink}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.idDrink}
      />
    </View>
  );
};

export default FavoriteCocktail;
