import Card from '@/components/Card';
import SideshowImageHelper from '@/domain/ImageHelper';
import ProductLinkGenerator from '@/domain/ProductLinkGenerator';
import { result } from '@/models/Types';
import Image from 'next/image'
async function GetAllItems() {
  var items = [];
  var itemCount = 1;
  var resultsPerPage =6;
  
  for (let i = 1; i <= itemCount; i++) {
    var promise = fetch(
      `https://3w37oq.a.searchspring.io/api/search/search.json?page=${i}&ajaxCatalog=v3&resultsFormat=native&siteId=3w37oq&resultsPerPage=${resultsPerPage}&sort=newest&q=&sort.ss_days_since_release=asc`
    );
  
    items.push(promise);
  }
  
  var gatheredResponses : result[] = [];
  for (let i = 0; i < items.length; i++) {
    var response = (await (await items[i]).json()).results;
    gatheredResponses = gatheredResponses.concat(response);
  }

  return gatheredResponses;
}


const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();

export default async function Home() {
  var items = await GetAllItems();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex grid grid-cols-4 gap-4">
      <div className="col">
            <div className="card">
            <a href="/hot-toys" style={{display:"inherit"}}> 
            <Image src="/hot-toys.png" alt="Hot Toys logo" max-height="200px" />
            </a>
              <div className="card-footer text-muted">
                Hot Toys Collectibles
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card bg-dark mb-3">
            <a href="/iron-studios" style={{display:"inherit"}}><Image src="/iron-studios.png" alt="Iron Studios logo" max-height="200px" /></a>
              <div className="card-footer text-muted">
                Iron Studios Collectibles
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={{minHeight:"200px"}}>
            <a href="/sideshow-collectibles" style={{display:"inherit"}}><Image src="/sideshow-collectibles.webp" alt="Sideshow logo" max-height="200px" /></a>
              <div className="card-footer text-muted">
                Sideshow Collectibles
              </div>
            </div>
          </div>

      </div>
      <div className="row mt-4 mb-4">
          <div className="col">
            <h1>Latest Products</h1>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {items.map((item) => (
            <div className="col" key={item.uid}>
              <Card name={item.name} thumbnailImageUrl={imageHelper.GetImageLink(item.thumbnailImageUrl)} 
              url={`https://www.sideshow.com${item.url}`} productUrl={productLinkGenerator.CreateProductLink(item.brand,item.name,item.sku)}></Card>
            </div>
          ))}
        </div>
    </main>
  )
}
