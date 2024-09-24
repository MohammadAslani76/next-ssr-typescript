import Link from "next/link";
import React, {Suspense} from "react";
import Loading from "@/app/components/loading";

// type ApiType = {
//     userId: number,
//     id: number,
//     title: string,
//     completed: boolean
// }

export type TestApi = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    created_at: string;
}

export type ResultApi = {
    products : TestApi[];
    total : number
}

const Products = async () => {

    const response = await fetch("http://localhost:8000/products",{ cache: 'no-store' })
    const data = (await response.json()) as ResultApi

    return (
        <Suspense fallback={<Loading/>}>
            <div className="p-4">
                <Link href="/" className="text-orange-500">Home</Link>
                <div className="flex items-center gap-3 flex-wrap my-3">
                    {
                        data?.products.map((product : TestApi) => (
                            <Link key={product.id} href={`/product/${product.id}`}>
                                <p className="border border-gray-400 rounded p-2">{product.name}</p>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </Suspense>
    );
};

export default Products;