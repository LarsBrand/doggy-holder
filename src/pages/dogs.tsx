import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { AnimatePresence, motion, useHasLayoutProjection } from '../motion/packages/framer-motion/src'
import { useMotionLayoutID, useMotionProps } from "../hooks/useMotionProps"
import { HTMLHead } from "../components/HTMLHead"

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
              publicUrl
            }
          }
        }
      }     
    `

export const Head: HeadFC = () => {
  return <HTMLHead title={'Doggy-Holder 🐶 All dogs'} />

}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  const allDogs = data.allContentfulPlaceholderImage.nodes
  return (
    <main >
      <div className="dog-list-container" >
        <div className="dog-list-spacer"></div>
        <AnimatePresence>
          {allDogs.map((i, index) =>
            <DogListItem i={i} index={index} key={i.id} />
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

const springConst = {
  type: "spring",
  stiffness: 700,
  damping: 30
};


const DogListItem: React.FC<{ i: Queries.ContentfulPlaceholderImage, index: number }> = ({ i, index }) => {
  const id = useMotionLayoutID(i.id)
  const hasLayout = useHasLayoutProjection(id)
  const spring = useMotionProps(springConst)
  const animate = useMotionProps({ scale: 1, transition: { delay: index * .07 } })
  const initialMotion = useMotionProps(hasLayout ? undefined : { scale: 0 })


  return (
    <motion.div
      layout={id ? true : false}
      layoutId={id}
      key={`dogs_${i.id}`}
      className="dog-details-wrapper list"
      style={{ zIndex: hasLayout ? '200' : '100' }}
      initial={initialMotion}
      animate={animate}
      transition={spring}
    >
      <Link to={`/dogs/${i.id}`}>
        {i.image?.gatsbyImageData && <GatsbyImage image={i.image.gatsbyImageData} alt={"some dog"} />}
        <link rel="preload" as="image" href={i.image?.publicUrl} />
      </Link>
    </motion.div>
  )
}

export default IndexPage