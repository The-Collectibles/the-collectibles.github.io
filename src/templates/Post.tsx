import * as React from "react";
import { PageProps } from "gatsby";
import { Helmet } from "react-helmet";
import NavBar from "../components/NavBar";
import { result } from "../models/Types"

const IndexRoute = (data: PageProps<result, result>) => {
  console.log(data.pageContext.description);
  return (
    <main>
      <NavBar></NavBar>
      <Helmet>
        <title>{data.pageContext.name} | The Collectibles</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
      </Helmet>

      <div className="container my-4">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <img
                  className="rounded mx-auto d-block"
                  src={data.pageContext.imageUrl}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h1>{data.pageContext.name}</h1>
            <p
              dangerouslySetInnerHTML={{ __html: data.pageContext.description }}
            />
            <p className="fs-2 text">${data.pageContext.price}</p>
            <a
              className="btn btn-primary"
              href={data.pageContext.url}
              target="_blank"
            >
              Buy Product
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
export default IndexRoute;
