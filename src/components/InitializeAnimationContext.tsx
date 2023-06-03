import React from 'react'


const defaultContextValue = {
    hasRan: false,  
    hasBeenProvided: false
}

const InitializeContext = React.createContext(defaultContextValue)

export const useInitializeAnimation = (setHasRan: (hasRan: boolean) => void) => {
    React.useLayoutEffect(() => {
        // on first render, we're not animating yet, 
        setTimeout(() => document?.querySelector('.body')?.classList.add('on-animate'), 500)  // start the animation
        setTimeout(() => {
            const body = document?.querySelector('.body')
            body?.classList.remove('before-animate')
            body?.classList.remove('on-animate')
            setHasRan(true)
        }, 2500)
    }, [])
}

export const InitializeAnmationContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const [hasRan, setHasRan] = React.useState(false)
    useInitializeAnimation(setHasRan)
    const value = React.useMemo(() => ({ hasRan, hasBeenProvided: true }), [hasRan])

    return <InitializeContext.Provider value={value}>
        {children}
    </InitializeContext.Provider>
}

export const useInitializeAnaimtionHasRan = () => {
    const value = React.useContext(InitializeContext)
    if(value.hasBeenProvided === false){
        throw new Error("useInitializeAnaimtionHasRan must be used in")
    }

    return value.hasRan
}