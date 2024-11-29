import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import { HTMLHead } from "../components/HTMLHead"
import { SharedHeader } from "../components/SharedHeader"

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}

const paragraphStyles = {
  marginBottom: 48,
}


const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main >
      <SharedHeader
        title="404 - Page not found"
        subTitle={<>                   
          <Link to="/">Go home</Link>.
        </>}
        closer={"Who let the dogs out 🐶?"}
      />
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <HTMLHead title='Not found' />
