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
import Guarantee from "./modals/Guarantee";
import ContactInfo from "./Contact-us";
import AboutUs from "./modals/AboutUs";
import SearchBarDialog from "./SearchBar";
export const animalLinks = [
  { name: "Dogs", href: "/product/animal/dog" },
  { name: "Cats", href: "/product/animal/cat" },

  // { name: "Contact", href: "/contact" },
];
const NavBar = ({
  userData,
  displayDiscount,
}: {
  userData: UserFetched | null;
  displayDiscount: boolean;
}) => {
  const matches: boolean = useMediaQuery("(min-width: 1024px)") || false;

  const [categories, setCtagories] = useState(null);
  useEffect(() => {
    (async () => {
      const cates: any = await getAllcategories();
      setCtagories(cates);
    })();
  }, []);

  return (
    <>
      {!matches && (
        <div
          className="z-30 overflow-y-visible fixed bg-white -200 h-[80px] 
        transition-all  w-full  mx-auto left-0 rounded-b-lg top-[0px]   lg:hidden"
        >
          <div className="flex w-full px-2 gap-4  h-full justify-between items-center">
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
            <div className=" w-full flex items-center ">
              <div
                className="flex items-center
             gap-8 max-lg:gap-4 justify-start"
              >
                {" "}
                <CliComp>
                  <Guarantee />
                  <div className="w-fit">
                    <AboutUs  />
                  </div>
                </CliComp>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="z-30 px-[2.5dvw] bg-white overflow-y-visible max-lg:bottom-0 !fixed
        h-[100px] transition-all w-full max-sm:shadow-inner  sm:w-full mx-auto left-0 rounded-b-lg lg:top-0   "
      >

          <div className="flex h-full max-lg:!justify-center justify-between items-center">
            <div className=" w-full max-lg:hidden">
              <div
                className="flex items-center
             gap-4 justify-start"
              >
                <div className="min-w-[225px] flexcenter gap-4 ">
                  <CliComp>
                    <Guarantee />
                    <div className="w-fit">
                      <AboutUs />
                    </div>
                  </CliComp>
                </div>

                {animalLinks.map(({ href, name }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="text-lg font-semibold hover:text-second
                   transition-all text-primary block whitespace-nowrap "
                  >
                    <Button className=" w-[75px] ">{name}</Button>
                  </Link>
                ))}
              </div>
            </div>
            <Link
              className=" w-full max-lg:hidden flexcenter relative "
              href="/"
            >
              <Image
                loading="eager"
                alt="logo"
                height={100}
                width={100}
                className="object-contain h-full min-w-[190px]  max-w-[190px]"
                src={"/assets/LOGO-PAWPATTE-H.png"}
              />
            </Link>

            <div
              className="flex lg:w-full gap-[1.25rem]  max-sm:!justify-center  max-lg:flex-row-reverse 
          max-lg:justify-start items-center lg:justify-between"
            >
              <div className="flexcenter  max-lg:justify-end  max-lg:w-[56px] gap-6 ">
                {!matches && (
                  <MainNav
                    displayDiscount={displayDiscount}
                    categories={categories}
                    userData={userData}
                  />
                )}
              </div>
              <div
                className="flex justify-start
             items-center gap-3 md:min-w-[250px]"
              >
                <SearchBarDialog />
                <ContactInfo />

                <CliComp>
                  <ManageCart userData={userData} />
                </CliComp>
                <div className="md:min-w-[90px] max-lg:hidden">
                  {matches && (
                    <UserHandler
                      displayDiscount={displayDiscount}
                      userData={userData}
                    />
                  )}
                </div>
                {/* <Button className="max-lg:hidden">
                <ModeToggle />
              </Button> */}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default NavBar;
