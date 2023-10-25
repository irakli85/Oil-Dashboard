import {motion} from 'framer-motion'

const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 4,
        ease: "easeInOut"
      }
    }
  }

function SvgMeasure() {
    return (
      <motion.svg
        width="32px"
        height="32px"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        variants={pathVariants}
        initial='hidden'
        animate='visible'        
      >
        <defs>
          <style>{".cls-1{fill:#737791}.cls-2{fill:#737791}"}</style>
        </defs>
        <g data-name="19. Ruler and Pencil" id="_19._Ruler_and_Pencil">
          <motion.path
            variants={pathVariants}
            className="cls-1"
            d="M16 7h-3a1 1 0 010-2h3a1 1 0 010 2zM16 12h-3a1 1 0 010-2h3a1 1 0 010 2zM16 17h-3a1 1 0 010-2h3a1 1 0 010 2zM16 22h-3a1 1 0 010-2h3a1 1 0 010 2zM16 27h-3a1 1 0 010-2h3a1 1 0 010 2z"
          />
          <motion.path
            variants={pathVariants}
            className="cls-2"
            d="M14 32H8a3 3 0 01-3-3v-4a1 1 0 012 0v4a1 1 0 001 1h6a1 1 0 001-1V3a1 1 0 00-1-1H8a1 1 0 00-1 1v18a1 1 0 01-2 0V3a3 3 0 013-3h6a3 3 0 013 3v26a3 3 0 01-3 3zM23 32a1 1 0 01-.857-.485l-3-5A1 1 0 0119 26V4a4 4 0 018 0v2a1 1 0 01-2 0V4a2 2 0 00-4 0v21.723l2 3.333 2-3.333V10a1 1 0 012 0v16a1 1 0 01-.143.515l-3 5A1 1 0 0123 32z"
          />
          <motion.path
            variants={pathVariants}
            className="cls-2"
            d="M26 27h-6a1 1 0 010-2h6a1 1 0 010 2zM26 7h-6a1 1 0 010-2h6a1 1 0 010 2z"
          />
        </g>
      </motion.svg>
    )
  }
  
  export default SvgMeasure