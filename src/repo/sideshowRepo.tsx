import { result } from "@/models/Types";

export default class SideshowRepo {
  async GetAllItems(itemCount = 1, resultsPerPage = 100) {
    var items = [];

    for (let i = 1; i <= itemCount; i++) {
      var promise = fetch(
        `https://3w37oq.a.searchspring.io/api/search/search.json?page=${i}&ajaxCatalog=v3&resultsFormat=native&siteId=3w37oq&resultsPerPage=${resultsPerPage}&sort=newest&q=&sort.ss_days_since_release=asc`,
        { next: { revalidate: 60 } }
      );

      items.push(promise);
    }

    var gatheredResponses: result[] = [];
    for (let i = 0; i < items.length; i++) {
      var response = (await (await items[i]).json()).results;
      gatheredResponses = gatheredResponses.concat(response);
    }
S
    return gatheredResponses;
  }
}
