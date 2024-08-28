import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/images/logo.svg'
import invert from '../../assets/images/invert.svg'
interface NavbarProps {
  changeWeather: (city:string) => void,
  timezone: number
}
const Navbar:React.FC<NavbarProps> = ({changeWeather, timezone}) => {
  const [city, setCity] = useState<string>('Fergana')
  const isMounted = useRef<boolean>(false)
  useEffect(() => {
    if(isMounted.current && city){
      changeWeather(city)
    }
    isMounted.current = true
  }, [city])
  const changeTheme = () => {
    let html = document.querySelector('html')
    html?.classList.toggle('dark-theme')
  }
  useEffect(() => {
    let html = document.querySelector('html');
    const date  = new Date(new Date().getTime() + timezone * 1000)
    if(date.getUTCHours() < 6){
      html?.classList.add('dark-theme')
    }else if(date.getUTCHours() < 18){
      html?.classList.remove('dark-theme')
    }else html?.classList.add('dark-theme')
  }, [timezone])
  
  return (
    <nav className="header__nav">
        <a href="/"><img src={logo} alt="logo" /></a>
        <div>
          <img src={invert} alt="" onClick={() => changeTheme()}/>
          <input type="text" placeholder='Выбрать город'  onChange={(e) => setCity(e.target.value)}/>
        </div>
    </nav>
  )
}

export default Navbar
