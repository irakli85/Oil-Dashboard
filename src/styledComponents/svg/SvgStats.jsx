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

function SvgStats() {
    return (
      <svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <motion.path
          d="M4 16h2.667v12H4V16zm21.333-5.333H28V28h-2.667V10.667zm-10.666-8h2.666V28h-2.666V2.667z"
          fill="#737791"
          variants={pathVariants}
          initial='hidden'
          animate='visible'
        />
      </svg>
    )
  }
  
  export default SvgStats