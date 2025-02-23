'use client'
import { AnimatePresence, motion } from "motion/react"
import { PointerEvent, useState } from "react"

import MenuTypeItem from "./MenuTypeItem"

const TypesOfDates = [
    { key: 'YYYY/MM/DD', label: 'YYYY/MM/DD' },
    { key: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { key: 'MM/YYYY', label: 'MM/YYYY' },
    { key: 'YYYY/MM', label: 'YYYY/MM' },
    { key: 'DD/MM', label: 'DD/MM' },
    { key: 'MM/DD', label: 'MM/DD' },
    { key: 'YYYY/MM/DD HH:mm', label: 'YYYY/MM/DD HH:mm' },
]

const TypesOfMoney = [
    { key: '$', label: '$' },
    { key: '€', label: '€' },
    { key: '¥', label: '¥' },
    { key: '£', label: '£' },
    { key: '₹', label: '₹' },
    { key: '₩', label: '₩' },
    { key: '₪', label: '₪' },
    { key: '元', label: '元' },
]

const items = [
    { key: 'number', icon: '#', label: 'Número', hasSubmenu: false, items: null },
    { key: 'date', icon: '📅', label: 'Fecha', hasSubmenu: true, items: TypesOfDates },
    { key: 'country', icon: '🌍', label: 'País', hasSubmenu: false, items: null },
    { key: 'boolean', icon: '👍', label: 'Booleano', hasSubmenu: false, items: null },
    { key: 'category', icon: '🎉', label: 'Categoría', hasSubmenu: false, items: null },
    { key: 'money', icon: '$', label: 'Dinero', hasSubmenu: true, items: TypesOfMoney },
    { key: 'custom', icon: 'Cc', label: 'Personalizado', hasSubmenu: false, items: null }
]

type onChangeType = (e: PointerEvent<HTMLDivElement>, type: string) => void

interface ModalMenuTypesProps {
    open: boolean,
    columnKey: string,
    onCloseModal: () => void
    onChangeType: onChangeType
}

const ModalMenuTypes = ({open, columnKey, onCloseModal, onChangeType}: ModalMenuTypesProps) => {
    const [typeOpened, setTypeOpened] = useState('')

    const handleOpenSubmenu = (e: PointerEvent<HTMLDivElement>,type: string) => {
        if (type === typeOpened) setTypeOpened('')
        else setTypeOpened(type)
    }

    return (
        <AnimatePresence mode='wait' initial={false} propagate>
            {open && (
                <>
                    <motion.div
                        key={`modal-select-${columnKey}`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } }}
                        exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeOut' } }}
                        className="absolute bg-background shadow-lg rounded-md border border-gray-300 top-10 px-1 w-full max-h-72 flex flex-col text-foreground-600 pb-1 min-w-32 z-[2] overflow-y-auto gap-1"
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                        {items.map((op) => {
                            const onClickItem = op.hasSubmenu ? handleOpenSubmenu : onChangeType
                            
                            return (
                                <MenuTypeItem hasSubmenu={op.hasSubmenu} icon={op.icon} key={op.key} label={op.label} selected={typeOpened} type={op.key} items={op.items} onChangeType={onClickItem}/>
                            )
                        })}
                    </motion.div>

                    <motion.div key={`background-modal-select-${columnKey}`} className="fixed top-0 left-0 w-full h-full z-[1]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }}  onPointerDown={(e) => {
                    e.stopPropagation()
                    onCloseModal()
                    }}>
                </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default ModalMenuTypes