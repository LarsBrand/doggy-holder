import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { WelcomeHeader } from "../components/WelcomeHeader";
import { GatsbyImage } from "gatsby-plugin-image";

export const data = graphql`
      query fourImages{
        allContentfulPlaceholderImage {
          nodes {
            id            
            image {                     
              gatsbyImageData(
                width: 300,
                height: 300,
                placeholder: DOMINANT_COLOR, 
                cropFocus: FACE,
                resizingBehavior: FILL,  
                layout: FIXED,              
                quality: 100, 
                formats: [AUTO, WEBP, AVIF]
              )                
              url
            }
          }
        }
      }
    `

export const Head: HeadFC = () => {
  return <>
    <title>Doggy-Holder 🐶</title>
  </>
}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  const randomImages = data.allContentfulPlaceholderImage.nodes.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 4)

  return (
    <main >
      <WelcomeHeader />
      <div style={{ display: "flex", flexWrap: 'wrap' }}>
        {randomImages.map(i =>
          <div key={i.value.id} style={{ padding: '12px', background: 'var(--primary-color-background-light)', borderRadius: '6px', margin: '6px' }}>
            <Link to={`/dogs/${i.value.id}`}>
              {i.value.image?.gatsbyImageData && <GatsbyImage image={i.value.image.gatsbyImageData} alt={"some dog"} style={{ borderRadius: '5px' }} />}
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default IndexPage