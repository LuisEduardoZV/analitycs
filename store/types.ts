type StrDataId = number | string
export type DataTypes = "paste" | "upload" | "default" | string

export type DefaultDataObject = {
    [key: string]: string
}

export interface ObjToChangeData {
    data: MainDataArrayType
    id: StrDataId
}

interface OptionsCustomType {
    type: string
    value: string | boolean | number
    icon?: string
    color?: String
    dsc?: string
    parse?: string
    code?: string
}

export interface ColumnTypePayload {
    key: string
    type: string
}

export interface ColumnConfigPayload {
    key: string
    config: { type: string, parse?: string, dsc?: string }
}

export interface BaseObjectDataType {
    key: string
    [key: string]: string | number | boolean | OptionsCustomType
  }
  
export type MainDataArrayType = Array<BaseObjectDataType>

export interface TableColumns {
    key: string,
    label: string,
    type: string
    parse?: string
    dsc?: string
}

export type ArrayTableColumnsType = Array<TableColumns>

export type MessagesColumn = {
    [key: string]: any
}
  
export interface MainState {
    data: MainDataArrayType,
    data_id: StrDataId,
    data_type: string,
    table_columns: ArrayTableColumnsType,
    messages: MessagesColumn,
    isReadyToShow: boolean
}