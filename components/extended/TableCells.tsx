import { Chip } from "@heroui/chip";

import { DefaultCellUserObj, EdadUserType, PaisUserType } from "@/store/data/types";

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

export { TableCellBoolean, TableCellCountry, TableCellWithDsc };

