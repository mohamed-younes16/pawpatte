"use client";
import { motion as m } from "framer-motion";
import Image from "next/image";
const Features = () => {
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
    <div className="flexcenter flex-wrap gap-4 my-6 max-w-7xl mx-auto">
      {servicesData.map((e, i) => (
        <m.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: i * 0.5,
            duration: 0.5,
          }}
          viewport={{ once: true }}
          className="flexcenter px-2 items-center 
          min-w-[275px]  max-w-[275px] py-4 cursor-pointer 
          rounded-2xl sm:max-w-fit  backdrop-blur-md 
        hover:translate-x-1 duration-150
         hover:-translate-y-1 max-sm:w-full border-[1px]
          bg-neutral-100 border-neutral-300 hover:shadow-2xl gap-3"
        >
          <Image
            src={e.icon}
            className=" object-contain h-[35px] w-[35px]"
            height={50}
            width={50}
            alt={e.desc}
          />
          <div>
            <h2 className=" font-bold mb-1 text-lg">{e.title}</h2>
            <p>{e.desc}</p>
          </div>
        </m.div>
      ))}
    </div>
  );
};

export default Features;
