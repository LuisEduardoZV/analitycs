import { motion } from "motion/react"

import DataTable from "@/app/components/dataTable"
import { variantsModalSteps } from "@/config/variantsAnimate"

const StepCustomData = () => {
  return (
    <motion.div
      key="viewData"
      animate="active"
      className="w-full flex flex-col gap-2 max-h-[80dvh] relative"
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
        <DataTable />
      </div>
    </motion.div>
  )
}

export default StepCustomData
