"use client"

import type { BaseObjectDataType } from "@/store/types"

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@heroui/table"
import { useAsyncList } from "@react-stately/data"
import React from "react"

import TableCellType from "./extended/TableCells"
import LoadingData from "./loadingData"

import SelectTypeColumn from "@/app/components/extended/SelectTypeColumn"
import { useAppSelector } from "@/hooks/reduxHooks"

const DataTable = () => {
  const columnsErrors = useAppSelector((state) => state.dataInfo.messages)
  const isReady = useAppSelector((state) => state.dataInfo.isReadyToShow)
  const mainInfo = useAppSelector((state) => state.dataInfo)
  const columns = useAppSelector((state) => state.dataInfo.table_columns)

  const [loading, setLoading] = React.useState(true)

  let list = useAsyncList({
    async load({ cursor }) {
      if (!cursor) setLoading(false)

      return { items: mainInfo.data }
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = getKeyValue(a, sortDescriptor.column)
          let second = getKeyValue(b, sortDescriptor.column)

          if (typeof first === "object") first = first.value
          if (typeof second === "object") second = second.value

          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

          if (sortDescriptor.direction === "descending") cmp *= -1

          return cmp
        }),
      }
    },
  })

  if (!isReady) return null

  return (
    <Table
      isHeaderSticky
      isStriped
      removeWrapper
      aria-label={`Tabla de datos`}
      className="w-full"
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader columns={columns}>
        {(column) => {
          const hasError = !!columnsErrors[column.key]

          return (
            <TableColumn
              key={column.key}
              allowsSorting
              className={`relative ${hasError ? "bg-red-50" : ""} transition-background duration-200 ease-in`}
            >
              <div
                className={`flex items-center gap-2 w-fit ${hasError ? "text-red-600" : ""} transition-colors duration-200 ease-in`}
              >
                <SelectTypeColumn columnKey={column.key} type={column.type} />
                <span className="whitespace-nowrap hover:cursor-pointer">
                  {column.label}
                </span>
              </div>
            </TableColumn>
          )
        }}
      </TableHeader>
      <TableBody
        emptyContent="No hay datos"
        isLoading={loading}
        items={list.items as BaseObjectDataType[]}
        loadingContent={<LoadingData />}
      >
        {(item: BaseObjectDataType) => (
          <TableRow key={item.key}>
            {(columnKey) => {
              return (
                <TableCell className="w-max relative">
                  <TableCellType
                    columnKey={columnKey.toString()}
                    value={getKeyValue(item, columnKey)}
                  />
                </TableCell>
              )
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable
