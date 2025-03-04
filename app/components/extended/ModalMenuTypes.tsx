"use client"
import { AnimatePresence, motion } from "motion/react"
import { PointerEvent, useState } from "react"

import MenuTypeItem from "@/app/components/extended/MenuTypeItem"
import { itemsTypesColumns } from "@/store/contants"

type onChangeType = (e: PointerEvent<HTMLDivElement>, type: string) => void

interface ModalMenuTypesProps {
  open: boolean
  columnKey: string
  onCloseModal: () => void
  onChangeType: onChangeType
}

const ModalMenuTypes = ({
  open,
  columnKey,
  onCloseModal,
  onChangeType,
}: ModalMenuTypesProps) => {
  const [typeOpened, setTypeOpened] = useState("")

  const handleOpenSubmenu = (e: PointerEvent<HTMLDivElement>, type: string) => {
    if (type === typeOpened) setTypeOpened("")
    else setTypeOpened(type)
  }

  return (
    <AnimatePresence initial={false} mode="wait">
      {open && (
        <>
          <motion.div
            key={`modal-select-${columnKey}`}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            className="absolute bg-background shadow-lg rounded-md border border-gray-300 top-10 px-1 w-full max-h-72 flex flex-col text-foreground-600 pb-1 min-w-32 z-[2] overflow-y-auto gap-1"
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            initial={{ opacity: 0, height: 0 }}
            onPointerDown={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            {itemsTypesColumns.map((op) => {
              const onClickItem = op.hasSubmenu
                ? handleOpenSubmenu
                : onChangeType

              return (
                <MenuTypeItem
                  key={op.key}
                  columnKey={columnKey}
                  hasSubmenu={op.hasSubmenu}
                  icon={op.icon}
                  items={op.items}
                  label={op.label}
                  selected={typeOpened}
                  type={op.key}
                  onChangeType={onClickItem}
                />
              )
            })}
          </motion.div>

          <motion.div
            key={`background-modal-select-${columnKey}`}
            animate={{ opacity: 1 }}
            className="fixed top-0 left-0 w-full h-full z-[1]"
            exit={{ opacity: 0, height: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onPointerDown={(e) => {
              e.stopPropagation()
              onCloseModal()
            }}
          />
        </>
      )}
    </AnimatePresence>
  )
}

export default ModalMenuTypes
