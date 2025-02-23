import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Key, useState } from "react";

import { Textarea } from "@heroui/input";
import { Tab, Tabs } from "@heroui/tabs";
import { motion } from "motion/react";
import { useDropzone } from "react-dropzone";

import { variantsModalSteps } from "@/config/variantsAnimate";
import { DataTypes } from "@/store/types";
import { isJSONValid } from "@/utils/utils";
import { DEFAULT_DATA_IDS } from '../../store/contants';
import InforCardData from "./InfoCardData";

import { setData, setDataType } from "@/store/slices/main";

interface StepSetDataProps {
    view: number,
    handleContinue: () => void
}

const StepSetData = ({ view, handleContinue }: StepSetDataProps) => {
    const initType = useAppSelector((state) => state.dataInfo.data_type)
    const defaultDataId = useAppSelector((state) => state.dataInfo.data_id)

    const dispatch = useAppDispatch()
    
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [tabSelected, setTabSelected] = useState<DataTypes>(initType)
    const [pasted, setPasted] = useState<string>('')

    const handleChangeTab = (key: Key) => {
        dispatch(setDataType(key as string))
        setTabSelected(key as string)
    }

    const isDefaultDataSelected = (id: string) => (defaultDataId === id)

    const handleChangeDefaultData = (id: string) => {
        const data = require('@/store/data/defaut.json')
        let newData = data[id] || null

        if (Array.isArray(newData) && newData.length > 0 && !newData[0]?.key) newData = newData.map((item: any, idx: number) => ({ key: idx + 1, ...item }))
        
        dispatch(setData({data: newData, id}))
        handleContinue()
    }
    
    if(view)
    return (
        <motion.div key='selectData' variants={variantsModalSteps} initial="inactive" animate={view ? 'active' : 'inactive'} exit={'exit'} className="w-full flex flex-col gap-2">
            <h2 className="text-lg font-semibold">1. Carga de datos</h2>
            <Tabs color="primary" selectedKey={tabSelected} onSelectionChange={handleChangeTab}>
                <Tab key='paste' title='Pegar datos'>
                    <Textarea 
                    description="Copie y pegue sus datos en este campo. Puede ser un tabular CSV o un JSON." 
                    classNames={{input: 'min-h-[300px]'}}
                    value={pasted} 
                    onChange={(e) => {
                        setPasted(e.target.value)
                    }}
                    validate={(value) => {
                        if (!isJSONValid(value)) {
                            return "El contenido no es un JSON válido"
                        }
                    }}
                    />
                </Tab>
                <Tab key='upload' title='Subir datos'>
                    <div className="flex flex-col gap-1">
                        <div {...getRootProps({className: 'bg-default-100 hover:bg-default-200 transition-background  border-dashed border-2 border-primary rounded-md p-4 min-h-[300px] flex flex-col items-center justify-center'})}>
                            <input {...getInputProps()} />
                            <p>Suelte su archivo aquí o seleccione uno de su computadora.</p>
                        </div>
                        <span className="text-xs text-gray-400 pl-1">Se admiten archivos JSON y CSV.</span>
                    </div>
                </Tab>
                <Tab key='default' title='Nuestros datos'>
                    <div className="flex justify-between items-center flex-wrap gap-y-6 p-2">
                        {DEFAULT_DATA_IDS.map((item) => {
                            const { id } = item
                            const selected  = isDefaultDataSelected(id)
                            const key = 'defaultData-card-' + id

                            return (
                                <InforCardData 
                                key={key}
                                {...item} 
                                selected={selected} 
                                handleChangeDefaultData={handleChangeDefaultData} />
                            )
                        })}
                    </div>
                </Tab>
            </Tabs>
        </motion.div>
    )
}

export default StepSetData