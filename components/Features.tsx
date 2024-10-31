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
    <div className="grid grid-cols-1 my-6 sm:grid-cols-2 gap-3 lg:grid-cols-4 max-w-7xl mx-auto">
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
          className="flex items-center py-7 cursor-pointer rounded-2xl sm:max-w-fit backdrop-blur-md 
        hover:translate-x-1 duration-75 hover:-translate-y-1 max-sm:w-full hover:shadow-2xl gap-4"
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
  );
};

export default Features;
