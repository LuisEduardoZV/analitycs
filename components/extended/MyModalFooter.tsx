import { Button } from "@heroui/button"
import { ModalFooter } from "@heroui/modal"

import { AnimatePresence, motion } from "motion/react"

const MotionButton = motion.create(Button)

interface MyModalFooterProps {
    onClose: () => void,
    onBack: () => void,
    hasValidData: boolean
}

const MyModalFooter = ({onClose, onBack, hasValidData}: MyModalFooterProps) => {
    return (
    <ModalFooter className="flex justify-between">
        <div className="flex gap-2 items-center">
            <Button className="px-4 py-2 rounded" color="danger" variant="bordered" onPress={onClose}>Cerrar</Button>
            <AnimatePresence>
                {hasValidData !== null && (
                    <MotionButton initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-2 rounded" color="secondary" variant="bordered" onPress={onBack}>
                            Regresar
                    </MotionButton>
                )}
            </AnimatePresence>
        </div>
    </ModalFooter>
    )
}

export default MyModalFooter