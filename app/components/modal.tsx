"use client"

import {
    ModalBody,
    ModalContent,
    ModalHeader,
    Modal as NextUIModal,
} from "@heroui/modal"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import MyModalFooter from "@/app/components/extended/MyModalFooter"
import StepCustomData from "@/app/components/extended/StepCustomData"
import StepSetData from "@/app/components/extended/StepSetData"
import { variantsModalSteps } from "@/config/variantsAnimate"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks"
import { clearData } from "@/store/slices/main"

export const Modal = ({
  isOpen,
  openChange,
}: {
  isOpen: boolean
  openChange: () => void
}) => {
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

  return (
    <NextUIModal
      backdrop="opaque"
      className={`max-w-6xl transition-all duration-300 ease-in-out`}
      isOpen={isOpen}
      onOpenChange={openChange}
    >
      <ModalContent className="transition-height duration-200 ease-in-out">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Personaliza tu gráfico</h1>
            </ModalHeader>
            <ModalBody className="min-h-[500px] h-full flex flex-col relative transition-height duration-200 ease-in-out">
              <AnimatePresence mode="wait">
                {modalView === 1 ? (
                  <motion.div
                    key="stepSetData"
                    animate="active"
                    exit="exit"
                    initial="active"
                    variants={variantsModalSteps}
                  >
                    <StepSetData handleContinue={handleContinueModal} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="stepCustomData"
                    animate={"active"}
                    exit="exit"
                    initial="inactive"
                    variants={variantsModalSteps}
                  >
                    <StepCustomData />
                  </motion.div>
                )}
              </AnimatePresence>
            </ModalBody>
            <MyModalFooter
              viewType={modalView}
              onBack={handleBackModal}
              onClose={() => {
                handleCloseModal(onClose)
              }}
              onContinue={handleContinueModal}
            />
          </>
        )}
      </ModalContent>
    </NextUIModal>
  )
}
