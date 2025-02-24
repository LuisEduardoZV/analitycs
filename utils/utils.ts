// Tremor cx [v0.0.0]

import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { ArrayTableColumnsType, MainDataArrayType } from "@/store/types"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export function getColumns(data: MainDataArrayType) {
  if (!data) return []
  const allKeys = [...new Set(data.flatMap(item => Object.keys(item)))]
  return allKeys.map(key => {
    const config: {type: string, parse?: string, dsc?: string} = {
      type: 'string'
    }
    if (typeof data[0][key] === 'object') {
      config.type = data[0][key].type
      if (data[0][key].parse !== null) config.parse = data[0][key].parse
      if (data[0][key].dsc !== null) config.dsc = data[0][key].dsc
    }
    if (key === 'key') config.type = 'number'
    return {
      key, label: key.toUpperCase().replaceAll(/_/g, ' '), ...config,
    }
  })
}

export function changeColumnConfig(columns: ArrayTableColumnsType, key: string, config: { type: string, parse?: string, dsc?: string }) {
  if (!columns) return []
  const info = columns.map(item => item.key === key ? { ...item, ...config } : item)
  // console.log(info);
  
  return info
}

export function changeTypeColumn(columns: ArrayTableColumnsType, key: string, type: string) {
  if (!columns) return []
  const info = columns.map(item => item.key === key ? { ...item, type } : item)
  // console.log(info);
  
  return info
}

export function isValidHexa(hexa: string) {
  return /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(hexa)
}

export function isJSONValid(json: string) {
  try {
    JSON.parse(json)
  } catch (e) {
    return false
  }
  return true
}