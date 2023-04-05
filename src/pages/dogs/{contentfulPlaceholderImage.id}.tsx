import React from 'react';
import '../../styles/main.scss'
import { graphql, HeadFC, HeadProps, PageProps } from 'gatsby';

export const data = graphql`
  query pageQuery($id: String) {
    contentfulPlaceholderImage(id: { eq: $id }) {
      title
      tagline
      subject      
      image {
        id
        url
      }
    }
  }
`;

const Page = ({ data: { contentfulPlaceholderImage } }: PageProps<Queries.Query>) => {
  return (
    <main>
      <div>
        dog page:
        <h1>{contentfulPlaceholderImage?.title}</h1>
        <code>{contentfulPlaceholderImage?.tagline}</code>
        {contentfulPlaceholderImage?.image?.url && (
          <img
            style={{ maxWidth: '90vw', maxHeight: '90vh' }}
            src={contentfulPlaceholderImage?.image.url}
          />
        )}
      </div>
    </main>
  );
};


export const Head: HeadFC<Queries.Query> = ({ data: { contentfulPlaceholderImage } }: HeadProps<Queries.Query>) => {
  return <>
    <title>Doggy-Holder 🐶 {contentfulPlaceholderImage?.subject} </title>
  </>
}

export default Page;