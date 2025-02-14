export const variantsModalSteps = {
    inactive: {
        opacity: 0,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
      },
      active: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
          ease: 'easeOut'
        }
      },
      exit: {
        opacity: 0,
        x: -100,
        transition: { duration: 0.4, ease: 'easeIn' }
      }
}