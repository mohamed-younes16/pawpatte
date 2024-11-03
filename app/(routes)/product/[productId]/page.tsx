import { getProduct } from "@/actions";
import ProductCarousel from "@/components/ProductCarousel";

import { formatedPrice } from "@/utils";

import React from "react";
import AddProduct from "./components/AddProduct";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

export const metadata = {
  title: "pawpatte",
  description: "Storeapp",
};
const page = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product: product = await getProduct(productId);

  return (
    <div className=" my-16 min-h-[70dvh] max-w-7xl mx-auto">
      <div className="flex gap-10 max-lg:flex-wrap  max-lg:justify-center">
        <ProductCarousel productImages={product.images} />
        <div className=" space-y-4 max-w-lg ">
          <h2 className="text-4xl font-bold capitalize">{product.name} </h2>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((e) => (
              <>
                <Star className="text-yellow-600 fill-yellow-400" />
              </>
            ))}
          </div>

          <Separator className="bg-neutral-300" />
          <p className="text-xl min-h-[6rem] text-foreground">{product.description} </p>
          <div className="flex text-xl items-center gap-4">
            Colors
            <div className="flex gap-6 ">
              <div className="flexcenter flex-wrap max-w-fit gap-2">
                {" "}
                {product.color.map((e) => (
                  <div
                    style={{ backgroundColor: e.value }}
                    className="rounded-full w-6 h-6"
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <Separator className="bg-neutral-300" />
          <h2 className="text-2xl font-bold">
            {formatedPrice(product.price)}{" "}
          </h2>
          <AddProduct product={product} />
        </div>
      </div>
    </div>
  );
};

export default page;
