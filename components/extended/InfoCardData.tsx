import { motion } from "motion/react"
import PropTypes from "prop-types"
import { Card, CardProps } from "@heroui/card"

const MotionCard = motion.create(Card)

interface MotionCardProps extends CardProps {
  handleChangeDefaultData: (id: string) => void
  selected: boolean
  id: string
  title: string
  graphTypes: Array<string>
}

const InforCardData = ({
  selected,
  id,
  handleChangeDefaultData,
  title,
  graphTypes,
}: MotionCardProps) => {
  const graphTypesString = graphTypes.join(", ")

  return (
    <MotionCard
      className={`w-[30%] p-2 rounded-lg shadow-md h-32 flex items-center justify-center cursor-pointer bg-default-100/20 hover:bg-default-100/50 ${selected ? "outline outline-2 outline-primary" : ""}`}
      transition={{ type: "spring", stiffness: 60000, damping: 650, mass: 200 }}
      whileHover={{ scale: 1.1 }}
      onTap={() => {
        if (!selected) handleChangeDefaultData(id)
      }}
    >
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-xs text-text">
        <span className="text-primary">Gráficas:</span>{" "}
        <span className="italic">{graphTypesString}</span>
      </p>
    </MotionCard>
  )
}

InforCardData.propTypes = {
  handleChangeDefaultData: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.string,
  title: PropTypes.string,
  graphTypes: PropTypes.array,
}

export default InforCardData
