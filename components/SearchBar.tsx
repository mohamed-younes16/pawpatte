"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import queryString from "query-string";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "./ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProductsByName } from "@/actions";
import { Search } from "lucide-react";
import ProductsGrid from "./ProductsGrid";
import { Button } from "./ui/button";

export const querySchema = z.object({
  query: z.string().nullable().default(""),
});

const SearchBarDialog = () => {
  const [products, setProducts] = useState<product[]>([]);
  const [noResults, setNoResults] = useState(false); // Track if no results are found
  const router = useRouter();

  const { register, watch, setValue } = useForm<z.infer<typeof querySchema>>({
    resolver: zodResolver(querySchema),
    defaultValues: {
      query: "",
    },
  });
  const search = watch("query") || "";

  const searchReq = async () => {
    getProductsByName(search).then((e: { products: product[] | [] }) => {
      if (e.products.length > 0) {
        setProducts(e.products);
        setNoResults(false); // Reset no results state if products are found
      } else {
        setProducts([]);
        setNoResults(true); // Set no results state to show message
      }
    });
  };

  useEffect(() => {
    if (search === "") setProducts([]);
    const debounceTimeout = setTimeout(() => {
      if (search.length > 0) {
        searchReq();
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [search]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" text-white gap-2 px-4 py-2 rounded-md">
          <Search className="h-6 w-6 " />
          Search
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-screen max-md:p-4 
       bg-neutral-200 max-w-none translate-y-0 top-[0px]"
      >
        <DialogHeader>
          <DialogTitle>Search for a Product</DialogTitle>
        </DialogHeader>
        <form className=" w-full h-20 max-w-[700px] mx-auto flex items-center justify-center">
          <label
            htmlFor="search"
            className="max-md:w-full flexcenter mx-auto gap-4 bg-black-400 rounded-lg px-4 w-full flex"
          >
            <Button
              disabled={!search}
              onClick={() => {
                searchReq();
              }}
              className=" text-white transition-all gap-2 px-4 py-2 rounded-md"
            >
              <Search className="h-6 w-6 " />
            </Button>
            <Input
              {...register("query")}
              placeholder="Search for a product..."
              className=" py-5 border-neutral-400 rounded-full border-[2px] !ring-0 !ring-offset-0"
            />
          </label>
        </form>
        <div className="transition-all overflow-scroll max-h-[60dvh] ">
          {products.length > 0 ? (
            <ProductsGrid search items={products} />
          ) : noResults ? (
            <div className="text-center text-gray-600 mt-4">
              No products found for "{search}".
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBarDialog;
