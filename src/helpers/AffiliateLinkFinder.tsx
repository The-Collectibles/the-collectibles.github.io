import { DataNode, result } from "../models/Types";

export default class AffiliateLinkFinder {

    FindAffiliateLink(id: string, url:string, results: DataNode[]) {
        var result = results.find(x => x.BrandProductId === id);
    
        return result !== undefined ? result.Link : `https://www.sideshow.com${url}`;
    
    }

}