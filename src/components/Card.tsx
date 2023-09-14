import Image from "next/image";
import * as React from "react";

type CardProps = {
  name: string;
  thumbnailImageUrl: string;
  productUrl: string;
  url: string;
  price?:string
};

const Card = (props: CardProps) => {
  return (



<div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href={props.productUrl}>
        <img className="p-8 rounded-t-lg" src={props.thumbnailImageUrl} alt="product image" />
    </a>
    <div className="px-5 pb-5">
        <a href={props.productUrl}>
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
        </a>

        <div className="flex items-center justify-between mt-2.5">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${props.price || 599}</span>
            <a href={`https://www.sideshow.com${props.productUrl}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy</a>
        </div>
    </div>
</div>
  );
};

export default Card;
