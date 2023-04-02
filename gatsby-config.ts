import type { GatsbyConfig } from "gatsby";
import dotenv from 'dotenv'

dotenv.config({ path: `./.env/.env.${process.env.NODE_ENV}` })

if (!process.env.CONTENTFUL_SPACE_ID) {
  console.error("CONTENTFUL_SPACE_ID ENV var empty or not defined")
}
if (!process.env.CONTENTFUL_ACCESS_TOKEN) {
  console.error("CONTENTFUL_ACCESS_TOKEN ENV var empty or not defined")
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `doggy-holder`,
    siteUrl: `https://www.yourdomain.tld`
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: { "icon": "src/images/icon.png" }
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-source-filesystem',
      options: { "name": "images", "path": "./src/images/" },
      __key: "images"
    }
  ]
};

export default config;
