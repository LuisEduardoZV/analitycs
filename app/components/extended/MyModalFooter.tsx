"use client"

import { Button } from "@heroui/button"
import { ModalFooter } from "@heroui/modal"
import { AnimatePresence, motion } from "motion/react"

const MotionButton = motion.create(Button)

interface MyModalFooterProps {
  onClose: () => void
  onBack: () => void
  onContinue: () => void
  viewType: number
}

const MyModalFooter = ({
  onClose,
  onBack,
  onContinue,
  viewType,
}: MyModalFooterProps) => {
  return (
    <ModalFooter className="flex justify-between">
      <Button
        className="px-4 py-2 rounded"
        color="danger"
        variant="bordered"
        onPress={onClose}
      >
        Cerrar
      </Button>
      <AnimatePresence>
        <div className="flex gap-2 items-center">
          {viewType === 0 && (
            <MotionButton
              key="backButton"
              animate={{ opacity: 1 }}
              className="px-4 py-2 rounded"
              color="secondary"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              variant="bordered"
              onPress={onBack}
            >
              Regresar
            </MotionButton>
          )}
          <Button
            className="px-4 py-2 rounded"
            color="primary"
            variant="shadow"
            onPress={onContinue}
          >
            {viewType === 1 ? "Continuar" : "Terminar"}
          </Button>
        </div>
      </AnimatePresence>
    </ModalFooter>
  )
}

export default MyModalFooter
