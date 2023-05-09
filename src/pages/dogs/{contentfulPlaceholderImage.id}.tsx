import React from 'react';
import '../../styles/main.scss'
import '../../styles/dogs.scss'
import { graphql, HeadFC, HeadProps, Link, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { motion } from '../../motion/packages/framer-motion/src'


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

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};


const Page = ({ data: { contentfulPlaceholderImage } }: PageProps<Queries.Query>) => {
  return (
    <main>
      <div style={{ marginTop: '60px', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center' }}>
          {contentfulPlaceholderImage?.image?.gatsbyImageData && (
            <motion.div
              layout
              layoutId={contentfulPlaceholderImage.id}
              transition={spring}
              key={contentfulPlaceholderImage.id}
              className='dog-details-wrapper'
              style={{ position: 'relative', maxHeight:'calc(100vh - 10px)'}}              
            >
              <Link to="/dogs" className="close-btn" title="close">
              ✖
              </Link>
              <motion.div className='dog-details'>
                <img 
                  src={contentfulPlaceholderImage.image.publicUrl}   
                  title={contentfulPlaceholderImage?.tagline || undefined}
                  style={{objectFit:'contain' }}
                  alt={"some dog"}
                />      
              </motion.div>
              <h2 style={{ textAlign: 'left' }}>{contentfulPlaceholderImage?.title}</h2>
              <p style={{ textAlign: 'left', fontSize: '.8rem' }} ><span style={{ opacity: .8 }}>This is </span><span style={{ fontWeight: 800 }}>{contentfulPlaceholderImage?.subject}.</span></p>
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