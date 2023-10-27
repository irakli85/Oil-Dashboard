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


function SvgChart({isClicked}) {
    return (
      <motion.svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        variants={pathVariants}
        initial='hidden'
        animate='visible'
      >
        <g
          stroke={isClicked ? "#1aac83": "#737791"}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path variants={pathVariants} d="M28 26.667H4v-20" />
          <motion.path variants={pathVariants} d="M28 9.333l-10.667 9.334L12 13.333 4 20" />
        </g>
      </motion.svg>
    )
  }
  
  export default SvgChart