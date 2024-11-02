import { getAllProducts, getAllcategories, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import BillBoard from "@/components/BillBoard";
import { ShoppingCart } from "lucide-react";
import CatgoriesCarousel from "@/components/CatgoriesCarousel";

import Features from "@/components/Features";

export const metadata = {
  title: "pawpatte",
  description: "Storeapp",
};
export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();

  const categories = await getAllcategories();
  const products = await getAllProducts({ isFeatured: true });

  return (
    <div className="min-h-screen px-6">
      {billBoards && <BillBoard billboards={billBoards} />}
      <Features />
      {categories && <CatgoriesCarousel categories={categories} />}
      <div className="min-h-[50vh] max-w-7xl mx-auto  ">
        <Heading
          icon={<ShoppingCart className="text-second" />}
          className="mt-6 text-second"
          description="all products"
          title="Products"
        />
        {products && <ProductsGrid items={products} />}
      </div>
    </div>
  );
}
