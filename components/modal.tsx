'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearData, setData, setDataType } from "@/store/slices/main";
import { Key, useState } from "react";

import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as NextUIModal } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Tab, Tabs } from "@heroui/tabs";

import { AnimatePresence, motion } from 'motion/react';

import { DataTypes } from "@/store/types";
import DataTable from "./dataTable";
import InforCardData from "./extended/InfoCardData";
 
import { useDropzone } from "react-dropzone";

import { DEFAULT_DATA_IDS } from "@/store/contants";

const MotionButton = motion.create(Button)

const TimeZones = [
    { key: 'UTC', label: 'UTC' },
    { key: 'CET', label: 'CET' },
    { key: 'CEST', label: 'CEST' },
    { key: 'EST', label: 'EST' },
    { key: 'EET', label: 'EET' },
    { key: 'CST', label: 'CST' },
    { key: 'CET', label: 'CET' },
    { key: 'AST', label: 'AST' },
    { key: 'AET', label: 'AET' },
    { key: 'HST', label: 'HST' },]

export const Modal = ({isOpen, openChange} : {isOpen: boolean, openChange: () => void}) => {
    const dataInfoState = useAppSelector((state) => state.dataInfo)
    const dispatch = useAppDispatch()

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [tabSelected, setTabSelected] = useState<DataTypes>(dataInfoState.data_type)

    const [pasted, setPasted] = useState<string>('')

    const variantsSteps = {
        inactive: {
            opacity: 0,
            x: 0,
            transition: { duration: 0.5, ease: 'easeOut' }
          },
          active: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
              ease: 'easeOut'
            }
          },
          exit: {
            opacity: 0,
            x: -100,
            transition: { duration: 0.4, ease: 'easeIn' }
          }
    }

    const handleChangeTab = (key: Key) => {
        dispatch(setDataType(key as string))
        setTabSelected(key as string)
    }

    const handleChangeDefaultData = (id: string) => {
        const data = require('@/store/data/defaut.json')
        const newData = data[id] || null
        
        dispatch(setData({data: newData, id}))
    }

    const isDefaultDataSelected = (id: string) => (dataInfoState.data_id === id)
    
    return (
        <NextUIModal backdrop="opaque" isOpen={isOpen} onOpenChange={openChange}className="max-w-6xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
                        </ModalHeader>
                        <ModalBody className="min-h-[500px] h-full flex flex-row relative">
                            <AnimatePresence initial={false} mode="wait">
                                {!dataInfoState.isReadyToShow && (
                                    <motion.div key='selectData' variants={variantsSteps} initial="inactive" animate={!dataInfoState.isReadyToShow ? 'active' : 'inactive'} exit={'exit'} className="w-full flex flex-col gap-2">
                                        <h2 className="text-lg font-semibold">1. Carga de datos</h2>
                                        <Tabs color="primary" selectedKey={tabSelected} onSelectionChange={handleChangeTab}>
                                            <Tab key='paste' title='Pegar datos'>
                                                <Textarea 
                                                description="Copie y pegue sus datos en este campo. Puede ser un tabular CSV o un JSON." 
                                                classNames={{input: 'min-h-[300px]'}}
                                                value={pasted} 
                                                onChange={(e) => setPasted(e.target.value)}/>
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
                                )}
                                {dataInfoState.isReadyToShow && (
                                    <motion.div key={'viewData'} variants={variantsSteps} initial={'inactive'} animate={dataInfoState.isReadyToShow ? 'active' : 'inactive'} exit={'inactive'} className="w-full flex flex-col gap-2 max-h-[60vh] relative">
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
                                           <DataTable label={tabSelected + "-" + dataInfoState.data_id} data={dataInfoState.data} columns={dataInfoState.table_columns} /> 
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </ModalBody>
                        <ModalFooter className="flex justify-between">
                            <div className="flex gap-2 items-center">
                                <Button className="px-4 py-2 rounded" color="danger" variant="bordered" onPress={() => {
                                    dispatch(clearData())
                                    onClose()
                                    }}>Cerrar</Button>
                                <AnimatePresence initial={false}>
                                    {dataInfoState.data !== null && (
                                        <MotionButton initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-2 rounded" color="secondary" variant="bordered" onPress={() => {
                                            dispatch(clearData())
                                            }}>
                                                Regresar
                                        </MotionButton>
                                    )}
                                </AnimatePresence>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </NextUIModal>
    )
}