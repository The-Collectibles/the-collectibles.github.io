import * as React from "react";
import NavBar from "../components/NavBar";
import Head from "../components/Head";
import { result, allCustomApi } from "../models/Types";
import AffiliateLinkFinder from "../helpers/AffiliateLinkFinder";
import UrlCleaner from "../helpers/UrlCleaner";
import { graphql, PageProps } from "gatsby";
import HotToys from "../images/hot-toys.png";
import IronStudios from "../images/iron-studios.png";
import Sideshow from "../images/sideshow-collectibles.webp";

const urlCleaner = new UrlCleaner();

type data = {
  allCustomApi: allCustomApi;
};
const affiliateLinkFinder = new AffiliateLinkFinder();

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

        <div className="row">
          <div className="col">
            <h1>Latest Products</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {data.data.allCustomApi.nodes.map((item) => (
            <div className="col">
              <div className="card">
                <img
                  style={{ maxHeight: "200px" }}
                  src={item.thumbnailImageUrl}
                  className="rounded mx-auto d-block-fluid"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                </div>
                <div className="card-footer text-muted">
                  <a
                    target="_blank"
                    className="btn btn-primary"
                    href={`https://www.sideshow.com${item.url}`}
                  >
                    Buy Product
                  </a>
                  <a
                    className="btn btn-secondary float-end"
                    href={`/${urlCleaner.Clean(item.brand)}/${urlCleaner.Clean(
                      item.name
                    )}`}
                  >
                    View Product
                  </a>
                </div>
              </div>
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
      }
    }
  }
`;

export default IndexPage;
