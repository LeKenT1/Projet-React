import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { requestLocationPermission, getCurrentLocation } from './services/locationService.js';
import { fetchWeatherData, fetchWeatherNextDaysData } from './services/apiService.js';
import WeatherDisplay from './components/weatherDisplay.js';
import WeatherCarousel from './components/weatherCarousel.js';
import Background from './components/background.js';

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [nextDaysData, setNextDaysData] = useState(null);

  useEffect(() => {
    const onStart = async () => {
      try {
        requestLocationPermission();
        const { latitude, longitude } = await getCurrentLocation();
        const data = await fetchWeatherData(latitude, longitude);
        const nextDaysData = await fetchWeatherNextDaysData(latitude, longitude);
        setWeatherData(data);
        setNextDaysData(nextDaysData)
      } catch (error) {
        console.error('Error on start:', error);
      }
    };
    onStart();
  }, []);
  

  return (
    <View style={styles.container}>
      <Background weatherData={weatherData} />
      <WeatherDisplay weatherData={weatherData} />
      <WeatherCarousel nextDaysData={nextDaysData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default WeatherApp;
