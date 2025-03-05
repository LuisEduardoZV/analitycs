type TableCellTypeTypes = "custom" | "country" | string

export interface BaseObjectDataType {
  key?: string
  id?: string
  type: TableCellTypeTypes
  value: string | number | boolean
}

export interface CustomObjectDataType extends BaseObjectDataType {
  type: string
  icon?: string
  color?: string
  chip?: boolean
  dsc?: string
  parse?: string
  money?: boolean
  rating?: boolean
}

export interface CountryObjectDataType extends BaseObjectDataType {
  type: string
  value: string
  code: string
}

export interface TableCellType {
  value: CountryObjectDataType
  columnKey: string
}
