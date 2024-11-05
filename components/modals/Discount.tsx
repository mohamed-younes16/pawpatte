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
import { discount } from "@prisma/client";
import { Separator } from "../ui/separator";
import { useCart } from "@/hooks/store";

const discountSchema = z.object({
  email: z.string().email(),
});

export function DiscountDialog({
  discount,
  userId,
}: {
  discount: discount | null;
  userId: string;
}) {
  const form = useForm<z.infer<typeof discountSchema>>({
    resolver: zodResolver(discountSchema),
    defaultValues: {
      email: "",
    },
  });
  const { discountDialogOpen, setDiscountDialogOpen } = useCart();
  const [isSubmitting, setIsSub] = useState(false);
  const [discountCode, setDiscountCode] = useState<discount | null>(
    discount || null
  );
  useEffect(() => {
    setDiscountDialogOpen(!discount?.id);
  }, []);

  useEffect(() => {
    setIsSub(form.formState.isSubmitting);
  }, [form.formState]);

  async function onSubmit(values: z.infer<typeof discountSchema>) {
    try {
      setIsSub(true);

      const res = await axios.patch(`${apiLink}/discount`, {
        email: values.email,
        id: userId,
      });
      console.log(res);
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    disabled={isSubmitting}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Your E-mail</FormLabel>
                        <FormControl>
                          <Input
                            className="account-form_input"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    {form.formState.isDirty && (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${
                          isSubmitting ? "bg-zinc-500" : ""
                        } flexcenter gap-2`}
                      >
                        Submit
                        {isSubmitting && (
                          <div
                            className="w-4 h-4 border-2 border-white
                             dark:border-black !border-t-transparent rounded-full animate-spin"
                          />
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
