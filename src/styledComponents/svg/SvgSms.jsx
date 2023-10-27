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

function SvgSms({isClicked}) {
    return (
      <svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        
      >
        <motion.path
          d="M26.667 2.667H5.333a2.675 2.675 0 00-2.666 2.666v24L8 24h18.667c1.466 0 2.666-1.2 2.666-2.667v-16c0-1.466-1.2-2.666-2.666-2.666zm0 18.666H6.933l-1.6 1.6v-17.6h21.334v16zm-4-6.666H20V12h2.667v2.667zm-5.334 0h-2.666V12h2.666v2.667zm-5.333 0H9.333V12H12"
          fill={isClicked ? "#1aac83": "#737791"}
          variants={pathVariants}
          initial='hidden'
          animate='visible'
        />
      </svg>
    )
  }
  
  export default SvgSms