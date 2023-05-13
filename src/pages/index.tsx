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
                formats: [AUTO, WEBP, AVIF],                
              )                
              url,
              publicUrl
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
    animate={{scale:1,  transition: {delay: index *.15}}}  
     transition={spring}     
  >
  <Link to={`/dogs/${i.value.id}`}>
    {i.value.image?.gatsbyImageData && <>
        <GatsbyImage image={i.value.image.gatsbyImageData} alt={"some dog"} style={{ borderRadius: '5px' }} />
        <link rel="preload" as="image" href={i.value.image?.publicUrl} />
      </>
    }
  </Link>
</motion.div>
}

const PlaceholderUrlBox = ()=>{
  return <div className="cta-container">
    <div className='cta-box'>
      <div className="header">
        provide the image width & height in the url
      </div>
      <div className="action">       
          <div style={{ display: 'inline-block' }}>Like:</div>
          <div className="highlight">
            <code>{location?.href}<span className="colored" >300</span>/<span className="colored">400</span></code>
          </div>       
       </div>
    </div>
  </div>
}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  const randomImages = data.allContentfulPlaceholderImage.nodes.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 4)

  return (
    <main >
      <WelcomeHeader />      
      <PlaceholderUrlBox />
      <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'space-evenly', overflowX:'hidden', overflowY:'visible', overflow:'visible'}}>
        {randomImages.map((i,index) => (
          <HomeDoggyImage key={i.value.id} i={i} index={index} />
        )
        )}
      </div>
    </main>
  )
}

export default IndexPage