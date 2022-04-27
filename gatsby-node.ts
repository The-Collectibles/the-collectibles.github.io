import type { GatsbyNode } from "gatsby"
import * as path from "path"
import UrlCleaner from "./src/helpers/UrlCleaner"
import { SideshowData, DataNode, result } from "./src/models/Types"

const urlCleaner = new UrlCleaner();

function FindAffiliateLink(item: result, results: DataNode[]) {
    var result = results.find(x => x.BrandProductId === item.sku);

    return result !== undefined ? result.Link : `https://www.sideshow.com${item.url}`;

}

function CleanString(item: string) {
    return urlCleaner.Clean(item);
}

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
            var url = `/${CleanString(post.brand)}`;

            createPage({
                path: url,
                component: brandTemplate,
                context: {
                    brand: post.brand
                }
            })
        }

    });

    const createPostPromise = sideShowData.map((post) => {


        if (post !== undefined) {
            var url = `/${CleanString(post.brand)}/${CleanString(post.name)}`;

            createPage({
                path: url,
                component: postTemplate,
                context: {
                    id: post.sku,
                    name: post.name,
                    price: post.price,
                    url: FindAffiliateLink(post, sideShowAffiliate),
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