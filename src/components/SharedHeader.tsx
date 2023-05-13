import React, { ReactNode } from "react"
import {  motion } from '../motion/packages/framer-motion/src'


const baseMotion = (duration: number) => (count: number) => ({
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: duration, delay: (count * .4 * duration) }
})
const motionProps = baseMotion(.2)

interface HeaderProps{
    title: ReactNode
    subTitle: ReactNode
    closer: ReactNode
}

export const SharedHeader: React.FC<HeaderProps> = ({title, subTitle, closer}) => {
    return <motion.div
        className="jumbotron-container"
        transition={{ duration: 0.5 }}
    >
        <div className="jumbotron">
            <motion.h1 {...motionProps(1)}>
                {title}
            </motion.h1>
            <motion.p
                {...motionProps(2)}
                className="lead">
                {subTitle}
            </motion.p>
            <hr />
            <motion.p
                {...motionProps(3)}
                className="closer"
            >
                {closer}
            </motion.p>
        </div>
    </motion.div>

}