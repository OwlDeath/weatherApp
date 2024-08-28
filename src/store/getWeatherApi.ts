import axios, { AxiosResponse } from "axios";
const API_GEO_URL:string = 'https://api.openweathermap.org/geo/1.0/direct?'
const API_KEY:string = 'fc59ec0ddc4cf16e8b62eab581ff4387'
const API_WEATHER_URL:string = `https://api.openweathermap.org/data/2.8/onecall?exclude=hourly,minutely,alerts&appid=${API_KEY}&units=metric&lang=ru`
import { weatherData,geoData } from "../types/types";
export const getWeatherData = async (city:string) => {
    try {
        const geoResponse = await axios.get(`
            ${API_GEO_URL}q=${city}&appid=${API_KEY}
        `)
        const geoInfo:geoData = geoResponse.data[0]
        if(geoInfo){
          const {lat, lon} = geoInfo
          const weatherResponse = await axios.get(`
                ${API_WEATHER_URL}&lat=${lat}&lon=${lon}
          `)
          const weatherInfo:weatherData = weatherResponse.data
          
          return {
            geoData: geoInfo,
            weatherData: weatherInfo
          }
        }
    } catch (error) {
        console.error(error);
    }
}