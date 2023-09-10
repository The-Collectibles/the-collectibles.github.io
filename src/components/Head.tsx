import * as React from "react";
import Script from 'next/script'

type HeadProps = {
 title : string
}

const Head = (props : HeadProps) => {
  return (
    <>
      <title> {props.title} - The Collectibles</title>
      <meta name="p:domain_verify" content="8cf098b022e42f2e24bf7f17d13fe01c"/>
      </>
  );
};


export default Head