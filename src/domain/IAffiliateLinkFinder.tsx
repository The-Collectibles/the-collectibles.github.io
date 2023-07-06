import { DataNode } from "../models/Types";


export interface IAffiliateLinkFinder {

    FindAffiliateLink(id: string, url: string, results: DataNode[]): string;
}
