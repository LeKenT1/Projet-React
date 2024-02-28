import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

const Background = ({ weatherData }) => {
  const getImageSource = (weatherCondition) => {
    switch (weatherCondition) {
      //day
      case "01d":
        return require("./pictures/day/clear_sky.jpg");
      case "02d":
        return require("./pictures/day/few_clouds.jpg");
      case "03d":
      case "04d":
        return require("./pictures/day/cloudy_sky.jpg");
      case "09d":
      case "10d":
        return require("./pictures/day/rain.jpg");
      case "11d":
        return require("./pictures/day/thunderstorm.jpg");
      case "13d":
        return require("./pictures/day/snow.jpg");
      case "50d":
        return require("./pictures/day/mist.jpg");
      //night
      case "01n":
        return require("./pictures/night/clear_sky.jpg");
      case "02n":
        return require("./pictures/night/few_clouds.jpg");
      case "03n":
      case "04n":
        return require("./pictures/night/cloudy_sky.jpg");
      case "09n":
      case "10n":
        return require("./pictures/night/rain.jpg");
      case "11n":
        return require("./pictures/night/thunderstorm.jpg");
      case "13n":
        return require("./pictures/night/snow.jpg");
      case "50n":
        return require("./pictures/night/mist.jpg");
      default:
        return require("./pictures/day/clear_sky.jpg");
    }
  };

  return (
    <View style={styles.backgroundContainer}>
      {weatherData && (
        <ImageBackground
          source={getImageSource(weatherData.weather[0].icon)}
          style={styles.backgroundImage}
          resizeMode="cover"
          repeat
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default Background;
