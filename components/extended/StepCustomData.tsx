import { motion } from "motion/react"

import { useAppSelector } from "@/hooks/reduxHooks"
import DataTable from "@/components/dataTable"
import { variantsModalSteps } from "@/config/variantsAnimate"

const StepCustomData = () => {
  const dataInfoState = useAppSelector((state) => state.dataInfo)
  const columns = useAppSelector((state) => state.dataInfo.table_columns)

  return (
    <motion.div
      key="viewData"
      animate="active"
      className="w-full flex flex-col gap-2 max-h-[60vh] relative"
      exit="exit"
      initial="inactive"
      variants={variantsModalSteps}
    >
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
        <DataTable
          columns={columns}
          data={dataInfoState.data}
          label={
            dataInfoState.data_type + "-data-table-" + dataInfoState.data_id
          }
        />
      </div>
    </motion.div>
  )
}

export default StepCustomData
