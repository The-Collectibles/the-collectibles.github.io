import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { result, allCustomApi, DataNode } from "../models/Types";
import AffiliateLinkFinder from "../helpers/AffiliateLinkFinder";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import Card from "../components/Card";
import Pagination from "../components/Pagnation";

type data = {
  allCustomApi: allCustomApi;
};

type productContext = {
  affiliates: DataNode[]
  currentPage: number
  numberOfPages: number
  url: string
};

const affiliateLinkFinder = new AffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();
const AllProducts = (data: PageProps<data, productContext>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title="All Products"></Head>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>All Products</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Pagination currentPage={data.pageContext.currentPage} numberOfPages={data.pageContext.numberOfPages} url={data.pageContext.url}></Pagination>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allCustomApi.nodes.map((item) => (
            <div className="col">
              <Card
                name={item.name}
                thumbnailImageUrl={item.thumbnailImageUrl}
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
        <div className="row">
          <div className="col">
            <Pagination currentPage={data.pageContext.currentPage} numberOfPages={data.pageContext.numberOfPages} url={data.pageContext.url}></Pagination>
          </div>
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  query allProductsQuery($skip: Int!, $limit: Int!) {
    allCustomApi(limit: $limit, skip: $skip) {
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

export default AllProducts;
