'use client'

import { useAppSelector } from "@/hooks/reduxHooks"
import React from "react"

import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, getKeyValue } from "@heroui/table"
import { useAsyncList } from '@react-stately/data'

import { TableCellBoolean, TableCellCategory, TableCellCountry, TableCellCustom, TableCellDates, TableCellMoney, TableCellNumber, TableCellRating } from "./extended/TableCells"
import LoadingData from "./loadingData"

import { ArrayTableColumnsType, BaseObjectDataType, MainDataArrayType } from "@/store/types"
import SelectTypeColumn from "./extended/SelectTypeColumn"

interface DataTableProps {
    label: string
    data: MainDataArrayType
    columns: ArrayTableColumnsType
}

const DataTable = ({label, data, columns}: DataTableProps) => {
    const columnsErrors = useAppSelector(state => state.dataInfo.messages)
    const isReady = useAppSelector(state => state.dataInfo.isReadyToShow)
    
    const [loading, setLoading] = React.useState(true)

    const renderSwitchCell = React.useCallback((item: BaseObjectDataType, columnKey: string) => {
        const value = getKeyValue(item, columnKey)
        const isKey = columnKey === 'key'
        console.log(item, columnKey);
        

        if (typeof value === 'object') {
            const objType = value.type
            console.log(value);
            
            switch (objType) {
                case 'country': 
                    return <TableCellCountry {...value} id={columnKey} key={columnKey} />
                case 'number': 
                    return <TableCellNumber {...value} id={columnKey} key={columnKey} />
                case 'money':
                    return <TableCellMoney {...value} id={columnKey} key={columnKey} />
                case 'boolean':
                    return <TableCellBoolean {...value} id={columnKey} key={columnKey} />
                case 'category':
                    return <TableCellCategory {...value} id={columnKey} key={columnKey} />
                case 'date':
                    return <TableCellDates {...value} id={columnKey} key={columnKey} />
                case 'rating':
                    return <TableCellRating {...value} id={columnKey} key={columnKey} />
                case 'custom':
                default:
                    return <TableCellCustom {...value} id={columnKey} key={columnKey} />
            }
        }

        return <span className={`${isKey ? 'font-light text-default-400' : ''}`}>{`${isKey ? '#' : ''}`}{value}</span>
    }, [data])

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
        },
    })

    console.log(list);
    console.log(list.items);
    
    if (!isReady) return null
    return (
        <Table isStriped removeWrapper aria-label={`Tabla de datos para ${label}`} className="w-full" onSortChange={list.sort} sortDescriptor={list.sortDescriptor}>
            <TableHeader columns={columns}>
                {(column) => {
                    const hasError = !!columnsErrors[column.key]

                    return (
                        <TableColumn 
                            key={column.key} 
                            allowsSorting 
                            className={`relative ${hasError ? 'bg-red-100/50' : ''} transition-background duration-200 ease-in`}
                            >
                            <div className={`flex items-center gap-2 w-fit ${hasError ? 'text-red-600' : ''} transition-colors duration-200 ease-in`}>
                                <SelectTypeColumn columnKey={column.key} type={column.type} />
                                <span className="whitespace-nowrap hover:cursor-pointer">{column.label}</span>
                            </div>
                        </TableColumn>
                    )
                }}
            </TableHeader>
            <TableBody emptyContent="No hay datos" isLoading={loading} items={list.items as BaseObjectDataType[]} loadingContent={<LoadingData />}>
                {(item: BaseObjectDataType) => (
                    <TableRow key={item.key}>
                        {(columnKey) => {
                            console.log(columnKey);
                            
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
