import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MainState, ObjToChangeData } from "../types";

import { getColumns } from "@/utils/utils";

const initialState: MainState = {
    data: [],
    data_id: 0,
    table_columns: [{ key: '', label: '' }],
    messages: null,
    isReadyToShow: false
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<ObjToChangeData>) => {
            state.data = action.payload.data
            state.data_id = action.payload.id
            state.table_columns = getColumns(action.payload.data)
            state.isReadyToShow = true
        },
        clearData: (state) => {
            state.data = []
            state.data_id = 0
            state.table_columns = []
            state.isReadyToShow = false
        }
    }
})

export const { setData, clearData } = mainSlice.actions

export default mainSlice.reducer