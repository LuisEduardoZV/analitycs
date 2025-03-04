"use client"

import { PointerEvent, useState } from "react"

import ModalMenuTypes from "@/app/components/extended/ModalMenuTypes"
import { useAppDispatch } from "@/hooks/reduxHooks"
import { setColumnType } from "@/store/slices/main"

const SelectTypeColumn = ({
  columnKey,
  type,
}: {
  columnKey: string
  type: string
}) => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)

  let label = "Aa"

  switch (type) {
    case "number":
      label = "#"
      break
    case "date":
      label = "📅"
      break
    case "country":
      label = "🌍"
      break
    case "boolean":
      label = "👍"
      break
    case "category":
      label = "🎉"
      break
    case "money":
      label = "$"
      break
    case "custom":
      label = "Cc"
      break
    case "string":
    default:
      break
  }

  const handleChangeTypeColumn = (
    e: PointerEvent<HTMLDivElement>,
    type: string,
  ) => {
    e.stopPropagation()
    dispatch(setColumnType({ key: columnKey, type }))
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (columnKey === "key") return null

  return (
    <>
      <div
        className="text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs hover:cursor-pointer"
        onPointerDown={(e) => {
          e.stopPropagation()
          e.preventDefault()
          setOpen(!open)
        }}
      >
        {label}
      </div>
      <ModalMenuTypes
        columnKey={columnKey}
        open={open}
        onChangeType={handleChangeTypeColumn}
        onCloseModal={handleClose}
      />
    </>
  )
}

export default SelectTypeColumn
