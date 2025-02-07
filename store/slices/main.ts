import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type StrDataId = number | string
type StrData = object | null

interface MainState {
    data: StrData,
    data_id: StrDataId
}

const initialState: MainState = {
    data: null,
    data_id: 0
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<StrData>) => {
            state.data = action.payload
        },
        setDataId: (state, action: PayloadAction<StrDataId>) => {
            state.data_id = action.payload
        },
        clearData: (state) => {
            state.data = null
            state.data_id = 0
        }
    }
})

export const { setData, setDataId, clearData } = mainSlice.actions

export default mainSlice.reducer