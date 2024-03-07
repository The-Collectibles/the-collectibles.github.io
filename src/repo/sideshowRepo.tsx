import { result } from "@/models/Types";
import { readFile } from "fs/promises";

export default class SideshowRepo {
  async GetAllItems(itemCount = 1, resultsPerPage = 100) {

    var collectiblesData = await readFile(process.cwd() + "/src/data/collectibles.json", "utf-8");

    var gatheredResponses: result[] = JSON.parse(collectiblesData);
    return gatheredResponses;
  }
}
