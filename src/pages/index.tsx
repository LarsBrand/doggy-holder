import * as React from "react"
import { HeadFC, Link, PageProps, graphql } from "gatsby"
import { WelcomeHeader } from "../components/WelcomeHeader";

export const data = graphql`
      query fourImages{
        allContentfulPlaceholderImage {
          nodes {
            id            
            image {                            
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

const IndexPage: React.FC<PageProps<Queries.Query>> = ({ data }) => {
  const randomImages = data.allContentfulPlaceholderImage.nodes.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, 4)

  return (
    <main >
      <WelcomeHeader />
      <div style={{ display: "flex", flexWrap: 'wrap' }}>
        {randomImages.map(i =>
          <div key={i.value.id} style={{ padding: '12px', background: '#EEE', borderRadius: '6px', margin: '6px' }}>
            <Link to={`/dogs/${i.value.id}`}>
              {i.value.image?.url && <img src={i.value.image?.url} width={300} height={300} style={{ objectFit: 'contain' }} />}
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}

export default IndexPage