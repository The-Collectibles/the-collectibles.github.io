import * as React from "react";

type HeadProps = {
 title : string
}

const Head = (props : HeadProps) => {
  return (
    <>
      <title> {props.title} - The Collectibles</title>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
        crossOrigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossOrigin="anonymous"
      ></script>
      <meta name="p:domain_verify" content="8cf098b022e42f2e24bf7f17d13fe01c"/>
      </>
  );
};


export default Head