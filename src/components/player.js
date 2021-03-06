import React from "react"
import Image from "gatsby-image"
import { css } from "@emotion/core"
import { graphql } from "gatsby"
import Layout from "./layout"

export const query = graphql`
  query($slug: String!) {
    allDatoCmsPlayer(filter: { slug: { eq: $slug } }) {
      nodes {
        name
        accolades
        bio
        stats
        image {
          fluid(maxWidth: 1200) {
            ...GatsbyDatoCmsFluid
          }
        }
      }
    }
  }
`

const Player = ({
  data: {
    allDatoCmsPlayer: { nodes },
  },
}) => {
  const { name, accolades, bio, stats, image } = nodes[0]
  return (
    <Layout>
      <main
        css={css`
          margin: 0 auto;
          max-width: 1200px;
          width: 95%;
          text-align: center;
          h1 {
            font-size: 4rem;
            @media (min-width: 768px) {
              font-size: 6rem;
            }
          }
          h2 {
            margin: 2rem 0;
            font-size: 3rem;
            @media (min-width: 768px) {
              font-size: 5rem;
            }
          }
          p {
            padding: 0 10%;
            &.bio {
              text-align: left;
            }
          }
          a {
            font-size: 2rem;
          }
        `}
      >
        <h1>{name}</h1>
        <Image fluid={image.fluid} />
        <h2>Accolades</h2>
        <p>{accolades}</p>
        <h2>Biography</h2>
        {bio.split(/\r|\n/).map((paragraph, i) => (
          <p className="bio" key={i}>
            {paragraph}
          </p>
        ))}
        <a href={stats} target="_blank" rel="noreferrer">
          View Statistics on Basketball Reference
        </a>
      </main>
    </Layout>
  )
}

export default Player
