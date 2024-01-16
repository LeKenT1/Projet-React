import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Swiper from 'react-native-swiper';

const WeatherCarousel = ({ nextDaysData }) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} showsPagination={false} horizontal>
      {nextDaysData ? (
        // nextDaysData.map((day, index) => (
        //   <View style={styles.slide} key={index}>
        //     <Text style={styles.date}>{day.dt_txt}</Text>
        //     <Text style={styles.temperature}>{day.main.temp}°C</Text>
        //     <Text style={styles.time}>{day.dt_txt.split(' ')[1]}</Text>
        //   </View>
        // ))
        <View></View>
      ) : (
        <View style={styles.slide}>
          <Text style={styles.date}>No data available</Text>
        </View>
      )}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  time: {
    fontSize: 16,
  },
});

export default WeatherCarousel;
