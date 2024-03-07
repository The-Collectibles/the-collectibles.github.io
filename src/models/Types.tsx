export type SideshowData = {
    allDataJson : allDataJson,
    allCustomApi: allCustomApi
}

export type allDataJson = {
    nodes: DataNode[]
}

export type DataNode = {
    Brand : string
    Id : string
    BrandProductId : string
    Description : string
    Image : string
    Link : string
    Name : string
    Price : string
}

export type allCustomApi = {
    nodes: result[]
    affiliates : DataNode[]
}

export type brand = {
    brand : string
    nodes : result[]
    affiliates : DataNode[]
}

export type result = {
    brand : string
    brandUrl : string
    sku : string
    description : string
    imageUrl : string
    stockMessage : string
    uid : string
    url : string
    thumbnailImageUrl : string
    price : string
    name : string
    affiliates : DataNode[]
    status: string
}

export type product = {
    name : string
    id : string
    originalid : string
    price : number
    priceHistory : number[]
    currency : string
    brand : string
    url : string

}