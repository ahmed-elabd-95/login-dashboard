import { combineReducers, configureStore } from "@reduxjs/toolkit";
import items from "./user/userSlice"

const reducers = combineReducers({
 items 
})

const store = configureStore({
    reducer: reducers
})

export default store;