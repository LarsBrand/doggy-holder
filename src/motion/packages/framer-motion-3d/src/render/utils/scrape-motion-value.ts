import { isMotionValue } from "framer-motion"
import type { ScrapeMotionValuesFromProps } from "framer-motion"
import { ThreeMotionProps } from "../../types"

const axes = ["x", "y", "z"]

const valueMap = {
    "position-x": "x",
    "position-y": "y",
    "position-z": "z",
    "rotation-x": "rotateX",
    "rotation-y": "rotateY",
    "rotation-z": "rotateZ",
    "scale-x": "scaleX",
    "scale-y": "scaleY",
    "scale-z": "scaleZ",
}

export const scrapeMotionValuesFromProps: ScrapeMotionValuesFromProps = (
    props: ThreeMotionProps,
    prevProps: ThreeMotionProps
) => {
    const motionValues = {}

    for (const key in props) {
        const prop = props[key]

        if (isMotionValue(prop) || isMotionValue(prevProps[key])) {
            motionValues[valueMap[key] || key] = prop
        } else if (Array.isArray(prop)) {
            for (let i = 0; i < prop.length; i++) {
                const value = prop[i]
                if (
                    isMotionValue(value) ||
                    (Array.isArray(prevProps[key]) &&
                        isMotionValue(prevProps[key][i]))
                ) {
                    const name = valueMap[key + "-" + axes[i]]
                    motionValues[name] = value
                }
            }
        }
    }

    return motionValues
}
