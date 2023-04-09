import React from "react"
import { motion } from "framer-motion"


const baseMotion = (duration: number) => (count: number) => ({
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: duration, delay: (count * .4 * duration) }
})
const motionProps = baseMotion(.2)

export const WelcomeHeader = () => {
    return <motion.div
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.5 }}
    >
        <div className="jumbotron">
            <motion.h1 {...motionProps(1)}>
                Hello!
            </motion.h1>
            <motion.p
                {...motionProps(2)}
                className="lead">
                This is a literal pet project, Meet: <b>Seth</b> the dog. A lovely, gentle and cuddly english setter, He's my favourite dog and widely consider to be the best dog.
            </motion.p>
            <hr />
            <motion.p
                {...motionProps(3)}
            >This website can provides quick access to a placeholders featuring the <b>best</b> dogs.</motion.p>
        </div>
    </motion.div>

}