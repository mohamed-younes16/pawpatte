import { HomeIcon, LucideLogOut } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import ProfileForm from "@/components/forms/ProfileForm";
import TooltipComp from "@/components/ui/TooltipComp";

import SignOutButton from "@/components/inputs/SignOutButton";
import getCurrentUser from "@/actions/getCurrentUser";
import CliComp from "@/providers/modalProvider";
import UserLoginAlert from "@/components/UserLoginAlert";

export const Heading = ({
  title = "",
  description = "",
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="w-full">
      <h2 className=" text-3xl max-md:text-2xl max-sm:text-xl font-bold">
        {title}{" "}
      </h2>
      <p className="text-muted-foreground max-md:text-base text-lg">
        {description}{" "}
      </p>
    </div>
  );
};

const Page = async () => {
  const CurrentUserData = await getCurrentUser();

  return (
    <>
      {CurrentUserData ? (
        <div
          className="fixed inset-0   flexcenter left-0 top-0  text-black  
    dark:text-white
    min-h-screen dark:bg-[url(/assets/magicdark.svg)] transition-all 
    bg-cover"
        >
          <div className=" w-[80dvw]  p-4 rounded-2xl  mt-6 border-neutral-600 border backdrop-blur-md ">
            <TooltipProvider>
              {" "}
              <div className="flex items-start mb-4 justify-start gap-6">
                <div className="w-fit">
                  <TooltipComp hoverText="Log-out">
                    <SignOutButton>
                      <LucideLogOut className="h-10 w-10 " />
                    </SignOutButton>
                  </TooltipComp>
                </div>

                <Tooltip delayDuration={200}>
                  <TooltipTrigger>
                    <Link href={"/"} aria-label="redirect to profile page ">
                      <HomeIcon className="h-10 w-10 " />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Main Page</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>

            <div className="min-h-[60dvh]">
              <CliComp>
                <ProfileForm userData={CurrentUserData} />
              </CliComp>{" "}
            </div>
          </div>
        </div>
      ) : (
        <UserLoginAlert />
      )}
    </>
  );
};

export default Page;
