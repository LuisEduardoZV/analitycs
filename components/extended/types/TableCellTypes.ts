type parseFunction = (value: string) => string

type TableCellTypeTypes = 'custom' | 'country' | string

export interface BaseObjectDataType {
    key?: string
    id?: string
  type: TableCellTypeTypes
  value: string | number | boolean
}

export interface CustomObjectDataType extends BaseObjectDataType {
  type: 'custom'
  icon?: string
  color?: string
  chip?: boolean
  dsc?: string
  parse?: string | parseFunction
  money?: boolean
  rating?: boolean
}

export interface CountryObjectDataType extends BaseObjectDataType {
  type: 'country'
  value: string
  code: string
}