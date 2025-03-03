import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  ColumnConfigPayload,
  ColumnTypePayload,
  DataTypes,
  MainState,
  ObjToChangeData,
} from "../types"

import {
  changeColumnConfig,
  changeTypeColumn,
  checkTypeColumn,
  getColumns,
} from "@/utils/utils"

const initialState: MainState = {
  data: [],
  data_type: "paste",
  data_id: 0,
  table_columns: [{ key: "", label: "", type: "" }],
  messages: {},
  isReadyToShow: false,
}

export const dataInfoSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<ObjToChangeData>) => {
      state.data = action.payload.data
      state.data_id = action.payload.id
      state.table_columns = getColumns(action.payload.data)
      state.isReadyToShow = true
    },
    setDataType: (state, action: PayloadAction<DataTypes>) => {
      state.data_type = action.payload
    },
    clearData: (state) => {
      state.data = []
      state.data_id = 0
      state.table_columns = []
      state.isReadyToShow = false
    },
    setColumnType: (state, action: PayloadAction<ColumnTypePayload>) => {
      const newCols = changeTypeColumn(
        state.table_columns,
        action.payload.key,
        action.payload.type,
      )
      const newErrors = checkTypeColumn(newCols, action.payload.key, state.data)

      state.messages[action.payload.key] = newErrors
      state.table_columns = newCols
    },
    setColumnConfig: (state, action: PayloadAction<ColumnConfigPayload>) => {
      const newCols = changeColumnConfig(
        state.table_columns,
        action.payload.key,
        action.payload.config,
      )
      const newErrors = checkTypeColumn(newCols, action.payload.key, state.data)

      state.messages[action.payload.key] = newErrors

      state.table_columns = newCols
    },
  },
})

export const {
  setData,
  clearData,
  setDataType,
  setColumnType,
  setColumnConfig,
} = dataInfoSlice.actions

export default dataInfoSlice.reducer
