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

export interface TRAFICO {
    key: number,
    timestamp: string,
    paquetes: number,
    protocolo: string,
    fuente: string,
    latencia_promedio: number,
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