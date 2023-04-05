import * as React from "react"
import { HeadFC, PageProps } from "gatsby"


export const Head: HeadFC = () => {
  return <>
    <title>Doggy-Holder 🐶</title>
  </>
}

const IndexPage: React.FC<PageProps> = ({  }) => {
  return (
    <main >
      todo: list all Dogs
    </main>
  )
}

export default IndexPage