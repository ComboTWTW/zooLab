import { useEffect, useState } from "react";
import { fetchRations } from "../../../api/getRation";
import { rationsT } from "../../../api/getRation";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ProductsTable from "./ProductsTable";

const Products = () => {
    /* React-query for fetching rations */
    const {
        data: rationsData = [],
        isError,
        refetch,
        isSuccess,
        isRefetching,
        error,
    } = useQuery<rationsT>({
        queryKey: ["fetchRations"],
        queryFn: fetchRations,
    });

    useEffect(() => {
        refetch();
        isSuccess && console.log(rationsData);
    }, []);

    return (
        <div className="max-w-full flex flex-col mt-8 items-start">
            <h2 className="montserrat text-4xl font-bold">Продукция</h2>

            {isSuccess && (
                <div className="max-w-[98%] mt-4">
                    <ProductsTable rationsData={rationsData} />
                </div>
            )}
        </div>
    );
};

export default Products;
