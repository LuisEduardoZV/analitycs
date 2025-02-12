import React from "react"

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@heroui/table"

import { SortDescriptor } from "@heroui/table"
import { TableCellBoolean, TableCellCountry, TableCellWithDsc } from "./extended/TableCells"

import { useAsyncList } from '@react-stately/data'

import DataDefaultType from "@/store/data/types"
import { StrData, StrDataArray } from "@/store/types"

interface DataTableProps {
    label: string
    data: StrData
    columns: StrDataArray
}

const DataTable = ({label, data, columns}: DataTableProps) => {
    const [loading, setLoading] = React.useState(true)

    const renderSwitchCell = React.useCallback((item: DataDefaultType, columnKey: string) => {
        const value = getKeyValue(item, columnKey)

        switch (columnKey) {
            case 'estado_stock': 
            case 'suscripcion_activa':
                return <TableCellBoolean {...value} />
            case 'pais':
                return <TableCellCountry {...value} />
            case 'uso_semanal':
            case 'edad':
                return <TableCellWithDsc {...value} />
            default: 
                return value
        }
    }, [])

    let list = useAsyncList({
        async load() {
            setLoading(false)
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
            <TableBody emptyContent="No hay datos" isLoading={loading} items={list.items}>
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => <TableCell className="w-max relative">{renderSwitchCell(item, columnKey.toString())}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable