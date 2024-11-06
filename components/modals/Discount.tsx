"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";

import { useEffect, useState } from "react";
import { apiLink } from "@/app/layout";
import { discount, User } from "@prisma/client";
import { Separator } from "../ui/separator";
import { useCart } from "@/hooks/store";

export function DiscountDialog({
  discount,
  user,
}: {
  discount: discount | null;
  user: UserFetched;
}) {
  const { discountDialogOpen, setDiscountDialogOpen } = useCart();
  const [isSubmitting, setIsSub] = useState(false);
  const [discountCode, setDiscountCode] = useState<discount | null>(
    discount || null
  );
  useEffect(() => {
    setDiscountDialogOpen(!discount?.id);
  }, []);

  async function fetchCode() {
    let data;
    try {
      setIsSub(true);
      const res = await axios.patch(`${apiLink}/discount`, {
        email: user?.email,
        id: user?.id,
      });
      data = {
        discountAmount: res.data.discount.amount,
        promoCode: res.data.discount.id.slice(0, 10).toUpperCase(),
        email: user.email,
      };
      setDiscountCode(res.data.discount);

      toast.success(res.data.message);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setIsSub(false);
    }
    return data;
  }

  return (
    <Dialog
      defaultOpen={discountDialogOpen}
      open={discountDialogOpen}
      onOpenChange={setDiscountDialogOpen}
    >
      <DialogContent className=" bg-neutral-200">
        <DialogTitle className="text-center">Congratulations!</DialogTitle>
        <Separator className="my-4 bg-neutral-400" />
        <DialogDescription>
          {discountCode ? (
            <div className="h-20 flexcenter flex-col">
              <p className="text-3xl font-bold text-black">
                {discountCode?.amount}%{" "}
              </p>
              <h2 className="text-lg font-semibold">Your Discount Code:</h2>
              <p className="text-2xl font-semibold text-black">
                {discountCode.id.toLocaleUpperCase().slice(0, 10)}
              </p>
            </div>
          ) : (
            <>
              <p>
                You’re eligible for a discount. Enter your email to receive your
                discount code.
              </p>

              {
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={async () => {
                    const data = await fetchCode();

                    if (data) {
                      const adding = axios.post(`${apiLink}/send`, data);
                      adding
                        .then((e) => {
                          toast.success(e.data.message);
                        })
                        .catch((e) => {
                          console.log(e);
                          toast.error("Error Happend");
                        });
                    }
                  }}
                  className={`${
                    isSubmitting ? "bg-zinc-500" : ""
                  } flexcenter mx-auto my-4
                   gap-2`}
                >
                  Get your code
                  {isSubmitting && (
                    <div
                      className="w-4 h-4 border-2 border-white
                             dark:border-black !border-t-transparent rounded-full animate-spin"
                    />
                  )}
                </Button>
              }
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
