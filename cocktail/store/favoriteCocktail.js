import React, { createContext, useContext, useReducer } from 'react';

// Actions
const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// Reducer
const favoriteCocktailsReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      if (state.some(cocktail => cocktail.idDrink === action.payload.idDrink)) {
        // Retirer le cocktail des favoris s'il y est déjà
        return state.filter(cocktail => cocktail.idDrink !== action.payload.idDrink);
      } else {
        // Ajouter le cocktail aux favoris
        return [...state, action.payload];
      }
    default:
      return state;
  }
};

// Context
const FavoriteCocktailsContext = createContext();

// Provider
export const FavoriteCocktailsProvider = ({ children }) => {
  const [favoriteCocktails, dispatch] = useReducer(favoriteCocktailsReducer, []);

  return (
    <FavoriteCocktailsContext.Provider value={{ favoriteCocktails, dispatch }}>
      {children}
    </FavoriteCocktailsContext.Provider>
  );
};

// Custom hook for using favorite cocktails context
export const useFavoriteCocktails = () => {
  return useContext(FavoriteCocktailsContext);
};
