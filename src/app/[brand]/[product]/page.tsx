import SideshowImageHelper from "@/domain/ImageHelper";
import ProductLinkGenerator from "@/domain/ProductLinkGenerator";
import SideshowUrlCleaner from "@/domain/SideshowUrlCleaner";
import { result } from "@/models/Types";
import Image from "next/image";

const sideshowUrlCleaner = new SideshowUrlCleaner();
const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();
const allData = async () => {
  var items = [];
  var itemCount = 7;
  var resultsPerPage = 500;

  for (let i = 1; i <= itemCount; i++) {
    var promise = fetch(
      `https://3w37oq.a.searchspring.io/api/search/search.json?page=${i}&ajaxCatalog=v3&resultsFormat=native&siteId=3w37oq&resultsPerPage=${resultsPerPage}&sort=newest&q=&sort.ss_days_since_release=asc`
    );

    items.push(promise);
  }

  var gatheredResponses: result[] = [];
  for (let i = 0; i < items.length; i++) {
    var response = (await (await items[i]).json()).results;
    gatheredResponses = gatheredResponses.concat(response);
  }

  return gatheredResponses;
};

export async function generateStaticParams() {
  const gatheredResponses = await allData();

  return gatheredResponses.map((post) => ({
    brand: sideshowUrlCleaner.Clean(post.brand),
    product: sideshowUrlCleaner.Clean(post.name),
  }));
}

export default async function Product({
  params,
}: {
  params: { brand: string; product: string };
}) {
  const gatheredResponses = await allData();

  const getProduct = gatheredResponses.find(
    (x) => sideshowUrlCleaner.Clean(x.name) === params.product
  );

  if(getProduct === undefined) {
    return;
  }


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="container my-4">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <span className="badge bg-secondary float-end">
                  {getProduct.status}
                </span>
                <Image
                alt={getProduct.name}
                  className="rounded mx-auto d-block"
                  src={imageHelper.GetImageLink(getProduct.imageUrl)}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <h1>{getProduct.name}</h1>
            <a href={getProduct.brandUrl}>{getProduct.brand}</a>
            <p
              dangerouslySetInnerHTML={{ __html: getProduct.description }}
            />
            <p className="fs-2 text">${getProduct.price}</p>
            <a
              className="btn btn-primary"
              href={getProduct.url}
              target="_blank"
            >
              Buy Product
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
