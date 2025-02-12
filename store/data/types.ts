export interface ObjDescType {
  dsc: string,
  value: number
}

export interface ObjCountryType {
  label: string
  id: string
}

export interface USER {
    key: number,
    nombre: string,
    edad: ObjDescType,
    genero: string,
    pais: ObjCountryType,
    suscripcion_activa: boolean,
    dispositivo_principal: string,
    horas_uso_semanal: ObjDescType
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