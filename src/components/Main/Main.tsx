import { useSelector } from "react-redux"
import snowy from '../../assets/images/snowy-6.svg'
import clear from '../../assets/images/day.svg'
import night from '../../assets/images/night.svg'
import rainy from '../../assets/images/rainy-6.svg'
import thunder from '../../assets/images/thunder.svg'
import cloudy from '../../assets/images/cloudy.svg'
import React from "react"
import { allWeather, currentDaily } from "../../types/types"
interface stateInterface {
    weather: {
      data: allWeather
    }
  }
const Main:React.FC = () => {
  const daily = useSelector((state:stateInterface) => state.weather.data?.weatherData.daily.slice(0, 7))
  const weekDays:string[] = ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
  function getWeatherIcon(main:string, icon:string) {
    if(main === 'Clear') return clear
    else if(main === 'Snow') return snowy
    else if(main === 'Drizzle' || main === 'Rain') return rainy
    else if(main === 'Thunderstorm') return thunder
    else if(main === 'Clouds') return cloudy
    else return `https://openweathermap.org/img/wn/${icon}@4x.png`
  }
  return (
    <main className="main">
        <h2 className="main-title">На неделю</h2>
        {daily && 
            <div className="main-content">
                { daily.map((day:currentDaily, idx:number) => (
                    <div className="main-content__day" key={idx}>
                        <h3>{
                            idx === 0 ? 'Сегодня' :
                            idx === 1 ? 'Завтра' : 
                            weekDays[new Date(day.dt * 1000).getDay()]
                        }</h3>
                        <h4>{new Date(day.dt * 1000).toLocaleDateString('ru-Ru', {
                            month: 'short',
                            day: 'numeric'
                        })}</h4>
                        <img src={getWeatherIcon(day.weather[0].main, day.weather[0].icon)} alt="" />
                        <p>{Math.round(day.temp.max) > 0 ? '+' + Math.round(day.temp.max) : Math.round(day.temp.max)}°</p>
                        <span>{Math.round(day.temp.min) > 0 ? '+' + Math.round(day.temp.min) : Math.round(day.temp.min)}°</span>
                        <span>{day.weather[0].description}</span>
                    </div>
                )) }
                
            </div>
        }
    </main>
  )
}

export default Main