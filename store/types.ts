type StrDataId = number | string
export type DataTypes = "paste" | "upload" | "default" | string

export type DefaultDataObject = {
    [key: string]: string
}

export interface TableColumns {
    key: string,
    label: string,
    type: string
}

export type ArrayTableColumnsType = Array<TableColumns>

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

export interface BaseObjectDataType {
    key: string
    [key: string]: string | number | boolean | OptionsCustomType
  }
  
export type MainDataArrayType = Array<BaseObjectDataType>
  
export interface MainState {
    data: MainDataArrayType,
    data_id: StrDataId,
    data_type: string,
    table_columns: ArrayTableColumnsType,
    messages: null,
    isReadyToShow: boolean
}