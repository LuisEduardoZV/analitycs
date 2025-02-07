import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./slices/main";

export const store = () => (configureStore({
    reducer: {
        main: mainSlice
    }
}))

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']