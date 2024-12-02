import React, { ReactNode } from "react"
import { motion } from '../motion/packages/framer-motion/src'
import { useMotionProps } from "../hooks/useMotionProps"


const baseMotion = (duration: number) => (count: number) => ({
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: duration, delay: (count * .4 * duration) }
})
const motionProps = baseMotion(.2)

interface HeaderProps {
    title: ReactNode
    subTitle: ReactNode
    closer: ReactNode
}

export const SharedHeader: React.FC<HeaderProps> = ({ title, subTitle, closer }) => {
    const motions1 =useMotionProps(motionProps(1))
    const motions2 =useMotionProps(motionProps(2))
    const motions3 =useMotionProps(motionProps(3))
    
    return <motion.div
        className="jumbotron-container"
        transition={{ duration: 0.5 }}
    >
        <div className="jumbotron">
            <motion.h1 {...motions1}>
                {title}
            </motion.h1>
            <motion.div
                {...motions2}
                className="lead">
                {subTitle}
            </motion.div>
            <hr />
            <motion.div
                {...motions3}
                className="closer"
            >
                {closer}
            </motion.div>
        </div>
    </motion.div>

}