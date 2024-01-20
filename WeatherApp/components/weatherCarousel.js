import React from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import Swiper from "react-native-swiper";
import moment from "moment";
import "moment/locale/fr";

const WeatherCarousel = ({ nextDaysData }) => {
  moment.locale("fr");
  const groupedDayData = {};
  if (nextDaysData) {
    nextDaysData.list.forEach((day) => {
      const formattedDate = moment(day.dt_txt);
      const dayOfWeek = formattedDate.format("D MMMM");
      if (!groupedDayData[dayOfWeek]) {
        groupedDayData[dayOfWeek] = [];
      }
      groupedDayData[dayOfWeek].push(day);
    });
  }

  return (
    <View style={styles.container}>
      {nextDaysData && <View style={styles.background} />}
      {nextDaysData ? (
        <Swiper showsButtons={false} showsPagination={false} horizontal>
          {Object.keys(groupedDayData).map((dayOfWeek, index) => (
            <View style={styles.slide} key={index}>
              {dayOfWeek === Object.keys(groupedDayData)[0] ? (
                <Text style={styles.dateHeader}>Aujourd'hui</Text>
              ) : (
                <Text style={styles.dateHeader}>{dayOfWeek}</Text>
              )}
              <ScrollView style={styles.scroll}>
                {groupedDayData[dayOfWeek].map((interval, intervalIndex) => {
                  const formattedDate = moment(interval.dt_txt);
                  const timeOfDay = formattedDate.format("HH:mm");
                  return (
                    <View key={intervalIndex} style={styles.intervalsContainer}>
                      <View style={styles.horizontalLine} />
                      <View style={styles.timeAndTemp}>
                        <Text style={styles.time}>{timeOfDay} : </Text>
                        <Text style={styles.temperature}>
                          {interval.main.temp.toFixed(1)}°C
                        </Text>
                        <Image
                          source={{
                            uri: `https://openweathermap.org/img/wn/${interval.weather[0].icon}@2x.png`,
                          }}
                          style={styles.weatherIcon}
                        />
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          ))}
        </Swiper>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 400,
    height: 160,
  },
  background: {
    backgroundColor: "rgba(125, 125, 125, 0.3)",
    position: "absolute",
    left: "25%",
    height: 160,
    width: 200,
    borderRadius: 15,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timeAndTemp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  intervalsContainer: {
    marginTop: 10,
    alignContent: "center",
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "100%",
    marginBottom: 5,
  },
  weatherIcon: {
    width: 50,
    height: 50,
  },
  time: {
    fontSize: 16,
    marginRight: 5,
  },
  temperature: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default WeatherCarousel;
