// Tremor cx [v0.0.0]

import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { StrData } from "@/store/types"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export function getColumns(data: StrData) {
  if (!data) return []
  return [...new Set(data.flatMap(item => Object.keys(item)))].map(key => ({
    key, label: key.toUpperCase().replaceAll(/_/g, ' ')
  }))
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