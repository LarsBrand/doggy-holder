import React from 'react';
import '../../styles/main.scss'
import { graphql, HeadFC, HeadProps, Link, PageProps } from 'gatsby';
import { motion } from '../../motion/packages/framer-motion/src'
import { useMotionLayoutID, useMotionProps } from '../../hooks/useMotionProps';


export const data = graphql`
  query pageQuery($id: String) {
    contentfulPlaceholderImage(id: { eq: $id }) {   
      id 
      title
      tagline
      subject      
      image {                
        gatsbyImageData(                          
          resizingBehavior: PAD,
          placeholder: DOMINANT_COLOR,                     
          layout: CONSTRAINED,              
          quality: 100, 
          formats: [AUTO, WEBP, AVIF],                    
        )                    
        id    
        publicUrl    
      }
    }
  }
`;

const springConst = {
  type: "spring",
  stiffness: 700,
  damping: 30
};


const Page = ({ data: { contentfulPlaceholderImage } }: PageProps<Queries.Query>) => {
  const id = useMotionLayoutID(contentfulPlaceholderImage?.id || '')
  const spring = useMotionProps(springConst)

  return (
    <main>
      <div style={{ overflow: 'hidden' }}>
        <div style={{ textAlign: 'center' }}>
          {contentfulPlaceholderImage?.image?.gatsbyImageData && (
            <motion.div
              layout={id ? true : false}
              layoutId={id}
              transition={spring}
              key={contentfulPlaceholderImage.id}
              className='dog-details-wrapper'
              style={{ position: 'relative', maxHeight: 'calc(100vh - 10px)' }}
            >
              <Link to="/dogs" className="close-btn" title="close">
                ✖
              </Link>
              <motion.div className='dog-details'>
                <img
                  src={contentfulPlaceholderImage.image.publicUrl}
                  title={contentfulPlaceholderImage?.tagline || undefined}
                  style={{ objectFit: 'contain' }}
                  alt={"some dog"}
                />
              </motion.div>
              <h2>{contentfulPlaceholderImage?.title}</h2>
              <p><span style={{ opacity: .8 }}>This is </span><span style={{ fontWeight: 800 }}>{contentfulPlaceholderImage?.subject}.</span></p>
            </motion.div>
          )}
        </div>
      </div>
    </main >
  );
};


export const Head: HeadFC<Queries.Query> = ({ data: { contentfulPlaceholderImage } }: HeadProps<Queries.Query>) => {
  return <>
    <title>Doggy-Holder 🐶 {contentfulPlaceholderImage?.subject} </title>
  </>
}

export default Page;