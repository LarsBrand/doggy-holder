import React from 'react';
import '../../styles/main.scss'
import '../../styles/dogs.scss'
import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

export const data = graphql`
  query pageQuery($id: String) {
    contentfulPlaceholderImage(id: { eq: $id }) {    
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
      }
    }
  }
`;

const Page = ({ data: { contentfulPlaceholderImage } }: PageProps<Queries.Query>) => {
  return (
    <main>
      <div>
        <div className="jumbotron">
          <h1>{contentfulPlaceholderImage?.title}</h1>
          <p className="lead">This is {contentfulPlaceholderImage?.subject}.</p>
          <hr />
        </div>
        <div style={{ textAlign: 'center' }}>
          {contentfulPlaceholderImage?.image?.gatsbyImageData && (
            <div className='dog-details-wrapper'>
              <GatsbyImage
                image={contentfulPlaceholderImage.image.gatsbyImageData}
                alt={"some dog"}
                objectFit='contain'
                className='dog-details'
                title={contentfulPlaceholderImage?.tagline || undefined}
              />
            </div>
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