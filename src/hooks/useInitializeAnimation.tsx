import React from "react";

export const useInitializeAnimation = () => {
    React.useLayoutEffect(() => {
        // on first render, we're not animating yet, 
        setTimeout(() => document?.querySelector('body')?.classList.add('on-animate'), 100)  // start the animation
        setTimeout(() => {
            const body=document?.querySelector('body')
            body?.classList.remove('before-animate')
            body?.classList.remove('on-animate')            
        }, 2500)
    }, [])
}