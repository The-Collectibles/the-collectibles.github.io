import type { GatsbyNode } from "gatsby"
import * as path from "path"
import UrlCleaner from "./src/helpers/UrlCleaner"
import AffiliateLinkFinder from "./src/helpers/AffiliateLinkFinder"
import ProductLinkGenerator from "./src/helpers/ProductLinkGenerator"
import { SideshowData } from "./src/models/Types"
import config from "./gatsby-config"

const urlCleaner = new UrlCleaner();
const affiliateLinkFinder = new AffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();


export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

  // var promise = await fetch(
  //   `https://3w37oq.a.searchspring.io/api/search/search.json?page=${i}&ajaxCatalog=v3&resultsFormat=native&siteId=3w37oq&resultsPerPage=${resultsPerPage}&sort=newest&q=&sort.ss_days_since_release=asc`
  // );

  //(await promise.json()).results;


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
            status
          }
        }
      }      
      ` )

  const postTemplate = path.resolve("./src/templates/Post.tsx");
  const brandTemplate = path.resolve("./src/templates/BrandPage.tsx");
  const allPagesTemplate = path.resolve("./src/templates/AllProducts.tsx");
  const sideShowData = data.data?.allCustomApi.nodes;
  const sideShowAffiliate = data.data?.allDataJson.nodes;

  var brands = sideShowData.filter((a, i) => sideShowData.findIndex((s) => a.brand === s.brand) === i);

  const createBrandsPromise = brands.map((post) => {

    if (post !== undefined) {
      var url = `/${urlCleaner.Clean(post.brand ?? "default")}`;

      createPage({
        path: url,
        component: brandTemplate,
        context: {
          brand: post.brand,
          affiliates: sideShowAffiliate
        }
      })
    }

  });

  const createPostPromise = sideShowData.map((post) => {


    if (post !== undefined) {
      var brandUrl = `${urlCleaner.Clean(post.brand ?? "default")}`;
      var url = productLinkGenerator.CreateProductLink(post.brand, post.name, post.sku);

      createPage({
        path: url,
        component: postTemplate,
        context: {
          id: post.sku,
          name: post.name,
          price: post.price,
          url: affiliateLinkFinder.FindAffiliateLink(post.sku, post.url, sideShowAffiliate),
          imageUrl: post.imageUrl,
          thumbnailImageUrl: post.thumbnailImageUrl,
          description: post.description,
          brand: post.brand,
          brandUrl: `/${brandUrl}/`,
          status: post.status
          // anything else you want to pass to your context
        }
      })
    }
  })

  const posts = data.data?.allCustomApi.nodes
  const postsPerPage = Number(config.siteMetadata.productsPerPage)
  const numPages = Math.ceil(posts.length / postsPerPage)
  const allPagesPromise = Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/all-products` : `/all-products/${i + 1}`,
      component: allPagesTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  await Promise.all([createPostPromise, createBrandsPromise, allPagesPromise])
}