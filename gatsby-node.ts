import type { GatsbyNode } from "gatsby"
import * as path from "path"

type Content = {
    plainText: {
        content: string
    }
}
export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {

    const { createPage } = actions

    const data = await graphql<Content>(`
    {
        plainText {
          content
        }
      }
      
      
      ` )

    const postTemplate = path.resolve("./src/templates/Post.tsx")

    const createPostPromise = data.data?.plainText.content.split('https://www.sideshowtoy.com/photo/|||||||').map((post) => {

        var postDetail = post.split("|");
        const affiliateId = "3162046";

        if (postDetail[1] !== undefined) {
            var url = `/posts/${encodeURIComponent(postDetail[1].replace(/\s/g, "-").trim().toLocaleLowerCase())}`;
            console.log(postDetail[11]);
            createPage({
                path: url,
                component: postTemplate,
                context: {
                    id: postDetail[0],
                    name: postDetail[1],
                    url: url,
                    merchant: postDetail[3],
                    linkToProduct: postDetail[4].replace("YOURUSERID", affiliateId),
                    productImage: postDetail[5],
                    productGalleryImage: postDetail[6],
                    description: postDetail[11],
                    // anything else you want to pass to your context
                }
            })
        }
    })

    await Promise.all([createPostPromise])
}