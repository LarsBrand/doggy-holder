import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { AboutHeader } from "../components/AboutHeader";
import { HTMLHead } from "../components/HTMLHead";


export const Head: HeadFC = () => {
  return  <HTMLHead />

}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  return (
    <main >
      <AboutHeader />
    </main>
  )
}

export default IndexPage