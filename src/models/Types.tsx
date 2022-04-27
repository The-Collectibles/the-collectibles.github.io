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
}


export type result = {
    brand : string
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
}