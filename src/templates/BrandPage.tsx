import * as React from "react";
import { PageProps, graphql } from "gatsby";
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar"

type data = {
  allCustomApi: allCustomApi;
};

type allCustomApi = {
  nodes: result[];
};

type result = {
  brand: string;
  sku: string;
  description: string;
  imageUrl: string;
  stockMessage: string;
  uid: string;
  url: string;
  thumbnailImageUrl: string;
  price: string;
  name: string;
};
const BrandPage = (data: PageProps<data, result>) => {

  return (
    <main>
      <NavBar></NavBar>
      <Helmet>
        <title>{data.pageContext.brand} | The Collectibles</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </Helmet>

      <div className="container my-4">
        <div className="row">
          <div className="col"><h1>{data.pageContext.brand}</h1></div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {console.log(data.data.allCustomApi)}
          {data.data.allCustomApi.nodes.map(item => (

            <div className="col">
            <div className="card">
              <img src={item.thumbnailImageUrl} className="rounded mx-auto d-block-fluid" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
              </div>
            </div>
          </div>
          
          ))
          }
          

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
