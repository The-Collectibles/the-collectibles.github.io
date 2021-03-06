import type { GatsbyConfig } from "gatsby";

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const config: GatsbyConfig = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
    productsPerPage: Number(process.env.PRODUCTS_PER_PAGE)
  },
  plugins: [{
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      "trackingId": "test"
    }
  }, {
    resolve: 'gatsby-source-custom-api',
    options: {
      url: {
        development: "http://localhost:5000/", // on "gatsby develop"
        production: "https://floral-bush-8df5.arsenalhistory.workers.dev/" // on "gatsby build"
      }
    },
  }, "gatsby-plugin-image", "gatsby-plugin-react-helmet", "gatsby-plugin-sitemap", {
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
]
};

export default config;
