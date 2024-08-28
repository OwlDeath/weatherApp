import { createSlice } from "@reduxjs/toolkit";
import { getWeatherData } from "./getWeatherApi";

const getWeatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null
    },
    reducers: {
        getWeather: (state, action) => {
            state.data = action.payload
        }
    }
})

export const getWeatherInfo = (city:string) => async (dispatch:Function) => {
    try {
        console.log(typeof dispatch);
        
        const data = await getWeatherData(city)
        dispatch(getWeather(data))
    } catch (error) {
        console.error(error);
    }
}
export const { getWeather } = getWeatherSlice.actions
export default getWeatherSlice.reducer