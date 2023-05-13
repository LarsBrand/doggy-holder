import React from "react"
import {  motion } from '../motion/packages/framer-motion/src'
import { SharedHeader } from "./SharedHeader"


const baseMotion = (duration: number) => (count: number) => ({
    initial: { opacity: 0, x: 300 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: duration, delay: (count * .4 * duration) }
})
const motionProps = baseMotion(.2)

export const WelcomeHeader = () => {
    return <SharedHeader 
      title={<>Hello!</>} 
      subTitle={<>This is a literal pet project, Meet: <b>Seth</b> the dog. A lovely, gentle and cuddly english setter, He's my favourite dog and widely consider to be the best dog.</>}
      closer={<>This website can provides quick access to a placeholders featuring the <b>best</b> dogs.</>}
    /> 
}