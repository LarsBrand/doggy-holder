import * as React from "react"
import '../styles/main.scss'
import type { HeadFC, PageProps } from "gatsby"
import { WelcomeHeader } from "../components/WelcomeHeader";
import { DoggyCompanion } from "../components/DoggyCompanion";
import { useRandomBackgroundColor } from "../hooks/useRandomBackgroundColor";
import { useInitializeAnimationClasses } from "../hooks/useInitializeAnimationClasses";

const pageStyles = {}

const IndexPage: React.FC<PageProps> = () => {
  useRandomBackgroundColor()
  return (
    <main style={pageStyles}>
      <DoggyCompanion />
      <WelcomeHeader />
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => {
  const classesToApply =  useInitializeAnimationClasses()
  return <>
    <title>Doggy-Holder 🐶</title>
    <body className={classesToApply} />
  </>
}
