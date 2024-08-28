import { useDispatch, useSelector } from "react-redux"
import Navbar from "./Navbar"
import { getWeatherInfo } from "../../store/getWeatherSlice"
import Content from "./Content"
import React from "react"
import { allWeather } from "../../types/types"
interface stateInterface {
  weather: {
    data: allWeather
  }
}
const Header:React.FC = () => {
  const dispatch = useDispatch()
  const weatherInfo = useSelector((state:stateInterface) => state.weather.data)
  
  const changeWeatherHandler = (city:string) => {
    dispatch(getWeatherInfo(city))
  }
  return (
    <header className="header">
        <Navbar changeWeather={changeWeatherHandler}  timezone={weatherInfo?.weatherData.timezone_offset}/>
        { weatherInfo && 
          <Content
             weather={weatherInfo?.weatherData.current} 
             town={weatherInfo?.geoData?.local_names}
             timezone={weatherInfo?.weatherData.timezone_offset}
          />}
    </header>
  )
}

export default Header