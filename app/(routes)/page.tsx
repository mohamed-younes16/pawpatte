import { getAllProducts, getAllcategories, getBillBoards } from "@/actions";
import Heading from "@/components/Heading";
import ProductsGrid from "@/components/ProductsGrid";
import BillBoard from "@/components/BillBoard";
import { ShoppingCart } from "lucide-react";
import CatgoriesCarousel from "@/components/CatgoriesCarousel";
import Image from "next/image";
import { motion as m } from "framer-motion";
export const metadata = {
  title: "E-commerce Store",
  description: "Storeapp",
};
export default async function Home() {
  const billBoards: billBoard[] = await getBillBoards();
  console.log(billBoards);
  const categories = await getAllcategories();
  const products = await getAllProducts({ isFeatured: true });
  const servicesData = [
    {
      title: "Fast & Secure Delivery",
      desc: "Tell about your service.",
      icon: "/assets/service1.png",
    },

    {
      title: "Money Back Guarantee",
      desc: "Within 10 days.",
      icon: "/assets/service2.png",
    },

    {
      title: "24 Hour Return Policy",
      desc: "No question ask.",
      icon: "/assets/service3.png",
    },
    {
      title: "Pro Quality Support",
      desc: "24/7 Live support.",
      icon: "/assets/service4.png",
    },
  ];
  return (
    <div className="min-h-screen">
      {billBoards && <BillBoard billboards={billBoards} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:grid-cols-4">
        {servicesData.map((e, i) => (
          <m.div
            key={i}
            initial={{ scale: 0, rotateZ: 30 }}
            whileInView={{ rotateZ: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,

              delay: i * 0.3,
            }}
            viewport={{ once: true }}
            className="flex items-center py-7 cursor-pointer rounded-2xl backdrop-blur-md 
            hover:translate-x-1 duration-75 hover:-translate-y-1 hover:shadow-2xl gap-4"
          >
            <Image
              src={e.icon}
              className=" object-contain  h-[60px] w-[60px]"
              height={50}
              width={50}
              alt={e.desc}
            />
            <div>
              <h2 className=" font-bold mb-1 text-xl">{e.title}</h2>
              <p>{e.desc}</p>
            </div>
          </m.div>
        ))}
      </div>
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
