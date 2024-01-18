import React from "react";
import { View, Image, Text, StyleSheet, ActivityIndicator } from "react-native";

const WeatherDisplay = ({ weatherData }) => {
  return (
    <View style={styles.weatherContainer}>
      {weatherData ? (
        <View style={styles.weatherInfoContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temperature}>{weatherData.main.temp.toFixed(1)} °C</Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.weatherInfo}>
              {weatherData.weather[0].description}
            </Text>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
              }}
              style={styles.weatherIcon}
            />
          </View>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={100} color="gray" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  weatherInfoContainer: {
    alignItems: "center",
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 40,
    marginBottom: 5,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherInfo: {
    fontSize: 18,
    marginRight: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 100,
  },
  loadingText: {
    fontSize: 18,
    color: "gray",
  },
});

export default WeatherDisplay;
