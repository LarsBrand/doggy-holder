import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { AboutHeader } from "../components/AboutHeader";


export const Head: HeadFC = () => {
  return <>
    <title>Doggy-Holder 🐶</title>
  </>
}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  return (
    <main >
      <AboutHeader />
    </main>
  )
}

export default IndexPage