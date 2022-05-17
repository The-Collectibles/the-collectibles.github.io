import * as React from "react";

type CardProps = {
  name: string;
  thumbnailImageUrl: string;
  productUrl: string;
  url: string;
};

const Card = (item: CardProps) => {
  return (
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
          href={item.url}
        >
          Buy Product
        </a>
        <a className="btn btn-secondary float-end" href={item.productUrl}>
          View Product
        </a>
      </div>
    </div>
  );
};

export default Card;
