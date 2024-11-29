import React from "react"
import { motion } from '../motion/packages/framer-motion/src'
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
    subTitle={<>
      Meet: <b>Seth</b> the dog. A lovely, gentle and cuddly english setter,<br />
      <div className="lead-sub">He's my favourite dog and widely consider to be the best dog.<br />
        This is a literal pet project, it provides quick access to img-urls featuring the <b>best</b> dogs.</div>
    </>}
    closer={<>
      <i>Inspired by <a href="https://placekitten.com">placekitten.com</a>. A service that provides placeholder images of cats.</i>
    </>}
  />
}