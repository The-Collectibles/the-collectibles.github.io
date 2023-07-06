import { DataNode } from "../models/Types";
import { IAffiliateLinkFinder } from "./IAffiliateLinkFinder";

export default class SideshowAffiliateLinkFinder implements IAffiliateLinkFinder {

    FindAffiliateLink(id: string, url:string, results: DataNode[]) {
        var result = results?.find(x => x.BrandProductId === id);
    
        return result !== undefined ? result.Link : `https://www.sideshow.com${url}`;
    
    }

}