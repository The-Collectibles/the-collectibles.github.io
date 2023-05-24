import type { GatsbyNode } from "gatsby"
import * as path from "path"
import UrlCleaner from "./src/helpers/SideshowUrlCleaner"
import AffiliateLinkFinder from "./src/helpers/SideshowAffiliateLinkFinder"
import ProductLinkGenerator from "./src/helpers/ProductLinkGenerator"
import ImageHelper from "./src/helpers/ImageHelper"
import { SideshowData } from "./src/models/Types"
import config from "./gatsby-config"
import fetch from "node-fetch"

const urlCleaner = new UrlCleaner();
const affiliateLinkFinder = new AffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new ImageHelper();


export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

  var promise = await fetch(
    `https://floral-bush-8df5.arsenalhistory.workers.dev/`
  );

  const sideShowData = await promise.json();

  const { createPage } = actions

  const data = await graphql<SideshowData>(`
    {
        allDataJson {
          nodes {
            Brand
            Id
            BrandProductId
            Description
            Image
            Link
            Name
            Price
          }
        }
      }      
      ` )

  const postTemplate = path.resolve("./src/templates/Post.tsx");
  const brandTemplate = path.resolve("./src/templates/BrandPage.tsx");
  const allPagesTemplate = path.resolve("./src/templates/AllProducts.tsx");
  const homePageTemplate = path.resolve("./src/templates/HomePage.tsx");
  const sideShowAffiliate = data.data?.allDataJson.nodes;

  var brands = sideShowData.filter((a, i) => sideShowData.findIndex((s) => a.brand === s.brand) === i);

  const createBrandsPromise = brands.map((post) => {

    let brandPosts = sideShowData.filter((a) => a.brand === post.brand); 

    if (post !== undefined) {
      var url = `/${urlCleaner.Clean(post.brand ?? "default")}`;

      createPage({
        path: url,
        component: brandTemplate,
        context: {
          brand: post.brand,
          affiliates: sideShowAffiliate,
          nodes : brandPosts
        }
      })
    }

  });

   const createProductPagePromise = sideShowData.map((post) => {


    if (post !== undefined) {
      var brandUrl = `${urlCleaner.Clean(post.brand ?? "default")}`;
      var url = productLinkGenerator.CreateProductLink(post.brand, post.name, post.sku);

      createPage({
        path: url,
        component: postTemplate,
        context: {
          ...post,
          id: post.sku,
          url: affiliateLinkFinder.FindAffiliateLink(post.sku, post.url, sideShowAffiliate),
          thumbnailImageUrl: imageHelper.GetImageLink(post.thumbnailImageUrl),
          brandUrl: `/${brandUrl}/`
          // anything else you want to pass to your context
        }
      })
    }
  })

  const posts = sideShowData
  const productsPerPage = Number(config.siteMetadata.productsPerPage)
  const numberOfPages = Math.ceil(posts.length / productsPerPage)
  const allPagesPromise = Array.from({ length: numberOfPages }).forEach((_, i) => {

    let paginatedProducts = posts.slice(((i+1) - 1) * productsPerPage, (i+1) * productsPerPage)


    createPage({
      path: i === 0 ? `/all-products` : `/all-products/${i + 1}`,
      component: allPagesTemplate,
      context: {
        limit: productsPerPage,
        skip: i * productsPerPage,
        numberOfPages: numberOfPages,
        currentPage: i + 1,
        url: "/all-products",
        nodes: paginatedProducts
      },
    })
  })

  const createHomePagePromise =  createPage({
    path: `/`,
    component: homePageTemplate,
    context: {
      nodes: sideShowData.slice(0,6),
      affiliates: sideShowAffiliate
    },
  })

  //await Promise.all([createProductPagePromise, createBrandsPromise, allPagesPromise, createHomePagePromise])
  await Promise.all([createProductPagePromise,createBrandsPromise,createHomePagePromise])
}