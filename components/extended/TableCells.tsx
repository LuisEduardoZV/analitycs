import { useCallback } from "react";

import { Chip } from "@heroui/chip";

import { DefaultCellUserObj, EdadUserType, FuenteType, PaisUserType, TimestampType } from "@/store/data/types";

import * as Icons from "@heroicons/react/24/solid";

const TableCellBoolean = (data: EdadUserType) => {
    const {value, dsc} = data
    return (
        <Chip radius='sm' variant={value ? 'shadow' : 'flat'}
        color={value ? 'success' : 'danger'} className="absolute left-1/3 -translate-x-1/2">
            {dsc}
        </Chip>
    )
}

const TableCellCountry = (country: PaisUserType) => {
    const {value, code} = country
    const FlagComponent = require(`country-flag-icons/react/3x2`)[code]

    return (
        <div className="flex gap-4">
            <FlagComponent title={value} width={20} />
            <span>{value}</span>
        </div>
    )
}

const TableCellWithDsc = (data: DefaultCellUserObj) => {
    const {value, dsc} = data

    return (
        <div className="flex gap-2">
            <span>{value}</span>
            <span>{dsc}</span>
        </div>
    )
}

const TableCellTimestamp = (data: TimestampType) => {
    const { value } = data
    const date = new Date(value).toLocaleString("es-MX")

    return (
        <div className="flex gap-2">
            <span>{date}</span>
        </div>
    )
}

const TableCellCustom = ({ value, icon, color, chip }: FuenteType) => {
    let IconComponent = null

    if (icon) {
        const iconName = icon.split("").map((chart, idx) => {
            if (idx === 0) return chart.toUpperCase()
            if (chart.includes("-")) return ""
            if (idx !== 0 && icon[idx-1] === '-') return chart.toUpperCase()
            return chart
          }).join().replaceAll(",", "") + "Icon"

        IconComponent = (Icons as any)[iconName] || null
    }

    const renderValue = useCallback(() => {
        if (chip) return <Chip radius='sm' variant='faded'
        classNames={{
            base: `text-${color ? color : 'primary'}-700 bg-${color ? color : 'primary'}-100/25 border-${color ? color : 'primary'}-500`,
        }}>{value}</Chip>
        
        return <span>{value}</span>
    }, [])
    
    return (
        <div className="flex gap-2 items-center">
            {renderValue()}
            {IconComponent && <IconComponent className={`size-4 ${color ? `text-${color}-500` : ''}`}/>}
        </div>
    )
}

export { TableCellBoolean, TableCellCountry, TableCellCustom, TableCellTimestamp, TableCellWithDsc };

