import React from "react";

export const useInitializeAnimationClasses = () => {
    const [isAnimating, setIsAnimating] = React.useState(false)
    const [isDone, setIsDone] = React.useState(false)
    React.useEffect(() => {
        // on first render, we're not animating yet, 
        setTimeout(() => setIsAnimating(true), 1)  // start the animation
        setTimeout(() => {
            // cleanup initial animation classes
            setIsAnimating(false)
            setIsDone(true)
        }, 2500)
    }, [])
    return `${isDone ? '' : 'before-animate'} ${isAnimating ? 'on-animate' : ''}`
}