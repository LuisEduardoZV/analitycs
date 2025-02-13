import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DataTypes, MainState, ObjToChangeData } from "../types";

import { getColumns } from "@/utils/utils";

const initialState: MainState = {
    data: [],
    data_type: "paste",
    data_id: 0,
    table_columns: [{ key: '', label: '' }],
    messages: null,
    isReadyToShow: false
}

export const dataInfoSlice = createSlice({
    name: 'main',
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
        }
    }
})

export const { setData, clearData, setDataType } = dataInfoSlice.actions

export default dataInfoSlice.reducer