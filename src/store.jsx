import { configureStore } from "@reduxjs/toolkit";
import holidayReducer from './slices/holidays'

const store = configureStore({
    reducer: holidayReducer,
    devTools: true 
})

export default store