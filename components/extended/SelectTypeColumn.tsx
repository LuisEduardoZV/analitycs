'use client'

import { useAppDispatch } from "@/hooks/reduxHooks"
import { MouseEvent, useState } from "react"

import { AnimatePresence, motion } from "motion/react"

import { setColumnType } from "@/store/slices/main"

const SelectTypeColumn = ({columnKey, type}: {columnKey: string, type: string}) => {
    if (columnKey === 'key') return null

    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)

    let label = 'Aa'
    switch (type) {
        case 'number':
            label = '#'
            break;
        case 'date':
            label = '📅'
            break;
        case 'country':
            label = '🌍'
            break;
        case 'boolean':
            label = '👍'
            break;
        case 'category':
            label = '🎉'
            break;
        case 'money':
            label = '$'
            break;
        case 'custom':
            label = 'Cc'
            break;
        case 'string':
        default:
            break;
    }

    const handleChangeTypeColumn = (e: MouseEvent, type: string) => {
        e.stopPropagation()
        dispatch(setColumnType({key: columnKey, type}))
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
		<>
			<div
				className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs hover:cursor-pointer italic'
				onPointerDown={(e) => {
					e.stopPropagation()
					e.preventDefault()
					setOpen(!open)
				}}>
				{label}
			</div>
			<AnimatePresence mode='wait' initial={false}>
				{open && (
					<motion.div
                        key={`modal-select-${columnKey}`}
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto', transition: { duration: 0.2, ease: 'easeIn' } }}
						exit={{ opacity: 0, height: 0 }}
                        className="absolute bg-background shadow-lg rounded-md border border-gray-300 top-10 px-1 w-full max-h-60 flex flex-col text-foreground-600 pb-1 min-w-32 z-[2]"
                        onPointerDown={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                        }}>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'cadena')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic font-light'>
                                Aa
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">Cadena</span>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'number')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic'>
                                #
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">Número</span>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'country')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic'>
                                🌍
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">País</span>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'date')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic'>
                                📅
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">Fecha</span>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'boolean')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic'>
                                👍
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">Booleano</span>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'money')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic'>
                                $
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">Moneda</span>
                        </div>
                        <div className="flex gap-1 items-center flex-row-reverse justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40" onPointerDown={(e) => {handleChangeTypeColumn(e, 'category')}}>
                            <div
                                className='bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10'>
                                🎉
                            </div>
                            <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">Categoría</span>
                        </div>
					</motion.div>
				)}
                {open && (
                    <div key='background-modal-select' className="fixed top-0 left-0  w-full h-full z-[1] " onPointerDown={(e) => {
                        e.stopPropagation()
                        handleClose()
                        }}>
                    </div>
                )}
			</AnimatePresence>
		</>
	)
}

export default SelectTypeColumn