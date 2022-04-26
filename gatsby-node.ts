import type { GatsbyNode } from "gatsby"
import * as path from "path"


type Response = {
    allDataJson : allDataJson,
    allCustomApi: allCustomApi
}

type allDataJson = {
    nodes: Node[]
}

type Node = {
    Brand : string
    Id : string
    BrandProductId : string
    Description : string
    Image : string
    Link : string
    Name : string
    Price : string
}

type allCustomApi = {
    nodes: result[]
}

type result = {
    brand : string
    sku : string
    description : string
    imageUrl : string
    stockMessage : string
    uid : string
    url : string
    thumbnailImageUrl : string
    price : string
    name : string
}

function FindAffiliateLink(item:result, results:Node[]) {
    var result = results.find(x=> x.BrandProductId ===item.sku);
    
    return result !== undefined ? result.Link : `https://www.sideshow.com${item.url}`;
    
}

function CleanString(item: string) {
    let cleanedItem = item.replace(/[#|"&\s:()'".;]/g, "-")
               .replace(/---/g,"-")
               .replace(/--/g,"-").trim().toLocaleLowerCase();
    
    if (cleanedItem.endsWith("-")) {
        cleanedItem = cleanedItem.substring(0,cleanedItem.length -1);
    }

    return cleanedItem;
}

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

    const { createPage } = actions

    const data = await graphql<Response>(`
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
    const sideShowData = data.data?.allCustomApi.nodes;
    const sideShowNodes = data.data?.allDataJson.nodes;

    const createPostPromise = sideShowData.map((post) => {


        if (post !== undefined) {
            var url = `/${CleanString(post.brand)}/${CleanString(post.name)}`;

            createPage({
                path: url,
                component: postTemplate,
                context: {
                    id: post.sku,
                    name: post.name,
                    url: url,
                    //merchant: postDetail[3],
                    linkToProduct: FindAffiliateLink(post,sideShowNodes),
                    productImage: post.imageUrl,
                    productGalleryImage: post.thumbnailImageUrl,
                    description: post.description,
                    // anything else you want to pass to your context
                }
            })
        }
    })

    await Promise.all([createPostPromise])
}