import { useSearchParams } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCart } from "@/hooks/store";
import Image from "next/image";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import MenuItem from "./navbar/MenuItem";
import {
  Album,
  BadgePercent,
  LucideLogOut,
  Menu,
  User,
  UserIcon,
} from "lucide-react";
import { Separator } from "./ui/separator";
import SignOutButton from "./inputs/SignOutButton";
import { useEffect, useState } from "react";
import Link from "next/link";

import CliComp from "@/providers/modalProvider";

const UserHandler = ({
  userData,
  displayDiscount = false,
}: {
  userData: UserFetched | null;
  displayDiscount: boolean;
}) => {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState<"login" | "register" | null>(
    searchParams.get("redirected") === "true" ? "login" : null
  );
  const [popopen, setpopopen] = useState(false);
  useEffect(() => {
    const redirected = searchParams.get("redirected") === "true";
    setpopopen(redirected && userData === null);
  }, [searchParams]);
  const { discountDialogOpen, setDiscountDialogOpen } = useCart();
  return (
    <Popover open={popopen} onOpenChange={setpopopen}>
      <PopoverTrigger asChild>
        <div
          className="flexcenter group/profile relative p-2 transition-all 
                  shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0.2)]
                  border-foreground/20 font-semibold border max-lg:w-full  hover:shadow-[inset_0px_3px_6px_0px_hsl(var(--foreground)_/_0)] cursor-pointer  rounded-full py-2 gap-2"
        >
          <User className="h-6 transition-all  group-hover/profile:text-main" />
          <Menu className="h-6 transition-all  group-hover/profile:text-main" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="-translate-x-4  p-2">
        {!userData ? (
          <CliComp>
            <LoginModal setOpen={setOpen} open={open} />
            <Separator className="my-2" />
            <RegisterModal setOpen={setOpen} open={open} />
          </CliComp>
        ) : (
          <>
            <MenuItem onclick={() => {}}>
              <Link className="w-full flex gap-2" href={"/profile"}>
                <UserIcon /> Profile
              </Link>
            </MenuItem>
            {displayDiscount && (
              <>
                <Separator className="my-2" />{" "}
                <MenuItem
                  onclick={() => {
                    setDiscountDialogOpen(!discountDialogOpen);
                  }}
                >
                  <div className="w-full flex gap-2">
                    <BadgePercent /> Discount
                  </div>
                </MenuItem>
              </>
            )}
          </>
        )}

        <Separator className={`my-2 ${!userData && "hidden"}`} />

        {userData && (
          <>
            <MenuItem onclick={() => {}}>
              <Link className="w-full flex gap-2" href={"/orders"}>
                <Album /> Orders
              </Link>
            </MenuItem>
            <Separator className="my-2" />
            <MenuItem className=" flexcenter text-red-600" onclick={() => {}}>
              <SignOutButton>
                <div className="flex w-full h-full gap-1 items-center">
                  <LucideLogOut className="h-6 w-6 " /> Logout
                </div>
              </SignOutButton>
            </MenuItem>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default UserHandler;
