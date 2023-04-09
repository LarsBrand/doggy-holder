import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export const data = graphql`
      query allDogImages{
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
    <title>Doggy-Holder 🐶 All dogs</title>
  </>
}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  const allDogs = data.allContentfulPlaceholderImage.nodes
  return (
    <main >
      
      <div style={{ display: "inline-flex", flexWrap: 'wrap', marginTop:'52px', alignContent:'center', justifyContent:'center' }}>
      <div style={{display:'inline-block', width:'200px', height:'245px'}}></div>
        {allDogs.map(i =>
          <div key={i.id} style={{ padding: '12px', background: 'var(--primary-color-background-light)', borderRadius: '6px', margin: '6px' }}>
            <Link to={`/dogs/${i.id}`}>
              {i.image?.gatsbyImageData && <GatsbyImage image={i.image.gatsbyImageData} alt={"some dog"} style={{ borderRadius: '5px' }} />}
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default IndexPage