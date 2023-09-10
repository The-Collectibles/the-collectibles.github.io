import Card from '@/components/Card';
import SideshowImageHelper from '@/domain/ImageHelper';
import ProductLinkGenerator from '@/domain/ProductLinkGenerator';
import SideshowRepo from '@/repo/sideshowRepo';
import Image from 'next/image'


const sideshowRepo = new SideshowRepo();
const allData = async (itemCount : number,resultsPerPage: number) => await sideshowRepo.GetAllItems(itemCount,resultsPerPage);

const productLinkGenerator = new ProductLinkGenerator();
const imageHelper = new SideshowImageHelper();

export default async function Home() {
  var items = await allData(1,6);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2.5">
          {items.map((item) => (
            <div key={item.uid}>
              <Card name={item.name} thumbnailImageUrl={imageHelper.GetImageLink(item.thumbnailImageUrl)} 
              url={`https://www.sideshow.com${item.url}`} productUrl={productLinkGenerator.CreateProductLink(item.brand,item.name,item.sku)}></Card>
            </div>
          ))}
        </div>
    </main>
  )
}
