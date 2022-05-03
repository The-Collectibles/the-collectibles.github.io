import * as React from "react";
import { PageProps } from "gatsby";
import NavBar from "../components/NavBar";
import { result } from "../models/Types"
import Head from "../components/Head";

const IndexRoute = (data: PageProps<result, result>) => {
  return (
    <main>
      <NavBar></NavBar>
      <Head title={data.pageContext.name}></Head>

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
            <a href={data.pageContext.brandUrl}>{data.pageContext.brand}</a>
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
