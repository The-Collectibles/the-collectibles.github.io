import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://the-collectibles.github.io`,
    productsPerPage: Number(process.env.PRODUCTS_PER_PAGE)
  },
  plugins: ["gatsby-plugin-image", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  },
  `gatsby-transformer-json`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `./src/data/`,
    },
  },
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      feeds: [
        {
          serialize: ({ query: { allCustomApi } }) => {
            return allCustomApi.nodes.map(node => {
              return Object.assign({}, {
                description: node.description,
                title: node.name,
                image: node.imageUrl,
                //date: enode.frontmatter.date,
                url: node.url,
                guid: node.uid,
              })
            })
          },
          query: `
          {
            allCustomApi {
              nodes {
                brand
                sku
                description
                imageUrl
                stockMessage
                uid
                url
                thumbnailImageUrl
                price
                name
              }
            }
          }
          `,
          output: "/rss.xml",
          title: "The Collectibles",
        },
      ],
    },
  },
]
};

export default config;
