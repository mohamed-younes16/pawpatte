"use client";
import MainNav from "./MainNav";
import Link from "next/link";
import { getAllcategories } from "../actions";
import { ModeToggle } from "./ui/themeButton";
import ManageCart from "./ManageCart";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import CliComp from "@/providers/modalProvider";

import { useMediaQuery } from "usehooks-ts";
import UserHandler from "./UserHandler";
import Image from "next/image";
import Guarantee from "./Guarantee";

const NavBar = ({ userData }: { userData: UserFetched | null }) => {
  const matches: boolean = useMediaQuery("(min-width: 768px)") || false;
  const [categories, setCtagories] = useState(null);
  useEffect(() => {
    (async () => {
      const cates = await getAllcategories();
      setCtagories(cates);
    })();
  }, []);
  const links = [
    { name: "About Us", href: "/about-us" },
    { name: "Contact", href: "/contact" },
    { name: "Dogs", href: "/dogs" },
    { name: "Cats", href: "/cats" },
  ];
  return (
    <>
      <div
        className="z-30 overflow-y-visible fixed bg-main h-[80px] 
        transition-all  w-full  mx-auto left-0 rounded-b-lg top-[0px] p-4  sm:hidden"
      >
        <div className="flex w-full max-sm:hidden h-full justify-between items-center">
          {" "}
          <Link className="h-[65px] w-[65px] relative " href="/">
            <Image
              loading="eager"
              alt="logo"
              className=" object-contain"
              fill
              src={"/assets/logo.png"}
            />
          </Link>
        </div>
      </div>
      <div
        className="z-30 bg-neutral-200  overflow-y-visible max-sm:bottom-0 !fixed
        h-[100px] transition-all w-full max-sm:shadow-inner   sm:w-full left-0 mx-auto sm:left-0 rounded-b-lg sm:top-0 p-4  "
      >
        <div className="flex h-full  max-sm:!justify-center  justify-between items-center">
          <Link className="h-[85px] w-[85px] max-sm:hidden relative " href="/">
            <Image
              loading="eager"
              alt="logo"
              className=" object-contain"
              fill
              src={"/assets/logo.png"}
            />
          </Link>

          <div className="flex-1 w-full max-md:hidden">
            {/* Small list of links */}
            <div className="flexcenter pl-36 max-lg:pl-14 gap-8 justify-center">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-lg font-semibold hover:text-white
                   transition-all text-primary block whitespace-nowrap "
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex gap-[1.25rem]  max-sm:!justify-center  max-lg:flex-row-reverse 
          max-lg:justify-start items-center lg:justify-between">
            <div className="flexcenter  max-md:justify-end  max-md:w-[56px] gap-6 ">
              {!matches && (
                <MainNav categories={categories} userData={userData} />
              )}
            </div>
            <div className="flexcenter gap-3 md:min-w-[250px]">
              {" "}
              <Guarantee />
              <CliComp>
                <ManageCart userData={userData} />
              </CliComp>
              <div className="md:min-w-[90px] max-md:hidden">
                {matches && <UserHandler userData={userData} />}
              </div>
              {/* <Button className="max-md:hidden">
                <ModeToggle />
              </Button> */}
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default NavBar;
