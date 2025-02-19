'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearData } from "@/store/slices/main";
import { useState } from "react";

import { Form } from "@heroui/form";
import { ModalBody, ModalContent, ModalHeader, Modal as NextUIModal } from "@heroui/modal";

import { AnimatePresence } from 'motion/react';

import { modal } from "@heroui/theme";
import MyModalFooter from "./extended/MyModalFooter";
import StepCustomData from "./extended/StepCustomData";
import StepSetData from "./extended/StepSetData";

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

    const [modalView, setModalView] = useState<number>(1)

    const handleCloseModal = (closeModal: () => void) => {
        dispatch(clearData())
        closeModal()
        setModalView(1)
    }

    const handleBackModal = () => {
        setModalView(1)
        dispatch(clearData())
    }

    const handleContinueModal = () => {
        setModalView(0)
    }
    
    return (
        <NextUIModal backdrop="opaque" isOpen={isOpen} onOpenChange={openChange}className="max-w-6xl transition-height duration-200 ease-in-out">
            <ModalContent className="transition-height duration-200 ease-in-out">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
                        </ModalHeader>
                        <ModalBody className="min-h-[500px] h-full flex flex-col relative transition-height duration-200 ease-in-out">
                            <AnimatePresence>
                                <StepSetData key="stepSetData" view={modalView} handleContinue={handleContinueModal}/>
                                <StepCustomData key="stepCustomData" view={modalView} />
                            </AnimatePresence>
                        </ModalBody>
                        <MyModalFooter onClose={() => {
                            handleCloseModal(onClose)
                        }} onBack={handleBackModal} onContinue={handleContinueModal} viewType={modalView} />
                    </>
                )}
            </ModalContent>
        </NextUIModal>
    )
}