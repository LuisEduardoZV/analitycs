import type { DataTypes, MainDataArrayType } from "@/store/types"

import { Textarea } from "@heroui/input"
import { Tab, Tabs } from "@heroui/tabs"
import { motion } from "motion/react"
import { Key, useState } from "react"
import { useDropzone } from "react-dropzone"

import InforCardData from "@/app/components/extended/InfoCardData"
import { variantsModalSteps } from "@/config/variantsAnimate"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { DEFAULT_DATA_IDS } from "@/store/contants"
import DEFAULT_DATA from "@/store/data/defaut.json"
import { setData, setDataType } from "@/store/slices/main"
import { isJSONValid } from "@/utils/utils"

type idsDefault = "usuarios" | "trafico" | "inventario"

const StepSetData = () => {
  const initType = useAppSelector((state) => state.dataInfo.data_type)
  const defaultDataId = useAppSelector((state) => state.dataInfo.data_id)

  const dispatch = useAppDispatch()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()
  const [tabSelected, setTabSelected] = useState<DataTypes>(initType)
  const [pasted, setPasted] = useState<string>("")

  const handleChangeTab = (key: Key) => {
    dispatch(setDataType(key as string))
    setTabSelected(key as string)
  }

  const isDefaultDataSelected = (id: string) => defaultDataId === id

  const handleChangeDefaultData = (id: string) => {
    let newData = DEFAULT_DATA[id as idsDefault] || null

    if (
      Array.isArray(newData) &&
      newData.length > 0 &&
      !Object.keys(newData[0]).includes("key")
    )
      newData = newData.map((item: any, idx: number) => ({
        key: idx + 1,
        ...item,
      }))

    dispatch(setData({ data: newData as MainDataArrayType, id }))
    // handleContinue()
  }

  return (
    <motion.div
      key="selectData"
      animate="active"
      className="w-full flex flex-col gap-2"
      exit="exit"
      initial="inactive"
      variants={variantsModalSteps}
    >
      <h2 className="text-lg font-semibold">1. Carga de datos</h2>
      <p className="text-sm text-default-500 dark:text-default-400 ml-1">
        Puede cargar datos desde su computadora o pegarlos directamente en el
        cuadro de texto. Contamos con datos predefinidos en caso de no contar
        con un dataset.
      </p>
      <Tabs
        color="primary"
        selectedKey={tabSelected}
        onSelectionChange={handleChangeTab}
      >
        <Tab key="paste" title="Pegar datos">
          <Textarea
            classNames={{ input: "min-h-[300px]" }}
            description="Copie y pegue sus datos en este campo. Puede ser un tabular CSV o un JSON."
            validate={(value) => {
              if (!isJSONValid(value)) {
                return "El contenido no es un JSON válido"
              }
            }}
            value={pasted}
            onChange={(e) => {
              setPasted(e.target.value)
            }}
          />
        </Tab>
        <Tab key="upload" title="Subir datos">
          <div className="flex flex-col gap-1">
            <div
              {...getRootProps({
                className:
                  "bg-default-100 hover:bg-default-200 transition-background  border-dashed border-2 border-primary rounded-md p-4 min-h-[300px] flex flex-col items-center justify-center",
              })}
            >
              <input {...getInputProps()} />
              <p>Suelte su archivo aquí o seleccione uno de su computadora.</p>
            </div>
            <span className="text-xs text-gray-400 pl-1">
              Se admiten archivos JSON y CSV.
            </span>
          </div>
        </Tab>
        <Tab key="default" title="Nuestros datos">
          <div className="flex justify-between items-center flex-wrap gap-y-6 p-2">
            {DEFAULT_DATA_IDS.map((item) => {
              const { id } = item
              const selected = isDefaultDataSelected(id)
              const key = "defaultData-card-" + id

              return (
                <InforCardData
                  key={key}
                  {...item}
                  handleChangeDefaultData={handleChangeDefaultData}
                  selected={selected}
                />
              )
            })}
          </div>
        </Tab>
      </Tabs>
    </motion.div>
  )
}

export default StepSetData
