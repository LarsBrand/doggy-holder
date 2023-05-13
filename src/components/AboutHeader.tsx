import React from "react"
import { SharedHeader } from "./SharedHeader"

export const AboutHeader = () => {
    return <SharedHeader 
      title={<>About</>} 
      subTitle={<>I'm Lars Brand. I like <b>dogs</b></>}
      closer={<>Todo, add jokes here.</>}
    />    
}