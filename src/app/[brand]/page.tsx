import Card from "@/components/Card";
import SideshowImageHelper from "@/domain/ImageHelper";
import ProductLinkGenerator from "@/domain/ProductLinkGenerator";
import SideshowAffiliateLinkFinder from "@/domain/SideshowAffiliateLinkFinder";
import SideshowUrlCleaner from "@/domain/SideshowUrlCleaner";
import { result } from "@/models/Types";
import SideshowRepo from "@/repo/sideshowRepo";

const sideshowUrlCleaner = new SideshowUrlCleaner();
const sideshowRepo = new SideshowRepo();

const allData = async () => await sideshowRepo.GetAllItems(7,500);


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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container my-4">
        <div className="row">
          <div className="col">
            <h1>{getProducts[0]?.brand || params.brand}</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2.5">
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
                price={item.price}
              ></Card>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
