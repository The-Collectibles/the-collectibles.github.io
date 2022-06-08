import { IUrlCleaner } from "./IUrlCleaner";

export default class SideshowUrlCleaner implements IUrlCleaner {
  Clean(item: string): string {
    if (item === null || item == undefined) {
      return "default";
    }

    let cleanedItem = item
      .replace(/[#|"&\s:()'".;%]/g, "-")
      .replace(/---/g, "-")
      .replace(/--/g, "-")
      .trim()
      .toLocaleLowerCase();

    if (cleanedItem.endsWith("-")) {
      cleanedItem = cleanedItem.substring(0, cleanedItem.length - 1);
    }

    return cleanedItem;
  }
}
