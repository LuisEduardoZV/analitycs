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

const MyModalFooter = ({onClose, onBack, onContinue, viewType}: MyModalFooterProps) => {
    return (
    <ModalFooter className="flex justify-between">
        <Button className="px-4 py-2 rounded" color="danger" variant="bordered" onPress={onClose}>Cerrar</Button>
        <div className="flex gap-2 items-center">
            <AnimatePresence initial={false} mode='wait'>
                {viewType === 0 ? (
                    <MotionButton key="backButton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-4 py-2 rounded" color="secondary" variant="bordered" onPress={onBack}>
                            Regresar
                    </MotionButton>
                ) : null}
            </AnimatePresence>
            <Button className="px-4 py-2 rounded" color="primary" variant="shadow" onPress={onContinue}>
                {viewType === 1 ? 'Continuar' : 'Terminar'}
            </Button>
        </div>
    </ModalFooter>
    )
}

export default MyModalFooter