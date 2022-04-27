import * as React from "react"
import NavBar from "../components/NavBar";
import { Helmet } from "react-helmet";

const IndexPage = () => {
  return (
    <main>
       <NavBar></NavBar>
       <Helmet>
        <title>The Collectibles</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
      </Helmet>
      <title>Home Page</title>
      
    </main>
  )
}

export default IndexPage
