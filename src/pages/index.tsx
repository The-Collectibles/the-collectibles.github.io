import * as React from "react";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import Card from "../components/Card";
import { result, allCustomApi } from "../models/Types";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import { graphql, PageProps } from "gatsby";
import HotToys from "../images/hot-toys.png";
import IronStudios from "../images/iron-studios.png";
import Sideshow from "../images/sideshow-collectibles.webp";
import AffiliateLinkFinder from "../helpers/AffiliateLinkFinder";
import ImageHelper from "../helpers/ImageHelper"


type data = {
  allCustomApi: allCustomApi;
};
const productLinkGenerator = new ProductLinkGenerator();
const affiliateLinkFinder = new AffiliateLinkFinder();
const imageHelper = new ImageHelper();
const IndexPage = (data: PageProps<data, result>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title="Your favourite collectibles all available here"></Head>
      <div className="container my-4">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card">
            <a href="/hot-toys" style={{display:"inherit"}}> <img
                style={{ maxHeight: "200px" }}
                src={HotToys}
                className="rounded mx-auto d-block-fluid"
                alt="Hot Toys logo"
              /></a>
              <div className="card-footer text-muted">
                Hot Toys Collectibles
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark mb-3">
            <a href="/iron-studios" style={{display:"inherit"}}><img
                style={{ maxHeight: "200px" }}
                src={IronStudios}
                className="rounded mx-auto d-block-fluid"
                alt="Iron Studios logo"
              /></a>
              <div className="card-footer text-muted">
                Iron Studios Collectibles
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{minHeight:"200px"}}>
            <a href="/sideshow-collectibles" style={{display:"inherit"}}><img
                style={{ maxHeight: "183px" }}
                src={Sideshow}
                className="rounded mx-auto d-block-fluid"
                alt="Iron Studios logo"
              /></a>
              <div className="card-footer text-muted">
                Sideshow Collectibles
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4 mb-4">
          <div className="col">
            <h1>Latest Products</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allCustomApi.nodes.map((item) => (
            <div className="col">
              <Card name={item.name} thumbnailImageUrl={imageHelper.GetImageLink(item.thumbnailImageUrl)} url={affiliateLinkFinder.FindAffiliateLink(
                  item.sku,
                  item.url,
                  data.pageContext.affiliates
                )} productUrl={productLinkGenerator.CreateProductLink(item.brand,item.name,item.sku)}></Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const query = graphql`
  {
    allCustomApi(limit: 6) {
      nodes {
        id
        brand
        name
        url
        thumbnailImageUrl
        imageUrl
        status
        subsite
        sku
      }
    }
  }
`;

export default IndexPage;
