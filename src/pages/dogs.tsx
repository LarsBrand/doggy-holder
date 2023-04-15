import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { AnimatePresence, motion } from "framer-motion"

export const data = graphql`
      query allDogImages{
        allContentfulPlaceholderImage {
          nodes {
            id            
            image {                     
              gatsbyImageData(
                width: 250,
                height: 250,
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
      <motion.div layout style={{ display: "inline-flex", flexWrap: 'wrap', marginTop: '52px', alignContent: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ display: 'inline-block', width: '200px', height: '245px' }}></div>
        <AnimatePresence>
          {allDogs.map((i, index) =>
            <DogListItem i={i} index={index} key={i.id} />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  )
}


const DogListItem: React.FC<{ i: Queries.ContentfulPlaceholderImage, index: number }> = ({ i, index }) => {
  const [isLayoutAnimationRunning, setIslayoutAnimationRunning] = React.useState(false)

  return (
    <motion.div
      layout
      layoutId={i.id}
      key={`dogs_${i.id}`}
      className="dog-details-wrapper list"            
      style={{ zIndex: isLayoutAnimationRunning ? '200' : '100' }}      
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.05 }}
      onLayoutAnimationStart={() => setIslayoutAnimationRunning(true)}
      onLayoutAnimationComplete={() => setIslayoutAnimationRunning(false)}
    >
      <Link to={`/dogs/${i.id}`}>
        {i.image?.gatsbyImageData && <GatsbyImage image={i.image.gatsbyImageData} alt={"some dog"} style={{ borderRadius: '5px' }} />}
      </Link>
    </motion.div>
  )
}

export default IndexPage