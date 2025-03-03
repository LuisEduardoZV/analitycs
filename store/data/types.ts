interface BaseType {
  type: string
  value: string | number | boolean
  dsc?: string
}

interface EdadUserType extends BaseType {
  value: number
}

interface PaisUserType extends BaseType {
  value: string
  code: string
}

interface SuscripcionActivaUserType extends BaseType {
  value: boolean
}

interface UsoSemanalUserType extends BaseType {
  value: number
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

export interface LatenciaPromedioType extends BaseType {
  value: number
}

export interface TimestampType extends BaseType {
  value: string
  parse: string
}

export interface FuenteType extends BaseType {
  value: string
  icon: string
  color: string
}

interface PaquetesType extends BaseType {
  value: number
}

export interface LatenciaPromedioType extends BaseType {
  value: number
  dsc: string
}

export interface TipoTraficoType extends BaseType {
  value: string
  color: string
}

export interface TRAFICO {
  key: number
  timestamp: TimestampType
  paquetes: PaquetesType
  protocolo: string
  fuente: FuenteType
  latencia_promedio: LatenciaPromedioType
  tipo_trafico: TipoTraficoType
}

export interface INVENTARIO {
  uuid: string
  producto: string
  categoria: CategoriaType
  marca: string
  precio: PrecioType
  stock: StockType
  estado_stock: string
  valoracion_promedio: ValoracionPromedioType
}

interface CategoriaType extends BaseType {
  value: string
  color: string
}

interface PrecioType extends BaseType {
  value: number
  dsc: string
}

interface StockType extends BaseType {
  value: number
}

interface ValoracionPromedioType extends BaseType {
  value: number
}

type DataDefaultType = USER | TRAFICO | INVENTARIO

export default DataDefaultType
