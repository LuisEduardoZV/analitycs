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

export interface FuenteType {
  type: string
  value: FuenteOptionTypes
  icon?: string
  color?: string
  chip?: boolean
  dsc?: string
}

export interface TRAFICO {
    key: number,
    timestamp: TimestampType,
    paquetes: number,
    protocolo: string,
    fuente: FuenteType,
    latencia_promedio: LatenciaPromedioType,
    tipo_trafico: string
}

export interface INVENTARIO {
      key: string,
      producto: string,
      categoria: string,
      marca: string,
      precio: number,
      stock: number,
      estado_stock: string,
      valoracion_promedio: number
}

type DataDefaultType = USER | TRAFICO | INVENTARIO

export default DataDefaultType