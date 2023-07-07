import Card from "@/components/Card";
import SideshowImageHelper from "@/domain/ImageHelper";
import ProductLinkGenerator from "@/domain/ProductLinkGenerator";
import SideshowAffiliateLinkFinder from "@/domain/SideshowAffiliateLinkFinder";
import SideshowUrlCleaner from "@/domain/SideshowUrlCleaner";
import { result } from "@/models/Types";
import SideshowRepo from "@/repo/sideshowRepo";

const sideshowUrlCleaner = new SideshowUrlCleaner();
const sideshowRepo = new SideshowRepo();

const allData = async () => await sideshowRepo.GetAllItems();


export async function generateStaticParams() {
  const gatheredResponses = await allData();

  return gatheredResponses.map((post) => ({
    brand: sideshowUrlCleaner.Clean(post.brand),
  }));
}

export default async function Brand({ params }: { params: { brand: string } }) {
  const gatheredResponses = await allData();
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
            <div className="col" key={item.uid}>
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


    </main>
  );
}
