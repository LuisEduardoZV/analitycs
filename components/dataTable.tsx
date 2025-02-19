import React from "react"

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@heroui/table"
import { useAsyncList } from '@react-stately/data'

import { TableCellCountry, TableCellCustom } from "./extended/TableCells"
import LoadingData from "./loadingData"

import { ArrayTableColumnsType, BaseObjectDataType, MainDataArrayType } from "@/store/types"

interface DataTableProps {
    label: string
    data: MainDataArrayType
    columns: ArrayTableColumnsType
}

const DataTable = ({label, data, columns}: DataTableProps) => {
    const [loading, setLoading] = React.useState(true)

    const renderSwitchCell = React.useCallback((item: BaseObjectDataType, columnKey: string) => {
        const value = getKeyValue(item, columnKey)
        const isKey = columnKey === 'key'

        if (typeof value === 'object') {
            const objType = value.type
            switch (objType) {
                case 'country': 
                    return <TableCellCountry {...value} key={columnKey} />
                case 'custom':
                default:
                    return <TableCellCustom {...value} key={columnKey} />
            }
        }

        return <span className={`${isKey ? 'font-light text-default-400' : ''}`}>{`${isKey ? '#' : ''}`}{value}</span>
    }, [])

    let list = useAsyncList({
        async load({ cursor }) {
            if (!cursor) setLoading(false)
            return { items: data }
        },
        async sort({items, sortDescriptor}){
            return {
                items: items.sort((a, b) => {
                    let first = getKeyValue(a, sortDescriptor.column);
                    let second = getKeyValue(b, sortDescriptor.column);
                    if (typeof first === 'object') first = first.value;
                    if (typeof second === 'object') second = second.value;
                    
                    let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
            
                    if (sortDescriptor.direction === "descending") cmp *= -1
                    
                    return cmp;
                }),
              };
        }
    })

    return (
        <Table isStriped removeWrapper aria-label={`Tabla de datos para ${label}`} className="w-full" onSortChange={list.sort} sortDescriptor={list.sortDescriptor}>
            <TableHeader columns={columns}>
                {(column) => {
                    const centered = typeof getKeyValue(data[0], column.key) === 'boolean'
                    return (
                        <TableColumn key={column.key} allowsSorting align={centered ? 'start' : 'start'}>
                            {column.label}
                        </TableColumn>
                    )
                }}
            </TableHeader>
            <TableBody emptyContent="No hay datos" isLoading={loading} items={list.items as BaseObjectDataType[]} loadingContent={<LoadingData />}>
                {(item: BaseObjectDataType) => (
                    <TableRow key={item.key}>
                        {(columnKey) => {
                            return (
                                <TableCell className="w-max relative">
                                    {renderSwitchCell(item, columnKey.toString())}
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