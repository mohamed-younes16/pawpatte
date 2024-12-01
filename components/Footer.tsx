"use client";

import {
  FacebookIcon,
  InstagramIcon,
  Linkedin,
  TwitterIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const Footer = () => {

  const socialLinks = [
    {
      name: "facebook",
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      link: "https://www.instagram.com/",
    },
    {
      name: "Twitter",
      icon: <TwitterIcon />,
      link: "https://twitter.com/",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin />,
      link: "https://twitter.com",
    },
  ];

  return (
    <div className="max-w-7xl space-y-10 mt-16 mx-auto">
       
    
      <div className="mt-6 flexcenter max-lg:space-y-4 pb-4 max-lg:flex-col">
        <div className="flex-1 flexcenter gap-4 py-4">
          {socialLinks.map((e, i) => (
            <Link
              href={e.link}
              key={i}
              aria-label={`link to my ${e.name}`}
              className="group relative p-2 rounded-full "
            >
              <div className="absolute  z-[2] inset-0 rounded-full bg-cyan-500 scale-0 transition-all group-hover:scale-100 "></div>
              <div className="relative z-10  transition-all group-hover:text-white">
                {e.icon}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex-1 py4 text-foreground ">
          {" "}
          © 2024. All rights reserved .{" "}
        </div>
        <div className="flex-1 flex gap-4 py4">
          <p>Accept </p>
          <Image
            alt=""
            src={"/assets/cart-1.png"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px] object-contain"
          />
          <Image
            alt=""
            src={"/assets/cart-2.png"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px]  object-contain"
          />
          <Image
            alt=""
            src={"/assets/cart-5.png"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px]  object-contain"
          />
          <Image
            alt=""
            src={"/assets/cart-4.ico"}
            height={40}
            width={40}
            className=" h-[30px] w-[30px]  object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
