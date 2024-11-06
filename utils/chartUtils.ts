export type ColorUtility = "bg" | "stroke" | "fill" | "text"

export const chartColors = {
  blue: {
    bg: "bg-aquaBlue-600",
    stroke: "stroke-aquaBlue-600",
    fill: "fill-aquaBlue-600",
    text: "text-aquaBlue-600",
  },
  emerald: {
    bg: "bg-limeGreen-600",
    stroke: "stroke-limeGreen-600",
    fill: "fill-limeGreen-600",
    text: "text-limeGreen-600",
  },
  violet: {
    bg: "bg-electricPurple-600",
    stroke: "stroke-electricPurple-600",
    fill: "fill-electricPurple-600",
    text: "text-electricPurple-600",
  },
  amber: {
    bg: "bg-warmYellow-600",
    stroke: "stroke-warmYellow-600",
    fill: "fill-warmYellow-600",
    text: "text-warmYellow-600",
  },
  cyan: {
    bg: "bg-deepIndigo-600",
    stroke: "stroke-deepIndigo-600",
    fill: "fill-deepIndigo-600",
    text: "text-deepIndigo-600",
  },
  pink: {
    bg: "bg-softCoral-600",
    stroke: "stroke-softCoral-600",
    fill: "fill-softCoral-600",
    text: "text-softCoral-600",
  },
  fuchsia: {
    bg: "bg-blushPink-600",
    stroke: "stroke-blushPink-600",
    fill: "fill-blushPink-600",
    text: "text-blushPink-600",
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string
  }
}

export type AvailableChartColorsKeys = keyof typeof chartColors

export const AvailableChartColors: AvailableChartColorsKeys[] = Object.keys(
  chartColors,
) as Array<AvailableChartColorsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableChartColorsKeys[],
): Map<string, AvailableChartColorsKeys> => {
  const categoryColors = new Map<string, AvailableChartColorsKeys>()

  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })

  return categoryColors
}

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    bg: "bg-gray-500",
    stroke: "stroke-gray-500",
    fill: "fill-gray-500",
    text: "text-gray-500",
  }

  return chartColors[color]?.[type] ?? fallbackColor[type]
}

export const getYAxisDomain = (
  autoMinValue: boolean,
  minValue: number | undefined,
  maxValue: number | undefined,
) => {
  const minDomain = autoMinValue ? "auto" : (minValue ?? 0)
  const maxDomain = maxValue ?? "auto"

  return [minDomain, maxDomain]
}

export function hasOnlyOneValueForKey(
  array: any[],
  keyToCheck: string,
): boolean {
  const val: any[] = []

  for (const obj of array) {
    if (Object.prototype.hasOwnProperty.call(obj, keyToCheck)) {
      val.push(obj[keyToCheck])
      if (val.length > 1) {
        return false
      }
    }
  }

  return true
}
