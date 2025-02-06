'use client'

import { Key, useState } from "react";

import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Textarea } from "@heroui/input";
import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as NextUIModal } from "@heroui/modal";
import { Tab, Tabs } from "@heroui/tabs";

import { motion } from 'motion/react';

import { useDropzone } from "react-dropzone";

const MotionCard = motion.create(Card)

export const Modal = ({isOpen, openChange} : {isOpen: boolean, openChange: () => void}) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const [tabSelected, setTabSelected] = useState<string>('paste')

    const [pasted, setPasted] = useState<string>('')

    const [mainData, setMainData] = useState<Record<string, any>>({})

    const handleChangeTab = (key: Key) => {
        setTabSelected(key as string)
    }

    const validateData = () => {
        console.log('click');
        try {
            const data = JSON.parse(pasted)
            if (!data || !Array.isArray(data)) throw new Error('Los datos no son un JSON válido.')

            setMainData(data)
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <NextUIModal isOpen={isOpen} onOpenChange={openChange} size="5xl">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
                        </ModalHeader>
                        <ModalBody className="min-h-[500px] h-full">
                            <div className="w-full flex flex-col">
                                <section className="flex flex-col gap-2">
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
                                                <div {...getRootProps({className: 'bg-gray-100 border-dashed border-2 border-primary rounded-md p-4 min-h-[300px] flex flex-col items-center justify-center'})}>
                                                    <input {...getInputProps()} />
                                                    <p>Suelte su archivo aquí o seleccione uno de su computadora.</p>
                                                </div>
                                                <span className="text-xs text-gray-400 pl-1">Se admiten archivos JSON y CSV.</span>
                                            </div>
                                        </Tab>
                                        <Tab key='our' title='Nuestros datos'>
                                            <div className="flex justify-between items-center flex-wrap gap-y-6 p-2">
                                                <MotionCard
                                                className="w-[30%] p-2 rounded-md shadow-md h-32 flex items-center justify-center cursor-pointer"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: 'spring', stiffness: 60000, damping: 650, mass: 200 }}>
                                                    <h3 className="text-lg font-medium">Información de usuarios</h3>
                                                    <p className="text-xs text-text">
                                                        <span className="text-primary">Graficas:</span> <span className="italic">Barras, Pie</span>
                                                    </p>
                                                </MotionCard>
                                                <MotionCard 
                                                className="w-[30%] p-2 rounded-md shadow-md h-32 flex items-center justify-center cursor-pointer"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: 'spring', stiffness: 60000, damping: 650, mass: 200 }}>
                                                    <h3 className="text-lg font-medium">Tráfico de red</h3>
                                                    <p className="text-xs text-text">
                                                        <span className="text-primary">Graficas:</span> <span className="italic">Barras, Pie, Área, Líneas</span>
                                                    </p>
                                                </MotionCard>
                                                <MotionCard 
                                                className="w-[30%] p-2 rounded-md shadow-md h-32 flex items-center justify-center cursor-pointer"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: 'spring', stiffness: 60000, damping: 650, mass: 200 }}>
                                                    <h3 className="text-lg font-medium">Inventario de e-commerce</h3>
                                                    <p className="text-xs text-text">
                                                        <span className="text-primary">Graficas:</span> <span className="italic">Barras, Pie, Polar</span>
                                                    </p>
                                                </MotionCard>
                                                <MotionCard 
                                                className="w-[30%] p-2 rounded-md shadow-md h-32 flex items-center justify-center cursor-pointer"
                                                whileHover={{ scale: 1.1 }}
                                                transition={{ type: 'spring', stiffness: 60000, damping: 650, mass: 200 }}>
                                                    <h3 className="text-lg font-medium">Variados</h3>
                                                    <p className="text-xs text-text">
                                                        <span className="text-primary">Graficas:</span> <span className="italic">Barras</span>
                                                    </p>
                                                </MotionCard>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </section>
                            </div>
                        </ModalBody>
                        <ModalFooter className="flex justify-between">
                            <Button className="px-4 py-2 rounded" color="danger" variant="bordered" onClick={onClose}>Cerrar</Button>
                            <Button className="bg-secondary text-white px-4 py-2 rounded" onClick={validateData}>Continuar</Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </NextUIModal>
    )
}