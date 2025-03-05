"use client"

import {
  ModalBody,
  ModalContent,
  ModalHeader,
  Modal as NextUIModal,
} from "@heroui/modal"
import clsx from "clsx"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

import MyModalFooter from "@/app/components/extended/MyModalFooter"
import StepCustomData from "@/app/components/extended/StepCustomData"
import StepSetData from "@/app/components/extended/StepSetData"
import { variantsModalSteps } from "@/config/variantsAnimate"
import { useAppDispatch } from "@/hooks/reduxHooks"
import { clearData } from "@/store/slices/main"

export const Modal = ({
  isOpen,
  openChange,
}: {
  isOpen: boolean
  openChange: () => void
}) => {
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
      backdrop="blur"
      className={clsx("transition-all duration-500 ease-soft-spring", {
        "w-full my-0 mx-0 sm:my-0 sm:mx-0 max-w-full h-[100dvh] min-h-[100dvh] py-3 px-5":
          modalView === 0,
        "max-w-6xl max-h-[70dvh] h-full": modalView === 1,
      })}
      isOpen={isOpen}
      onOpenChange={openChange}
    >
      <ModalContent className="transition-height duration-200 ease-in-out">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">
                Selección y personalización de datos para graficar
              </h1>
            </ModalHeader>
            <ModalBody className="h-full flex flex-col relative transition-height duration-200 ease-in-out">
              <AnimatePresence mode="wait">
                {modalView === 1 ? (
                  <motion.div
                    key="stepSetData"
                    animate="active"
                    exit="exit"
                    initial="active"
                    variants={variantsModalSteps}
                  >
                    <StepSetData />
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
