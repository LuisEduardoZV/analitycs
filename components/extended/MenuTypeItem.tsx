import { PointerEvent } from "react"

import SubmenuTypeCol from "@/components/extended/SubmenuTypeCol"

type onChangeType = (e: PointerEvent<HTMLDivElement>, type: string) => void

interface TypeColProps {
  key: string
  label: string
}

interface MenuTypeItemProps {
  label: string
  type: string
  selected: string
  icon: string
  hasSubmenu: boolean
  items?: TypeColProps[] | null
  onChangeType: onChangeType
  columnKey: string
}

const MenuTypeItem = ({
  label,
  icon,
  hasSubmenu,
  items,
  type,
  selected,
  columnKey,
  onChangeType,
}: MenuTypeItemProps) => {
  return (
    <div
      className="flex gap-1 items-center flex-row-reverse flex-wrap justify-between p-1 after:contents[''] after:w-4/5 after:border-b-1 after:border-default-200/45 after:absolute relative after:bottom-0 after:left-0 hover:cursor-pointer after:transition-all after:duration-700 after:ease-in-out group hover:after:w-full hover:after:border-b-secondary/40"
      onPointerDown={(e) => {
        onChangeType(e, type)
      }}
    >
      <div className="bg-gray-100/20 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center border border-gray-300 text-xs z-10 italic font-light">
        {icon}
      </div>
      <span className="pl-0 group-hover:pl-3 transition-all duration-200 ease-in-out">
        {label}
      </span>
      {hasSubmenu && items && (
        <SubmenuTypeCol
          columnKey={columnKey}
          items={items}
          selected={selected}
          type={type}
        />
      )}
    </div>
  )
}

export default MenuTypeItem
