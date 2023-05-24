import * as React from "react";
import { PageProps, graphql } from "gatsby";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { result, allCustomApi, brand } from "../models/Types";
import SideshowAffiliateLinkFinder from "../helpers/SideshowAffiliateLinkFinder";
import ProductLinkGenerator from "../helpers/ProductLinkGenerator";
import Card from "../components/Card";
import SideshowImageHelper from "../helpers/ImageHelper";


type data = {
  allCustomApi: allCustomApi;
};
const affiliateLinkFinder = new SideshowAffiliateLinkFinder();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();
const BrandPage = (data: PageProps<result, brand>) => {
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
          {data.pageContext.nodes.map((item) => (
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



export default BrandPage;
