import { Chip } from "@heroui/chip";

import { ObjCountryType, ObjDescType } from "@/store/data/types";

const TableCellBoolean = ({ value } : {value: boolean}) => {
    return (
        <Chip radius='sm' variant={value ? 'shadow' : 'flat'}
        color={value ? 'success' : 'danger'} className="absolute left-1/3 -translate-x-1/2">
            {value ? 'Si' : 'No'}
        </Chip>
    )
}

const TableCellCountry = (country: ObjCountryType) => {
    const {id, label} = country
    const FlagComponent = require(`country-flag-icons/react/3x2`)[id]

    return (
        <div className="flex gap-4">
            <FlagComponent title={label} width={20} />
            <span>{label}</span>
        </div>
    )
}

const TableCellWithDsc = (country: ObjDescType) => {
    const {value, dsc} = country

    return (
        <div className="flex gap-2">
            <span>{value}</span>
            <span>{dsc}</span>
        </div>
    )
}

export { TableCellBoolean, TableCellCountry, TableCellWithDsc };

