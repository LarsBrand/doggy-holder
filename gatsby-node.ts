
import type { GatsbyNode } from "gatsby"

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
  const { createRedirect } = actions

  // add redirect from friendly urls to cloud images
  createRedirect({
    fromPath: "/:width/:height",
    toPath: "https://placekitten.com/:width/:height",
    statusCode: 200, // '200' will hide that this is a redirect 
  }) 
}
