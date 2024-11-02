import { getProduct, getProductsByName } from "@/actions";
import ProductCarousel from "@/components/ProductCarousel";
import ProductsGrid from "@/components/ProductsGrid";

import { formatedPrice } from "@/utils";

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
  const products: product[] = await getProductsByName(
    animalName.toLocaleUpperCase()
  );

  return (
    <div className=" my-16 max-w-7xl mx-auto">
      {/* {products && <ProductsGrid items={products} />} */}
    </div>
  );
};

export default page;
