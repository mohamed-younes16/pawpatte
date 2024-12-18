import { getAllProducts, getAllcategories, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import BillBoard from "@/components/BillBoard";
import { ShoppingCart } from "lucide-react";
import CatgoriesCarousel from "@/components/CatgoriesCarousel";

import Features from "@/components/Features";
import Faq from "@/components/Faq";

export const metadata = {
  title: "pawpatte",
  description: "Storeapp",
};
export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();

  const categories = await getAllcategories();
  const products = await getAllProducts({ isFeatured: true });

  return (
    <div className="min-h-screen ">
      {billBoards && (
        <div className=" w-full max-w-[95dvw] mx-auto">
          {" "}
          <BillBoard billboards={billBoards} />
        </div>
      )}
      <Features />
      {categories && <CatgoriesCarousel categories={categories} />}
      <div id="products" className="min-h-[50vh] max-md:px-[5dvw] px-6  max-w-7xl mx-auto  ">
        <Heading
          icon={<ShoppingCart className="text-second" />}
          className="mt-6 text-second"
          description="all products"
          title="Products"
        />
        {products && <ProductsGrid items={products} />}
        <Faq/>
      </div>
    </div>
  );
}
