import type { GatsbyNode } from "gatsby"
import * as path from "path"
import UrlCleaner from "./src/helpers/UrlCleaner"
import AffiliateLinkFinder from "./src/helpers/AffiliateLinkFinder"
import { SideshowData } from "./src/models/Types"

const urlCleaner = new UrlCleaner();
const affiliateLinkFinder = new AffiliateLinkFinder();


export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

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
          }
        }
      }      
      ` )

    const postTemplate = path.resolve("./src/templates/Post.tsx");
    const brandTemplate = path.resolve("./src/templates/BrandPage.tsx");
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
            var url = `/${urlCleaner.Clean(post.brand ?? "default")}/${urlCleaner.Clean(post.name)}`;

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
                    // anything else you want to pass to your context
                }
            })
        }
    })

    await Promise.all([createPostPromise, createBrandsPromise])
}