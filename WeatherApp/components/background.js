import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";

const Background = ({ weatherData }) => {
  const getImageSource = (weatherCondition) => {
    // weatherCondition = '10n';
    switch (weatherCondition) {
      //day
      case "01d":
        return require("./pictures/clear_sky.jpg");
      case "02d":
        return require("./pictures/few_clouds.jpg");
      case "03d":
      case "04d":
        return require("./pictures/cloudy_sky.jpg");
      case "09d":
      case "10d":
        return require("./pictures/rain.jpg");
      case "11d":
        return require("./pictures/thunderstorm.jpg");
      case "13d":
        return require("./pictures/snow.jpg");
      case "50d":
        return require("./pictures/mist.jpg");
      //night
      case "01n":
        return require("./pictures/clear_sky.jpg");
      case "02n":
        return require("./pictures/few_clouds.jpg");
      case "03n":
      case "04n":
        return require("./pictures/cloudy_sky.jpg");
      case "09n":
      case "10n":
        return require("./pictures/n_rain.jpg");
      case "11n":
        return require("./pictures/thunderstorm.jpg");
      case "13n":
        return require("./pictures/snow.jpg");
      case "50n":
        return require("./pictures/mist.jpg");
      default:
        return require("./pictures/clear_sky.jpg");
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
