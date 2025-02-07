'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearData, setData, setDataId } from "@/store/slices/main";
import { Key, useState } from "react";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as NextUIModal } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";

import { AnimatePresence, motion } from 'motion/react';

import InforCardData from "./extended/InfoCardData";
 
import { useDropzone } from "react-dropzone";

const MotionCard = motion.create(Card)
const MotionButton = motion.create(Button)

const DEFAULT_DATA_IDS = [{id: 'usuarios',
    title: 'Información de usuarios',
    graphTypes: ['Barras', 'Pie'],
}, {id: 'trafico',
    title: 'Tráfico de red',
    graphTypes: ['Barras', 'Pie', 'Área', 'Líneas'],
}, {id: 'inventario',
    title: 'Inventario de e-commerce',
    graphTypes: ['Barras', 'Pie', 'Polar'],
}]

export const Modal = ({isOpen, openChange} : {isOpen: boolean, openChange: () => void}) => {
    const dispatch = useAppDispatch()
    const mainState = useAppSelector((state) => state.main)

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [tabSelected, setTabSelected] = useState<string>('paste')

    const [pasted, setPasted] = useState<string>('')

    const [mainData, setMainData] = useState<Record<string, any>>({})

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
        setTabSelected(key as string)
    }

    const validateData = () => {
        try {
            const data = JSON.parse(pasted)
            if (!data || !Array.isArray(data)) throw new Error('Los datos no son un JSON válido.')

            setMainData(data)
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeDefaultData = (id: string) => {
        const data = require('@/store/data/defaut.json')
        const newData = data[id] || null

        dispatch(setDataId(id))
        dispatch(setData(newData))
    }

    const isDefaultDataSelected = (id: string) => (mainState.data_id === id)

    return (
        <NextUIModal backdrop="opaque" isOpen={isOpen} onOpenChange={openChange} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
                        </ModalHeader>
                        <ModalBody className="min-h-[500px] h-full flex flex-row">
                            <AnimatePresence initial={false} mode="wait">
                                {!mainState.data && (
                                    <motion.div key='selectData' variants={variantsSteps} initial="inactive" animate={!mainState.data ? 'active' : 'inactive'} exit={'exit'} className="w-full flex flex-col gap-2">
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
                                            <Tab key='our' title='Nuestros datos'>
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
                                {mainState.data && (
                                    <motion.div key={'viewData'} variants={variantsSteps} initial={'inactive'} animate={mainState.data ? 'active' : 'inactive'} exit={'inactive'} className="w-full flex flex-col gap-2">
                                        <h2 className="text-lg font-semibold">2. Vista previa de datos</h2>
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
                                    {mainState.data !== null && (
                                        <MotionButton initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-2 rounded" color="secondary" variant="bordered" onPress={() => {
                                            dispatch(clearData())
                                            }}>
                                                Regresar
                                        </MotionButton>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* <Button className="bg-secondary text-white px-4 py-2 rounded" onPress={validateData}>Continuar</Button> */}
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
            {/* <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
                </ModalHeader>
                <ModalBody className="min-h-[500px] h-full">
                    nueva
                </ModalBody>
            </ModalContent> */}
        </NextUIModal>
    )
}