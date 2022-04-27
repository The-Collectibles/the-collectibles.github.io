import * as React from "react";
import { PageProps, graphql } from "gatsby";
import { Helmet } from "react-helmet";

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            The Collectibles
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
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
            <div className="card w-75">
              <img src={item.thumbnailImageUrl} className="img-fluid" alt="..." />
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
