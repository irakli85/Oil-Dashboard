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

function SvgCart() {
    return (
      <motion.svg
        width={32}
        height={32}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"        
        
      >
        <motion.path
          d="M4 4h2.667L7.2 6.667m2.133 10.666h13.334L28 6.667H7.2m2.133 10.666L7.2 6.667m2.133 10.666l-3.057 3.058c-.84.84-.245 2.276.943 2.276h15.448m0 0a2.667 2.667 0 100 5.333 2.667 2.667 0 000-5.333zM12 25.333a2.667 2.667 0 11-5.333 0 2.667 2.667 0 015.333 0z"
          stroke="#737791"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          initial='hidden'
          animate='visible'
        />
      </motion.svg>
    )
  }
  
  export default SvgCart