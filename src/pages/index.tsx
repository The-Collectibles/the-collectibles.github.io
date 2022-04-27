import * as React from "react"
import NavBar from "../components/NavBar";
import { Helmet } from "react-helmet";
import Head from "../components/Head";

const IndexPage = () => {
  return (
    <main>
       <NavBar></NavBar>
       <Head title="Your favourite collectibles all available here"></Head>
      <title>Home Page</title>
      
    </main>
  )
}

export default IndexPage
