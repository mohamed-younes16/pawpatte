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
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const BillBoard = ({ billboards }: { billboards: billBoard[] }) => {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    skipSnaps: true,
  };

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
    <div
      className="backdrop-blur-lg  bg-cover bg-[#ffffff00] 
     max-w-[95vw] h-[75dvh] max-md:h-[50dvh] overflow-hidden relative mx-auto rounded-xl "
    >
      <Carousel
        setApi={setApi}
        opts={OPTIONS}
        plugins={[
          Autoplay({ delay: 5000, active: true, stopOnInteraction: false }),
        ]}
        className="h-full relative w-full mx-auto"
      >
        <CarouselContent className=" h-[70dvh] max-md:h-[50dvh] ">
          {billboards.map((billboard, i) => {
            return (
              <CarouselItem className="pl-0">
                {billboard.imageUrl.endsWith("mp4") ? (
                  <div
                    className="  
                  z-20 h-full w-full relative "
                  >
                    <div
                      className="z-20 absolute
                       h-full w-full bg-gradient-to-t
                   from-black/50  from-[20%] to-transparent"
                    ></div>
                    <video
                      loop
                      muted
                      className="h-full object-cover w-full"
                      autoPlay
                      preload="none"
                    >
                      <source src={billboard.imageUrl} type="video/mp4" />
                    </video>

                    <div className="w-full bg-black/10 h-[20%] absolute left-0 bottom-0  flexcenter">
                      <Button
                        className="hover:bg-second 
                      font-semibold text-2xl max-md:px-5 max-md:py-4 max-md:text-xl px-9 rounded-full py-8"
                        variant={"secondary"}
                      >
                        shop now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ color: billboard.labelColor }}
                    className=" w-full bg- h-full text-center relative  font-bold "
                  >
                    <div
                      className=" p-12  space-y-12 max-md:space-y-4 max-md:pt-4 pt-12 
                  relative z-20 h-full w-full bg-gradient-to-t
                   from-black/50  from-[20%] to-transparent"
                    >
                      <m.p
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.1,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="text-white font-bold max-w-3xl 
                      text-center mx-auto max-lg:text-[10vw] leading-none  text-[5vw] "
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
                        className="max-w-lg mx-auto text-3xl md:text-[2vw] text-[3vw]
                       text-center  font-normal text-accent/80"
                        initial={{ opacity: 0, y: 100 }}
                      >
                        {billboard.text}
                      </m.p>
                      <div className="w-full bg-black/10 h-[20%] absolute left-0 bottom-0  flexcenter">
                        <Button
                          className="hover:bg-second 
                      font-semibold text-2xl max-md:px-5 max-md:py-4 max-md:text-xl px-9 rounded-full py-8"
                          variant={"secondary"}
                        >
                          shop now
                        </Button>
                      </div>
                    </div>
                    <div className="absolute w-full h-full top-0 left-0">
                      <m.img
                        className={"h-full max w-full block object-cover"}
                        src={billboard.imageUrl}
                      />
                    </div>
                  </div>
                )}
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div
          className="bottom-0 left-0 h-[5vh] absolute
          bg-black/10 flexcenter gap-6  w-full z-50"
        >
          {billboards.map((_, i) => (
            <div
              key={i}
              className={`object-contain cursor-pointer h-5 w-5 rounded-full  transition-all
             select-none h-   () selection:!bg-none ${
               current == i + 1 ? "bg-second " : " bg-white "
             }`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
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
