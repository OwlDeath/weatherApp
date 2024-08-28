export interface geoData {
    name: string,
    local_names: {ru:string, en:string},
    lat: number,
    lon: number,
    country: string,
    state: string
}
export interface current {
    dt: number,
    temp: number,
    feels_like: number,
    pressure: number,
    humidity: number | null,
    wind_speed: number,
    wind_deg: number,
    weather: [{
        main: string,
        icon: string,
    }]
}
export interface currentDaily {
    dt: number,
    temp: {min:number,max:number},
    weather: [{
        main: string,
        icon: string,
        description: string
    }]
}
export interface weatherData {
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
    current: current,
    daily: currentDaily[]
}
export interface allWeather {
    geoData: geoData,
    weatherData: weatherData
}