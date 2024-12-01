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
  const stars = product.stars;

  // Calculate full, half, and empty stars
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="lg:my-16  min-h-[70dvh] max-w-7xl mx-auto">
      <div className="flex max-lg:px-6 lg:px-12 gap-8 max-lg:flex-col max-lg:items-start max-lg:justify-center">
        <ProductCarousel productImages={product.images} />
        <div className="space-y-4 lg:mx-auto max-w-lg">
          <h2 className="text-4xl font-bold capitalize">{product.name}</h2>
          <div className="flex gap-2">
            <div className="flex gap-1">

              {Array.from({ length: fullStars }).map((_, i) => (
                <Star key={`full-${i}`} className="text-yellow-600 fill-yellow-400" />
              ))}

              {hasHalfStar && (
                <Star
                  key="half"
                  className="text-yellow-600"
                  style={{ fill: "url(#halfStarGradient)" }} 
                />
              )}


              {Array.from({ length: emptyStars }).map((_, i) => (
                <Star key={`empty-${i}`} className="text-yellow-600" />
              ))}
            </div>
            <div className="text-lg font-semibold text-neutral-600">
              {`(${stars}/5)`}
            </div>
          </div>

          <Separator className="bg-neutral-300" />
          <p className="text-xl min-h-[6rem] text-foreground">
            {product.description}
          </p>
          <div className="flex text-xl items-center gap-4">
            Colors
            <div className="flex gap-6">
              <div className="flex center flex-wrap max-w-fit gap-2">
                {product.color.map((e, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: e.value }}
                    className="rounded-full w-6 h-6"
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <Separator className="bg-neutral-300" />
          <h2 className="text-2xl font-bold">
            {formatedPrice(product.price)}
          </h2>
          <AddProduct product={product} />
        </div>
      </div>


      <svg width="0" height="0">
        <defs>
          <linearGradient id="halfStarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="50%" style={{ stopColor: "#FBBF24", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#E5E7EB", stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default page;
