"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductCarousel = ({ productImages }: { productImages: ImageType[] }) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="lg:basis-1/2 !select-none  max-lg:mx-auto max-w-[400px] items-center flex flex-col">
      <Carousel setApi={setApi} className="w-[80%] lg:h-[300px] lg:w-[400px]   mx-auto outline rounded-2xl outline-[2px] outline-neutral-400">
        <CarouselContent className="lg:h-[300px] -ml-0 lg:w-[400px]   max-lg:h-[200px] ">
          {productImages.map((el) => (
            <CarouselItem  className="w-ful lg:h-[300px] lg:w-[400px]  pl-0" key={el.id}>
              <Image
                alt={el.createdAt}
                className="object-contain h-full overflow-hidden  rounded-xl !w-full "
                src={el.url}
                height={50}
                width={100}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex py-6 w-[80%] mx-auto select-none cursor-pointer overflow-auto gap-6 max-w-2xl">
        {productImages.map((e, i) => (
          <Image
            key={i}
            className={`rounded-xl h-[100px] min-w-[110px] object-contain  transition-all
             select-none selection:!bg-none  border-4 ${
               current == i + 1 && "border-cyan-400"
             }`}
            alt=""
            onClick={() => api?.scrollTo(i)}
            height={80}
            width={100}
            src={e.url}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
