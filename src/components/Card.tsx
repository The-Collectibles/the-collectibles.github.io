import Image from "next/image";
import * as React from "react";

type CardProps = {
  name: string;
  thumbnailImageUrl: string;
  productUrl: string;
  url: string;
};

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <img
        style={{ maxHeight: "200px" }}
        src={props.thumbnailImageUrl}
        className="rounded mx-auto d-block-fluid"
        alt={props.name}
      />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
      </div>
      <div className="card-footer text-muted">
        <a
          target="_blank"
          className="btn btn-primary"
          href={props.url}
        >
          Buy Product
        </a>
        <a className="btn btn-secondary float-end" href={props.productUrl}>
          View Product
        </a>
      </div>
    </div>
  );
};

export default Card;
