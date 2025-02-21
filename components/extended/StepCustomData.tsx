import { useAppSelector } from "@/hooks/reduxHooks"

import { motion } from "motion/react"

import DataTable from "../dataTable"

import { variantsModalSteps } from "@/config/variantsAnimate"

interface StepCustomDataProps {
    view: number
}

const StepCustomData = ({ view }: StepCustomDataProps) => {
    const dataInfoState = useAppSelector((state) => state.dataInfo)
    const columns = useAppSelector((state) => state.dataInfo.table_columns)

    console.log(columns);

    if(!view)
    return (
        <motion.div key={'viewData'} variants={variantsModalSteps} initial={'inactive'} animate={dataInfoState.isReadyToShow ? 'active' : 'inactive'} exit={'inactive'} className="w-full flex flex-col gap-2 max-h-[60vh] relative">
            <h2 className="text-lg font-semibold">2. Vista previa de datos</h2>
            <div className="w-full overflow-y-auto p-3">
                {/* <div className="w-full flex justify-between">
                    <Input 
                    label="Separador de miles"
                    labelPlacement="outside"
                    type="text"
                    variant="flat"
                    value=','
                    />
                    <Input 
                    label="Separador de decimales"
                    labelPlacement="outside"
                    type="text"
                    variant="flat"
                    value='.'
                    />
                    <Select
                    label="Zona horaria"
                    labelPlacement="outside"
                    variant="flat"
                    items={TimeZones}
                    >
                        {(times) => <SelectItem>{times.label}</SelectItem>}
                    </Select>
                </div> */}
                <DataTable label={dataInfoState.data_type + "-data-table-" + dataInfoState.data_id} data={dataInfoState.data} columns={columns} /> 
            </div>
        </motion.div>
    )
}

export default StepCustomData