"use client"
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import jsonData from '../../data/collectibles.json'
import Card from '@/components/Card';
import SideshowImageHelper from '@/domain/ImageHelper';
import ProductLinkGenerator from '@/domain/ProductLinkGenerator';

export default async function Search() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || ""
    const productLinkGenerator = new ProductLinkGenerator();
    const imageHelper = new SideshowImageHelper();

    const filteredResults = jsonData.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Search</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2.5">
                    {filteredResults.map((item, index) => (
                        <div key={item.id}>
                            <Card name={item.name} thumbnailImageUrl={imageHelper.GetImageLink(item.imageUrl)} price={item.price.toString()}
                                url={`https://www.sideshow.com${item.url}`} productUrl={productLinkGenerator.CreateProductLink(item.brand || "", item.name, "")}></Card>
                        </div>
                    ))}
            </div>
        </main>
    );
};
