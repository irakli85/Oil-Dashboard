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

function SvgTank({isClicked}) {
    return (
      <svg
        fill={isClicked ? "#1aac83": "#737791"}
        height="32px"
        width="32px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 189.975 189.975"
        xmlSpace="preserve"
        
      >
        <motion.path d="M165.916 179.975h-2.506v-50.036c2.551-.227 4.559-2.345 4.559-4.956s-2.007-4.729-4.559-4.956v-50.08c2.551-.227 4.559-2.345 4.559-4.956s-2.007-4.729-4.559-4.956V10h2.506a5 5 0 000-10H24.059a5 5 0 000 10h2.506v50.036c-2.551.227-4.559 2.345-4.559 4.956s2.008 4.729 4.559 4.956v50.08c-2.551.227-4.559 2.345-4.559 4.956s2.008 4.729 4.559 4.956v50.036h-2.506a5 5 0 000 10h141.857a5 5 0 000-10.001zm-32.31-84.398c0 21.294-17.324 38.618-38.618 38.618S56.37 116.871 56.37 95.577s17.324-38.618 38.618-38.618 38.618 17.324 38.618 38.618zm-88.451 80.331a5 5 0 01-10 0v-40.42a5 5 0 0110 0v40.42zm0-62.671a5 5 0 01-10 0V74.336a5 5 0 0110 0v38.901zm0-60.75a5 5 0 01-10 0V13.666a5 5 0 0110 0v38.821zm67.604 52.553c0 9.799-7.972 17.771-17.771 17.771s-17.771-7.972-17.771-17.771a17.673 17.673 0 011.36-6.808l11.824-27.251a5 5 0 014.587-3.01h.003a5 5 0 014.586 3.015l12.021 27.79c.044.101.084.204.121.307a17.72 17.72 0 011.04 5.957z"
        variants={pathVariants}
        initial='hidden'
        animate='visible'
         />
      </svg>
    )
  }
  
  export default SvgTank