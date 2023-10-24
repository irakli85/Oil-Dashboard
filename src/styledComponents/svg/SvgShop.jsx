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


function SvgShop() {
    return (
      <svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <motion.path
          d="M25.333 8h-2.666c0-3.733-2.934-6.667-6.667-6.667-3.733 0-6.667 2.934-6.667 6.667H6.667A2.675 2.675 0 004 10.667v16c0 1.466 1.2 2.666 2.667 2.666h18.666c1.467 0 2.667-1.2 2.667-2.666v-16C28 9.2 26.8 8 25.333 8zM16 4c2.267 0 4 1.733 4 4h-8c0-2.267 1.733-4 4-4zm9.333 22.667H6.667v-16h18.666v16zM16 16c-2.267 0-4-1.733-4-4H9.333c0 3.733 2.934 6.667 6.667 6.667 3.733 0 6.667-2.934 6.667-6.667H20c0 2.267-1.733 4-4 4z"
          fill="#737791"
          variants={pathVariants}
          initial='hidden'
          animate='visible'
        />
      </svg>
    )
  }
  
  export default SvgShop