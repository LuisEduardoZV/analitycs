import { Accordion, AccordionItem } from "@heroui/accordion"
import { Input } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import { motion } from "motion/react"

import DataTable from "@/app/components/dataTable"
import { variantsModalSteps } from "@/config/variantsAnimate"
import { useAppSelector } from "@/hooks/reduxHooks"
import { TIMEZONES_AVAILABLE } from "@/store/contants"

const StepCustomData = () => {
  const columns = useAppSelector((state) => state.dataInfo.table_columns)

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
      <div className="w-full overflow-y-auto p-3 flex relative gap-5">
        <div className="w-full flex justify-between flex-col max-h-max h-min sticky top-0 max-w-[20%] gap-10">
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-textSecondary">
              Parseo de datos
            </h4>
            <Input
              label="Separador de miles"
              labelPlacement="outside"
              type="text"
              value=","
              variant="flat"
            />
            <Input
              label="Separador de decimales"
              labelPlacement="outside"
              type="text"
              value="."
              variant="flat"
            />
            <Select
              items={TIMEZONES_AVAILABLE}
              label="Zona horaria"
              labelPlacement="outside"
              variant="flat"
            >
              {(times) => <SelectItem>{times.label}</SelectItem>}
            </Select>
          </div>
          <div className="flex flex-col gap-2 overflow-y-auto pb-5 px-1">
            <h4 className="font-semibold text-textSecondary">
              Información extra por columna
            </h4>
            <Accordion
              isCompact
              itemClasses={{
                title: "text-sm font-normal",
                base: "py-1 w-full bg-transparent border-0",
                trigger:
                  "px-2 py-2 data-[hover=true]:bg-default-100 rounded-lg h-min flex items-center",
                indicator: "text-medium text-secondary",
                content: "text-small px-2",
              }}
              showDivider={false}
              variant="light"
            >
              {columns &&
                columns.map((config) => {
                  if (config.type === "string") return null
                  if (config.key === "key") return null

                  return (
                    <AccordionItem
                      key={config.key}
                      aria-label={config.label}
                      title={config.label}
                    >
                      <Input
                        label="Descriptor de valor"
                        labelPlacement="inside"
                        type="text"
                        value={config.dsc || ""}
                        variant="flat"
                      />
                    </AccordionItem>
                  )
                })}
            </Accordion>
          </div>
        </div>
        <DataTable />
      </div>
    </motion.div>
  )
}

export default StepCustomData
