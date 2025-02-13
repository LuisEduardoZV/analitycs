export interface EdadUserType {
  value: number
  dsc: string
}

export interface PaisUserType {
  value: string
  code: string
}

export interface SuscripcionActivaUserType {
  value: boolean
  dsc: string
}

export interface UsoSemanalUserType {
  value: number
  dsc: string
}

export type DefaultCellUserObj = EdadUserType | UsoSemanalUserType

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

export type Protocolo = "HTTP" | "HTTPS" | "FTP" | "DNS" | "TCP" | "UDP" | string;
export type FuenteOptionTypes = "Interno" | "Externo";
export type TipoTrafico = "Datos" | "Video" | "Archivos" | "Consulta" | "Control" | "Streaming" | string;

export interface LatenciaPromedioType {
  value: string
  dsc: string
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