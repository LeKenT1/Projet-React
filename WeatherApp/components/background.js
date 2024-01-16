import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const Background = ({ weatherData }) => {
  const getImageSource = (weatherCondition) => {
    switch (weatherCondition) {
      case '01d':
        return require('./pictures/clear_sky.jpg');
      case '02d':
        return require('./pictures/few_clouds.jpg');
      case '03d' || '04d':
        return require('./pictures/cloudy_sky.jpg')
      case '09d' || '10d':
        return require('./pictures/rain.jpg');
      case '11d':
        return require('./pictures/thunderstorm.jpg');
      case '13d':
        return require('./pictures/snow.jpg');
      case '50d':
        return require('./pictures/mist.jpg');
      default:
        return require('./pictures/clear_sky.jpg');
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default Background;
