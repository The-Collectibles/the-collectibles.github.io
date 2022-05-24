import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { result, allCustomApi } from "../models/Types";
import AffiliateLinkFinder from "../helpers/AffiliateLinkFinder";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import Card from "../components/Card";
import ImageHelper from "../helpers/ImageHelper";


type data = {
  allCustomApi: allCustomApi;
};
const affiliateLinkFinder = new AffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new ImageHelper();
const BrandPage = (data: PageProps<data, result>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title={data.pageContext.brand}></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>{data.pageContext.brand}</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allCustomApi.nodes.map((item) => (
            <div className="col">
              <Card
                name={item.name}
                thumbnailImageUrl={imageHelper.GetImageLink(item.thumbnailImageUrl)}
                url={affiliateLinkFinder.FindAffiliateLink(
                  item.sku,
                  item.url,
                  data.pageContext.affiliates
                )}
                productUrl={productLinkGenerator.CreateProductLink(
                  item.brand,
                  item.name,
                  item.sku
                )}
              ></Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  query MyQuery($brand: String) {
    allCustomApi(filter: { brand: { eq: $brand } }) {
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
`;

export default BrandPage;
