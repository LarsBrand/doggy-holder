import { spring } from "../../animation/generators/spring"
import {
    calcGeneratorDuration,
    maxGeneratorDuration,
} from "../../animation/generators/utils/calc-duration"
import { Transition } from "../../animation/types"
import { millisecondsToSeconds } from "../../utils/time-conversion"

/**
 * Create a progress => progress easing function from a generator.
 */
export function createGeneratorEasing(options: Transition, scale = 100) {
    const generator = spring({ keyframes: [0, scale], ...options })
    const duration = Math.min(
        calcGeneratorDuration(generator),
        maxGeneratorDuration
    )

    return {
        type: "keyframes",
        ease: (progress: number) =>
            generator.next(duration * progress).value / scale,
        duration: millisecondsToSeconds(duration),
    }
}
