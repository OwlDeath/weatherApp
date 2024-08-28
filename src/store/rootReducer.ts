import { combineReducers } from "@reduxjs/toolkit";
import getWeatherSlice from './getWeatherSlice';

const rootReducer = combineReducers({
    weather: getWeatherSlice
})

export default rootReducer