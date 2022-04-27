
export default class UrlCleaner {

    Clean(item: string): string {
        let cleanedItem = item.replace(/[#|"&\s:()'".;%]/g, "-")
            .replace(/---/g, "-")
            .replace(/--/g, "-").trim().toLocaleLowerCase();

        if (cleanedItem.endsWith("-")) {
            cleanedItem = cleanedItem.substring(0, cleanedItem.length - 1);
        }

        return cleanedItem;
    }
}
