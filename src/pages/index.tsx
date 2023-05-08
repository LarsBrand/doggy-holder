import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { WelcomeHeader } from "../components/WelcomeHeader";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion, useHasLayoutProjection } from '../motion/packages/framer-motion/src'

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
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

const HomeDoggyImage: React.FC<{
    index:number,
    i:{   value: Queries.ContentfulPlaceholderImage,  sort: number}
  }>= ({i, index})=>{
  const hasLayout = useHasLayoutProjection(i.value.id)
  return <motion.div
  layout
  layoutId={i.value.id}
  key={`index_${i.value.id}`}
  className="dog-details-wrapper home"            
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 1.05 }}            
  initial={hasLayout? undefined : {scale:0}}
  animate={{scale:1, transition: {delay: index *.15}}}  
  transition={spring}   
>
  <Link to={`/dogs/${i.value.id}`}>
    {i.value.image?.gatsbyImageData && <GatsbyImage image={i.value.image.gatsbyImageData} alt={"some dog"} style={{ borderRadius: '5px' }} />}
  </Link>
</motion.div>
}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data, location }) => {
  const randomImages = data.allContentfulPlaceholderImage.nodes.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 4)

  return (
    <main >
      <WelcomeHeader />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 1rem 2rem 200px' }}>
        <div style={{ backgroundColor: 'var(--primary-color-background-border)', padding: '2rem', borderRadius: '6px', fontWeight: 200 }} >
          provide the image width & height in the url
          <br />
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <div style={{ display: 'inline-block' }}>Like:</div>
            <div style={{ display: 'inline-block', marginLeft: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#888' }}>
              <code>{location?.href}<span style={{ color: 'var(--primary-color-light)', textShadow: '0px 0px 2px #000000' }}>300</span>/<span style={{ color: 'var(--primary-color-light)', textShadow: '0px 0px 2px #000000' }}>400</span></code>
            </div>
          </div>
        </div>
      </div>
      <motion.div layout style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'flex-end' }}>
        {randomImages.map((i,index) => (
          <HomeDoggyImage key={i.value.id} i={i} index={index} />
        )
        )}
      </motion.div>
    </main>
  )
}

export default IndexPage