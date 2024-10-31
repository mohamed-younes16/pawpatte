"use client";
import { motion as m } from "framer-motion";

import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";

const BillBoard = ({ billboards }: { billboards: billBoard[] }) => {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    skipSnaps: true,
  };
  return (
    <div className="backdrop-blur-lg  bg-cover bg-[#ffffff00]  max-w-[95rem] overflow-hidden relative mx-auto rounded-xl ">
      <Carousel
        opts={OPTIONS}
        // plugins={[
        //   Autoplay({ delay: 5000, active: true, stopOnInteraction: false }),
        // ]}
        className="h-full relative max-w-4xl mx-auto"
      >
        <CarouselContent className="h-[500px] max-md:h-[200px]">
          {billboards.map((billboard, i) => {
            return (
              <CarouselItem >
                <div
                  style={{ color: billboard.labelColor }}
                  className=" w-full bg- h-full flex bg-cyan-100 
                  center relative  font-bold "
                >
                  <div className="flex-1  p-12 space-y-6 max-md:space-y-2 max-md:pt-4 pt-12 relative z-20 h-full w-full bg-gradient-to-tr from-black/80  from-[60%] to-black/30">
                    <m.p
                     
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.1,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="text-white font-bold max-md:text-xl text-5xl"
                      initial={{ opacity: 0, y: 100 }}
                    >
                      {billboard.label}
                    </m.p>

                    <m.p
                    
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="max-w-md text-xl max-md:text-sm font-normal text-white"
                      initial={{ opacity: 0, y: 100 }}
                    >
                      {billboard.text}
                    </m.p>
                  </div>
                  <div className="absolute w-full h-full top-0 left-0">
                    <m.img
                      className={"h-full max w-full block object-cover"}
                      src={billboard.imageUrl}
                    />
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className="top-1/2 left-0
          bg-black/10 !rounded-none w-10 !border-none !h-full"
        />
        <CarouselNext
          className="top-1/2 right-0
          bg-black/10 !rounded-none w-10 !border-none !h-full"
        />

      </Carousel>

      {/* {link ? (
        <Link
          style={{ color: billboard.labelColor }}
          href={`/categories/${billboard?.categories[0]?.id}`}
          className="absolute z-20  w-full
    duration-500 transition-all h-full flexcenter  -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl"
        >
          {billboard.label}
        </Link>
      ) : (
        <div
          style={{ color: billboard.labelColor }}
          className="absolute z-20  w-full 
  duration-500 transition-all  gap-1 h-full flexcenter  -translate-y-1/2  top-1/2 max-md:text-2xl font-bold text-5xl"
        >
          {labelWords.map((e, i) => (
            <m.p
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 * i,
                duration: 0.6,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              initial={{ opacity: 0, y: 100 }}
            >
              {e}
            </m.p>
          ))}
        </div>
      )} */}

      {/* <m.img
        viewport={{ once: true }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        initial={{ opacity: 0, x: -20 }}
        alt=""
        src={billboard.imageUrl}
        className="absolute inset-0 h-full w-full  z-[15] object-contain"
      /> */}
      {/* <m.img
        viewport={{ once: true ,}}
        whileInView={{ opacity: 1, translateY: "0%" }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        initial={{ opacity: 0, translateY: "50%" }}
        alt=""
        height={600}
        width={500}
        src={"/assets/shape-2.png"}
        className=" absolute right-0 top-1/4 w-fit !h-full z-10 object-contain"
      />

      <m.img
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 1,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        initial={{ opacity: 0, y: "-50%" }}
        alt=""
        height={600}
        width={500}
        src={"/assets/shape-1.png"}
        className=" absolute left-0 w-fit  top-1/4 !h-full  ma]   z-10 object-contain"
      /> */}
    </div>
  );
};

export default BillBoard;
