import UrlCleaner from "../helpers/UrlCleaner";

const urlCleaner = new UrlCleaner();

export default class ProductLinkGenerator {

    CreateProductLink(brand: string, name: string, sku : string) {
        return `/${urlCleaner.Clean(brand)}/${urlCleaner.Clean(name)}-${sku}`;
    }
}