/* eslint-disable prettier/prettier */
"use client"

import * as Icons from "@heroicons/react/24/solid"
import { Chip } from "@heroui/chip"
import dayjs from "dayjs"
import { useCallback } from "react"

import {
  CountryObjectDataType,
  CustomObjectDataType,
} from "./types/tableCellTypes"

import { useAppSelector } from "@/hooks/reduxHooks"
import { TypesOfDates } from "@/store/contants"
import { isValidHexa } from "@/utils/utils"

const TableCellCountry = ({ value, code }: CountryObjectDataType) => {
  const FlagComponent = require(`country-flag-icons/react/3x2`)[code]

  return (
    <div className="flex gap-4">
      <FlagComponent title={value} width={20} />
      <span>{value}</span>
    </div>
  )
}

const TableCellCustom = ({
  value,
  icon,
  color,
  parse,
  dsc,
  money,
}: CustomObjectDataType) => {
  let IconComponent = null

  if (icon) {
    const iconName =
      icon
        .split("")
        .map((chart, idx) => {
          if (idx === 0) return chart.toUpperCase()
          if (chart.includes("-")) return ""
          if (idx !== 0 && icon[idx - 1] === "-") return chart.toUpperCase()

          return chart
        })
        .join()
        .replaceAll(",", "") + "Icon"

    IconComponent = (Icons as any)[iconName] || null
  }

  let clasesColor = `text-primary-700 bg-primary-100/25 border-primary-500`

  if (color) {
    if (isValidHexa(color))
      clasesColor = `text-[${color}] bg-[${color}]/25 border-[${color}]`
    else
      clasesColor = `text-${color}-700 bg-${color}-100/25 border-${color}-500`
  }

  const renderValue = useCallback(() => {
    let newValue = value

    if (typeof value === "string") {
      switch (parse) {
        case "date":
          newValue = new Date(value).toLocaleString("es-MX")
          break
        default:
          newValue = value
          break
      }
    }

    return (
      <div
        className={`flex ${money ? "flex-row-reverse gap-0.5 italic" : "flex-row gap-1"}`}
      >
        <span>{newValue}</span> <span>{dsc}</span>
      </div>
    )
  }, [])

  return (
    <div className="flex gap-2 items-center">
      {renderValue()}
      {IconComponent && (
        <IconComponent
          className={`size-4 ${color ? `text-${color}-500` : ""}`}
        />
      )}
    </div>
  )
}

const TableCellNumber = ({ value, parse, dsc }: CustomObjectDataType) => {
  const renderValue = useCallback(() => {
    let newValue = value

    if (typeof value === "string") {
      switch (parse) {
        case "date":
          newValue = new Date(value).toLocaleString("es-MX")
          break
        default:
          newValue = value
          break
      }
    }

    return (
      <div className={`flex flex-row gap-1`}>
        <span>{newValue}</span> <span>{dsc}</span>
      </div>
    )
  }, [])

  return <div className="flex gap-2 items-center">{renderValue()}</div>
}

const TableCellDates = ({ value, id }: CustomObjectDataType) => {
  const tableCols = useAppSelector((state) => state.dataInfo.table_columns)

  const colConfig = tableCols.find((item) => item.key === id)

  const renderValue = useCallback(() => {
    let newValue = value

    if (typeof value === "string") {
      if (
        colConfig &&
        colConfig?.parse &&
        TypesOfDates.find((item) => item.key === colConfig.parse)
      ) {
        newValue = dayjs(value).format(colConfig.parse)
      } else newValue = new Date(value).toLocaleString("es-MX")
    }

    return (
      <div className={`flex flex-row gap-1`}>
        <span>{newValue}</span>
      </div>
    )
  }, [colConfig])

  return <div className="flex gap-2 items-center">{renderValue()}</div>
}

const TableCellBoolean = ({ value, dsc }: CustomObjectDataType) => {
  const newValue = typeof value === "boolean" ? value : false

  return (
    <div className="flex gap-2 items-center">
      <Chip
        className="absolute left-1/3 -translate-x-1/2"
        color={newValue ? "success" : "danger"}
        radius="sm"
        variant={newValue ? "shadow" : "flat"}
      >
        {dsc}
      </Chip>
    </div>
  )
}

const TableCellMoney = ({ value, id }: CustomObjectDataType) => {
  const tableCols = useAppSelector((state) => state.dataInfo.table_columns)

  const colConfig = tableCols.find((item) => item.key === id)
  const dsc = colConfig?.dsc || ""

  return (
    <div className="flex gap-2 items-center">
      <div className={`flex flex-row gap-1`}>
        <span>{dsc}</span>
        <span>{value}</span>
      </div>
    </div>
  )
}

const TableCellCategory = ({ value, color }: CustomObjectDataType) => {
  let clasesColor = `text-primary-700 bg-primary-100/25 border-primary-500`

  if (color) {
    if (isValidHexa(color))
      clasesColor = `text-[${color}] bg-[${color}]/25 border-[${color}]`
    else
      clasesColor = `text-${color}-700 bg-${color}-100/25 border-${color}-500`
  }

  return (
    <div className="flex gap-2 items-center">
      <Chip
        classNames={{
          base: clasesColor,
        }}
        radius="sm"
        variant="faded"
      >
        {value}
      </Chip>
    </div>
  )
}

const TableCellRating = ({ value }: CustomObjectDataType) => {
  const fullStars = Math.floor(Number(value))
  const decimalPart = Number(value) - fullStars

  return (
    <div className="flex gap-2 items-center">
      <div className="flex items-center gap-3 w-full relative">
        <span>{value}</span>
        <div className="flex items-center justify-center">
          {Array.from({ length: fullStars }).map((_, idx) => (
            <Icons.StarIcon key={idx} className="text-warmYellow-400 size-4" />
          ))}
          {decimalPart > 0 && (
            <div className="relative flex items-center justify-center ml-2 w-min h-min">
              <Icons.StarIcon className="text-gray-300 size-4 absolute" />
              <Icons.StarIcon
                className="text-warmYellow-400 size-4 absolute"
                style={{
                  clipPath: `polygon(0 0, ${decimalPart * 100}% 0, ${decimalPart * 100}% 100%, 0% 100%)`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export {
  TableCellBoolean,
  TableCellCategory,
  TableCellCountry,
  TableCellCustom,
  TableCellDates,
  TableCellMoney,
  TableCellNumber,
  TableCellRating
}

