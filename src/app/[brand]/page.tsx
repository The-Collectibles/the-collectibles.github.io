import Card from "@/components/Card";
import SideshowImageHelper from "@/domain/ImageHelper";
import ProductLinkGenerator from "@/domain/ProductLinkGenerator";
import SideshowAffiliateLinkFinder from "@/domain/SideshowAffiliateLinkFinder";
import SideshowUrlCleaner from "@/domain/SideshowUrlCleaner";
import { result } from "@/models/Types";

const sideshowUrlCleaner = new SideshowUrlCleaner();
const productLinkGenerator = new ProductLinkGenerator();
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
  }));
}

export default async function Brand({ params }: { params: { brand: string } }) {
  const gatheredResponses = await allData();
  const affiliateLinkFinder = new SideshowAffiliateLinkFinder();
  const productLinkGenerator = new ProductLinkGenerator();
  const imageHelper = new SideshowImageHelper();
  const getProducts = gatheredResponses.filter(
    (x) => sideshowUrlCleaner.Clean(x.brand) === params.brand
  );

  return (
    <main className="">
      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>{params.brand}</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {getProducts.map((item) => (
            <div className="col">
              <Card
                name={item.name}
                thumbnailImageUrl={imageHelper.GetImageLink(item.thumbnailImageUrl)}
                url={`https://www.sideshow.com${item.url}`}
                productUrl={productLinkGenerator.CreateProductLink(
                  item.brand,
                  item.name,
                  item.sku
                )}
              ></Card>
            </div>
          ))}
        </div>
      </div>

      {getProducts.map((x) => (
        <div className="col">{x.name}</div>
      ))}
      ;
    </main>
  );
}
