type StrDataId = number | string
export type DefaultDataObject = {
    [key: string]: string
}
export type StrData = Array<DefaultDataObject>

export interface MainState {
    data: StrData,
    data_id: StrDataId,
    table_columns: StrDataArray,
    messages: null,
    isReadyToShow: boolean
}

export interface TableColumns {
    key: string,
    label: string
}

type StrDataArray = Array<TableColumns>

export interface ObjToChangeData {
    data: StrData
    id: StrDataId
}
