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

function SvgColba({isClicked}) {
    return (
      <motion.svg
        width="32px"
        height="32px"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        className="si-glyph si-glyph-test-tube"
        variants={pathVariants}
        initial='hidden'
        animate='visible'
      >
        <g fill={isClicked ? "#1aac83": "#737791"} fillRule="evenodd">
          <motion.path
            d="M10.921.969c0-.937-.091-.938-1.05-.938H3.13c-.958 0-1.052.001-1.052.938h.953v2.94L.019 14.238c0 .939.777 1.699 1.736 1.699h9.489c.958 0 1.736-.76 1.736-1.699L9.992 3.879 9.978.969h.943zm1.048 12.637c.271.884-.203 1.435-1.432 1.435H2.562c-1.401 0-1.745-.593-1.432-1.435l2.786-9.652L3.905.941H9.03V3.93l2.939 9.676z"
            className="si-glyph-fill"
            transform="translate(2)"
            variants={pathVariants}

          />
          <motion.path
            d="M8.039 6.031h-3.02l-1.838 6.308c-.355 1.15-.24 1.584 1.408 1.584h3.879c1.633 0 1.67-.518 1.409-1.584L8.039 6.031z"
            className="si-glyph-fill"
            transform="translate(2)"
            variants={pathVariants}

          />
        </g>
      </motion.svg>
    )
  }
  
  export default SvgColba