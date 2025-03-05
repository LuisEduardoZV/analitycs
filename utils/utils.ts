// Tremor cx [v0.0.0]

import type { ArrayTableColumnsType, MainDataArrayType } from "@/store/types"

import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export function getColumns(data: MainDataArrayType) {
  if (!data) return []
  const allKeys = [...new Set(data.flatMap((item) => Object.keys(item)))]

  return allKeys.map((key) => {
    const config: { type: string; parse?: string; dsc?: string } = {
      type: "string",
    }

    if (typeof data[0][key] === "object") {
      config.type = data[0][key].type
      if (data[0][key].parse !== null) config.parse = data[0][key].parse
      if (data[0][key].dsc !== null) config.dsc = data[0][key].dsc
    }
    if (key === "key") config.type = "number"

    return {
      key,
      label: key.toUpperCase().replaceAll(/_/g, " "),
      ...config,
    }
  })
}

export function changeColumnConfig(
  columns: ArrayTableColumnsType,
  key: string,
  config: { type: string; parse?: string; dsc?: string },
) {
  if (!columns) return []
  const info = columns.map((item) =>
    item.key === key ? { ...item, ...config } : item,
  )
  // console.log(info);

  return info
}

export function changeTypeColumn(
  columns: ArrayTableColumnsType,
  key: string,
  type: string,
) {
  if (!columns) return []
  const info = columns.map((item) =>
    item.key === key ? { ...item, type } : item,
  )

  return info
}

export function checkTypeColumn(
  columns: ArrayTableColumnsType,
  key: string,
  data: MainDataArrayType,
) {
  if (!columns || !data) return ""
  const colType = columns.find((item) => item.key === key)?.type

  let error = null

  for (let i = 0; i < data.length; i++) {
    const element = data[i]

    try {
      let value = element[key]

      if (typeof value === "object") value = value.value

      switch (colType) {
        case "number":
        case "money":
          if (isNaN(Number(value.toString())))
            throw new Error(`${key} is not a number`)
          break
        case "string":
          if (!String(value)) throw new Error(`${key} is not a string`)
          break
        case "boolean":
          if (value !== true && value !== false)
            throw new Error(`${key} is not a boolean`)
          break
        case "date":
          if (isNaN(Date.parse(value.toString())))
            throw new Error(`${key} is not a date`)
          break
      }
    } catch (e: any) {
      error = e.message
      break
    }
  }

  return error
}

export function isValidHexa(hexa: string) {
  return /^#[0-9A-F]{6}[0-9a-f]{0,2}$/i.test(hexa)
}

function randomHexa() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

export function isJSONValid(json: string) {
  try {
    JSON.parse(json)
  } catch (e) {
    return false
  }

  return true
}
