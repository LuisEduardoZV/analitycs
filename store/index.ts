import { configureStore } from "@reduxjs/toolkit"

import dataInfoSlice from "./slices/main"

export const store = () =>
  configureStore({
    reducer: {
      dataInfo: dataInfoSlice,
    },
  })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
