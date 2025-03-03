export const variantsModalSteps = {
  inactive: {
    opacity: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  active: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: "easeIn" },
  },
}
