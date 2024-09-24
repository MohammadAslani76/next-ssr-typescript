import {TestApi} from "@/app/products/page";
import Loading from "@/app/components/loading";
import React, {Suspense} from "react";
import Link from "next/link";

type ResultType = { result: false } | { result: true, data: TestApi }

async function getProduct(id: string) {
    const response = await fetch(`http://localhost:8000/product/${id}`,{cache: 'no-store'})
    const data = (await response.json()) as ResultType;
    return data;
}

const Product = async ({params: { id }}: { params: { id: string } }) => {

    const data = await getProduct(id)

    if (!data || !data?.result) return (
        <div className="h-screen flex items-center justify-center">
            Page not found
        </div>
    )

    return (
        <Suspense fallback={<Loading/>}>
            <div className="p-2">
                <Link href="/products" className="text-orange-500">Products</Link>
                <p className="border border-gray-400 rounded p-2 mt-2">{data.result ? data.data.name : ""}</p>
            </div>
        </Suspense>
    );
};

export default Product;