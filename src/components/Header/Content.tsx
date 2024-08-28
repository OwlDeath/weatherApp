import temp from '../../assets/images/temp.svg'
import wind from '../../assets/images/wind.svg'
import humidity from '../../assets/images/yomgir.svg'
import press from '../../assets/images/davleniya.dec.svg'
import snowy from '../../assets/images/snowy-6.svg'
import clear from '../../assets/images/day.svg'
import night from '../../assets/images/night.svg'
import rainy from '../../assets/images/rainy-6.svg'
import thunder from '../../assets/images/thunder.svg'
import cloudy from '../../assets/images/cloudy.svg'
import React from 'react'
import { current } from '../../types/types'
interface contentProps {
  weather: current,
  town: { ru: string, en: string },
  timezone: number
}
const Content: React.FC<contentProps> = ({ weather, town, timezone }) => {
  function getWeatherIcon(main: string, timezone: number) {
    const date = new Date(new Date().getTime() + timezone * 1000)
    if (main === 'Clear') {
      if (date.getUTCHours() < 6) {
        return night
      } else if (date.getUTCHours() < 18) {
        return clear
      } else return night
    }
    else if (main === 'Snow') return snowy
    else if (main === 'Drizzle' || main === 'Rain') return rainy
    else if (main === 'Thunderstorm') return thunder
    else if (main === 'Clouds') return cloudy
    else return `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`
  }
  function getDate(timezone: number) {
    const date = new Date(new Date().getTime() + timezone * 1000)
    const hours = ('0' + date.getUTCHours()).slice(-2)
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    return `${hours}:${minutes}`
  }
  function pressureLvl(press: number) {
    if (press < 760) {
      return 'пониженное'
    } else if (press === 760) {
      return 'нормальное'
    } else {
      return 'повышенное'
    }
  }
  function windStr(speed: number) {
    if (speed <= 5) {
      return 'лёгкий'
    } else if (speed < 11) {
      return 'средний'
    } else {
      return 'сильный'
    }
  }
  function windDeg(deg: number) {
    if (deg === 0) {
      return 'север'
    } else if (deg < 45) {
      return 'северо-восток'
    } else if (deg <= 90) {
      return 'восток'
    } else if (deg < 135) {
      return 'юго-восток'
    } else if (deg <= 180) {
      return 'юг'
    } else if (deg < 225) {
      return 'юго-запад'
    } else if (deg <= 270) {
      return 'запад'
    } else if (deg < 315) {
      return 'северо-запад'
    } else if (deg <= 360) {
      return 'север'
    }
  }
  return (
    <div className="header__content">
      <div className="header__content-left">
        <h1>{Math.round(weather.temp)}°</h1>
        <h2>Сегодня</h2>
        <p>Время: {getDate(timezone)}</p>
        <p>Город: {town?.ru ?? town?.en}</p>
        <div><img src={getWeatherIcon(weather.weather[0].main, timezone)} alt="" /></div>
      </div>
      <div className="header__content-right">
        <ul className="header__content-right-list">
          <li>
            <div><img src={temp} alt="" /></div>
            <h3>Температура</h3>
            <p>{Math.round(weather.temp)}° - ощущается как {Math.round(weather.feels_like)}°</p>
          </li>
          <li>
            <div><img src={press} alt="" /></div>
            <h3>Давление</h3>
            <p>{Math.round(weather.pressure * 0.7506)} мм ртутного столба - {pressureLvl(weather.pressure * 0.7506)}</p>
          </li>
          <li>
            <div><img src={humidity} alt="" /></div>
            <h3>Осадки</h3>
            <p>{weather.humidity !== 0 ? weather.humidity  + '%' : 'Без осадков'}</p>
          </li>
          <li>
            <div><img src={wind} alt="" /></div>
            <h3>Ветер</h3>
            <p>{Math.round(weather.wind_speed)} м/с {windDeg(weather.wind_deg)} - {windStr(weather.wind_speed)} ветер</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Content