import React from 'react'
import { ScriptRandomBackgroundColor } from '../hooks/useRandomBackgroundColor'

export const HTMLHead: React.FC<{ title?: string }> = (props) => {
    const titleText = props.title || 'Doggy-Holder 🐶'
    return <>
        <title>{titleText}</title>
        <ScriptRandomBackgroundColor />
    </>
}