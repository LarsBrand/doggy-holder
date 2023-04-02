
import type { GatsbyNode } from "gatsby"
import { forwardRef } from "react"

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createRedirect } = actions

  // Load all images
  const result = await graphql<any>(`
      {
        allContentfulPlaceholderImage {
          nodes {
            id
            title
            tagline
            subject 
            
            image {
              id              
              filename
              url
            }
          }
        }
      }
    `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful PLaceholder images`,
      result.errors
    )
    return
  }

  // we now build redirect for all possible placeholder sizes. 
  // a pseudo random image is assigned, in the sense that will change on rebuilds, but not each time when fetching the image.
  // this seems silly at first, there's just no progamatic way to assign a redirect, we're limited to basic replacers that we can't do calculations with.
  // I might need to look into creating a gatsby-function for this instead

  // max size is 400x400
  const maxSize = 4000
  const imageCount = result.data.allContentfulPlaceholderImage.nodes.length
    for (let h = 0; h < maxSize; h++) {
      // pick a pseudo random image. 
      //height divided by total images, the reminder is used a array index
      const imageIndex =  h % imageCount
      const baseImageURL = result.data.allContentfulPlaceholderImage.nodes[imageIndex].image.url

      createRedirect({
        fromPath: `/:width/${h}`,
        toPath: `${baseImageURL}?w=:width&h=${h}`,
        statusCode: 200, // '200' will hide that this is a redirect 
      })

  }
}
