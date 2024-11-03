import { getProductsByName } from "@/actions";

import ProductsGrid from "@/components/ProductsGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Home, FileText, HelpCircle } from "lucide-react";
import Link from "next/link";

import React from "react";

export const metadata = {
  title: "pawpatte",
  description: "Storeapp",
};
const page = async ({
  params: { animalName },
}: {
  params: { animalName: string };
}) => {
  const res = await getProductsByName(animalName.toLocaleUpperCase());
  const products: product[] | [] = res.products;

  return (
    <div className=" my-16 max-w-7xl mx-auto">
      {products?.length > 0 ? (
        <ProductsGrid items={products} />
      ) : (
        <div className="flex flex-col">
          <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      No Results Found
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                      Sorry, we couldn't find any results matching your search.
                      Please try again with different keywords or browse our
                      suggested categories.
                    </p>
                  </div>
                  <div className="w-full max-w-sm space-y-2"></div>
                  <div className="">
                    <Link href={"/"}>
                      {" "}
                      <Button
                        className="items-end py-4 px-6"
                        variant="outline"
                      >
                        <Home className="mr-2 h-6 w-6" />
                        Home
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </div>
  );
};

export default page;
