import * as Location from 'expo-location';

export const requestLocationPermission = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    throw error;
  }
};

export const getCurrentLocation = async () => {
  try {
    const { coords } = await Location.getCurrentPositionAsync({});
    return coords;
  } catch (error) {
    console.error('Error getting current location:', error);
    throw error;
  }
};