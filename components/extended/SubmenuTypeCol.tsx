'use client'

import { useAppDispatch } from "@/hooks/reduxHooks"
import { ArrowLongRightIcon } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "motion/react"
import { PointerEvent, useMemo } from "react"

import { setColumnConfig } from "@/store/slices/main"

interface TypeColProps {
    key: string
    label: string
}

interface SubmenuTypeColProps {
    items: TypeColProps[]
    type: string
    selected: string
    columnKey: string
}

const SubmenuTypeCol = ({items, type, selected, columnKey}: SubmenuTypeColProps) => {
    if (!items.length) return null
    const dispatch = useAppDispatch()

    const opened = useMemo(() => type === selected, [type, selected])

    const handleChangeSubtype = (e: PointerEvent<HTMLDivElement>) => {
        const config = {
            type: selected,
            ...{
                ...(selected === 'date') && {parse: e.currentTarget.dataset.value as string},
                ...(selected === 'money') && {dsc: e.currentTarget.dataset.value as string},
            }
        }
        
        dispatch(setColumnConfig({key: columnKey, config}))
    }

    return (
        <AnimatePresence mode='wait' initial={false} propagate>
            {opened && (
                <motion.section 
                className="w-full flex flex-col gap-1"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } }} exit={{ opacity: 0, height: 0 }}>
                    {items.map((item, idx) => (
                        <div key={item.key} className={`relative flex items-center pl-0 py-1.5 group-hover:pl-4 group-hover:hover:pl-7 transition-all duration-200 ease-in-out group/submenu font-normal g rounded-sm ${idx % 2 === 0 ? 'bg-white' : ''}`} data-value={item.key} onPointerDown={handleChangeSubtype}>
                            <ArrowLongRightIcon className="w-4 h-4 opacity-0 group-hover/submenu:opacity-100 transition-all duration-300 ease-in-out text-softCoral-500 absolute -top-0.5 left-2 translate-y-1/2" />
                            <span>{item.label}</span>
                        </div>
                    ))}
                </motion.section>
            )}
        </AnimatePresence>
    )
}

export default SubmenuTypeCol