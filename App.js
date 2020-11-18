import React from 'react';
import * as Location from 'expo-location';
import axios from "axios";
import Loading from "./Loading";
import Weather from './Weather';

const API_KEY = "8157ddc7c9d2155baf4f1763cececd65";

export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (lat, lon) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    this.setState({ isLoading: false, temp: data.main.temp });
  }
  getLocation = async () => {
    try { 
      await Location.requestPermissionsAsync();
      const { 
        coords: { latitude: lat , longitude: lon } 
      } = await Location.getCurrentPositionAsync();
      this.getWeather(lat, lon)
    } catch (error) {
      Alert.alert("Can't ifnd you");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp } = this.state;
    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)}/>
    );
  }
}