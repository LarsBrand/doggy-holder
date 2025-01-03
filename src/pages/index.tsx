import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { WelcomeHeader } from "../components/WelcomeHeader";
import { GatsbyImage } from "gatsby-plugin-image";
import { motion, useHasLayoutProjection } from '../motion/packages/framer-motion/src'
import { useMotionLayoutID, useMotionProps } from "../hooks/useMotionProps";
import { HTMLHead } from "../components/HTMLHead";
import { CopyLinkButton } from "../components/CopyLinkButton";

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
  return <HTMLHead />
}
const springConst = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

const HomeDoggyImage: React.FC<{
  index: number,
  i: { value: Queries.ContentfulPlaceholderImage, sort: number }
}> = ({ i, index }) => {
  const id = useMotionLayoutID(i.value.id)
  const hasLayout = useHasLayoutProjection(id)
  const spring = useMotionProps(springConst)
  const animate = useMotionProps({ scale: 1, transition: { delay: index * .15 } })
  const initialMotion = useMotionProps(hasLayout ? undefined : { scale: 0 })

  return <motion.div
    layout={id ? true : false}
    layoutId={id}
    key={`index_${i.value.id}`}
    className="dog-details-wrapper home" 
    initial={initialMotion}
    animate={animate}
    transition={spring}
  >
    <Link to={`/dogs/${i.value.id}`}>
      {i.value.image?.gatsbyImageData && <>
        <GatsbyImage image={i.value.image.gatsbyImageData} alt={"some dog"} />
        <link rel="preload" as="image" href={i.value.image?.publicUrl} />
      </>
      }
    </Link>
  </motion.div>
}

const PlaceholderUrlBox: React.FC<{ href: string }> = ({ href }) => {
  return <div className="cta-container">
    <div className='cta-box'>
      <div className="header">
        This link will give you a (pseudo-)random image of dog.
        <br />
        These can be used as a placeholder in code samples.
        <br />
        Image <b>width</b> & <b>height</b> can be set in the url.
        <br />
        Changing the height will give different images.
      </div>
      <div className="action">
        <div style={{ display: 'inline-block' }}>IE:</div>
        <div className="highlight">
          <code>{href}<span className="colored" >300</span>/<span className="colored">400</span></code>
          &nbsp;
          <CopyLinkButton href={`${href}300/400`} />
        </div>
      </div>
    </div>
  </div>
}

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data, location }) => {
  const randomImages = data.allContentfulPlaceholderImage.nodes.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 4)

  return (
    <main >
      <WelcomeHeader />
      <PlaceholderUrlBox href={location?.href} />
      <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center', overflowX: 'hidden', overflowY: 'visible', overflow: 'visible' }}>
        {randomImages.map((i, index) => (
          <HomeDoggyImage key={i.value.id} i={i} index={index} />
        )
        )}
      </div>
    </main>
  )
}

export default IndexPage