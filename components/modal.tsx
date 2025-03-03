'use client'

import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { clearData } from "@/store/slices/main";
import { useState } from "react";

import { ModalBody, ModalContent, ModalHeader, Modal as NextUIModal } from "@heroui/modal";

import { AnimatePresence, motion } from 'motion/react';

import MyModalFooter from "./extended/MyModalFooter";
import StepCustomData from "./extended/StepCustomData";
import StepSetData from "./extended/StepSetData";

import { variantsModalSteps } from "@/config/variantsAnimate";

export const Modal = ({isOpen, openChange} : {isOpen: boolean, openChange: () => void}) => {
    const hasInfo = useAppSelector((state) => state.dataInfo.isReadyToShow)
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
    console.log(modalView);
    console.log(hasInfo);
    
    return (
        <NextUIModal backdrop="opaque" isOpen={isOpen} onOpenChange={openChange}className={`max-w-6xl transition-all duration-300 ease-in-out`}>
            <ModalContent className="transition-height duration-200 ease-in-out">
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
                        </ModalHeader>
                        <ModalBody className="min-h-[500px] h-full flex flex-col relative transition-height duration-200 ease-in-out">
                            <AnimatePresence mode="wait">
                                {modalView === 1 ? (
                                    <motion.div key="stepSetData" variants={variantsModalSteps} initial="active" animate='active' exit='exit'>
                                        <StepSetData handleContinue={handleContinueModal}/>
                                    </motion.div>
                                ) : (
                                    <motion.div key="stepCustomData" variants={variantsModalSteps} initial='inactive' animate={'active'} exit='exit'>
                                        <StepCustomData />
                                    </motion.div>
                                )}
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