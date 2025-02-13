import { useCallback } from "react";

import { Chip } from "@heroui/chip";

import { CountryObjectDataType, CustomObjectDataType } from "./types/TableCellTypes";

import * as Icons from "@heroicons/react/24/solid";

const TableCellCountry = ({value, code}: CountryObjectDataType) => {
    const FlagComponent = require(`country-flag-icons/react/3x2`)[code]

    return (
        <div className="flex gap-4">
            <FlagComponent title={value} width={20} />
            <span>{value}</span>
        </div>
    )
}

const TableCellCustom = ({ value, icon, color, chip, parse, dsc }: CustomObjectDataType) => {
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
        let newValue = value
        if (typeof value === 'string') {
            switch (parse) {
                case 'date':
                    newValue = new Date(value).toLocaleString("es-MX")
                    break;
                default:
                    newValue = value
                    break;
            }
        }

        if (typeof newValue === 'boolean') {
            return (
                <Chip radius='sm' variant={newValue ? 'shadow' : 'flat'}
                color={newValue ? 'success' : 'danger'} className="absolute left-1/3 -translate-x-1/2">
                    {dsc}
                </Chip>
            )
        }

        if (chip) {
            return (
                <Chip radius='sm' variant='faded'
                    classNames={{
                        base: `text-${color ? color : 'primary'}-700 bg-${color ? color : 'primary'}-100/25 border-${color ? color : 'primary'}-500`,
                    }}>
                    {newValue}
                </Chip>
            )
        }
        
        return <span>{newValue}</span>
    }, [])
    
    return (
        <div className="flex gap-2 items-center">
            {renderValue()}
            {typeof value !== 'boolean' && dsc}
            {IconComponent && <IconComponent className={`size-4 ${color ? `text-${color}-500` : ''}`}/>}
        </div>
    )
}

export { TableCellCountry, TableCellCustom };

