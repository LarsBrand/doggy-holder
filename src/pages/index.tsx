import * as React from "react"
import '../styles/main.scss'
import type { HeadFC, PageProps } from "gatsby"
import { WelcomeHeader } from "../components/WelcomeHeader";
import { DoggyCompanion } from "../components/DoggyCompanion";
import { useRandomBackgroundColor } from "../hooks/useRandomBackgroundColor";
import { useInitializeAnimation } from "../hooks/useInitializeAnimation";

const pageStyles = {}

const IndexPage: React.FC<PageProps> = () => {
  useRandomBackgroundColor()
  useInitializeAnimation()
  return (
    <main style={pageStyles}>
      <DoggyCompanion />
      <WelcomeHeader />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => {  
  return <>
    <title>Doggy-Holder 🐶</title>
    <body className='before-animate' />
  </>
}
