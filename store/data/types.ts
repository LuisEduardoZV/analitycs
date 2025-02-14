interface EdadUserType {
  value: number
  dsc: string
}

interface PaisUserType {
  value: string
  code: string
}

interface SuscripcionActivaUserType {
  value: boolean
  dsc: string
}

interface UsoSemanalUserType {
  value: number
  dsc: string
}

export interface USER {
  key: number
  nombre: string
  edad: EdadUserType
  genero: string
  pais: PaisUserType
  suscripcion_activa: SuscripcionActivaUserType
  dispositivo_principal: string
  uso_semanal: UsoSemanalUserType
}

export type FuenteOptionTypes = "Interno" | "Externo";

export interface LatenciaPromedioType {
  type: string
  value: string
  dsc?: string
}

export interface TimestampType {
  type: string
  value: string
}

export interface Timestamp {
  type: string
  value: string
  parse: string
}

export interface Fuente {
  type: string
  value: string
  icon: string
  color: string
}

export interface LatenciaPromedio {
  type: string
  value: number
  dsc: string
}

export interface TipoTrafico {
  type: string
  value: string
  chip: boolean
  color: string
}

export interface TRAFICO {
  key: number
  timestamp: Timestamp
  paquetes: number
  protocolo: string
  fuente: Fuente
  latencia_promedio: LatenciaPromedio
  tipo_trafico: TipoTrafico
}

export interface Categoria {
  type: string
  value: string
  chip: boolean
  color: string
}

export interface Precio {
  type: string
  value: number
  dsc: string
}

export interface ValoracionPromedio {
  type: string
  value: number
  rating: boolean
}

export interface INVENTARIO {
  key?: string
  uuid: string
  producto: string
  categoria: Categoria
  marca: string
  precio: Precio
  stock: number
  estado_stock: string
  valoracion_promedio: ValoracionPromedio
}

type DataDefaultType = USER | TRAFICO | INVENTARIO

export default DataDefaultType