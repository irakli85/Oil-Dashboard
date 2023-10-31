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

  function SvgDocs({isClicked}) {
    return (
      <motion.svg
        fill={isClicked ? "#1aac83": "#737791"}
        xmlns="http://www.w3.org/2000/svg"
        width="32px"
        height="32px"
        viewBox="0 0 52 52"
        variants={pathVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.path d="M46 14H23.3c-1.4 0-2.7-.8-3.5-2l-3.5-6c-.7-1.2-2-2-3.5-2H6C3.8 4 2 5.8 2 8v36c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V18c0-2.2-1.8-4-4-4z"
        variants={pathVariants}

         />
        <motion.path d="M46 6H21.9c-.4 0-.6.4-.4.7l1.6 2.7c.2.4.5.6.9.6h22c1.1 0 2.2.2 3.1.6.4.2.9-.1.9-.6 0-2.2-1.8-4-4-4z" 
        variants={pathVariants}

        />
      </motion.svg>
    )
  }
  
  export default SvgDocs
  