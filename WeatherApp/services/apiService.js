import axios from 'axios';

const API_KEY = '3f96fe07647b1dd813cb193cc9d03751';

export const fetchWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather data:', error);
    throw error;
  }
};

export const fetchWeatherNextDaysData = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=fr`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching next days weather data:', error);
    throw error;
  }
};