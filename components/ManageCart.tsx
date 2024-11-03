"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { productType, useCart } from "@/hooks/store";
import { Button } from "./ui/button";
import * as z from "zod";
import {
  Loader2,
  Minus,
  PlusCircle,
  ShoppingBag,
  ShoppingBasketIcon,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { formatedPrice } from "@/utils";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import axios from "axios";
import { apiLink } from "@/app/layout";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { toast } from "sonner";
import Link from "next/link";
import UserLoginAlert from "./UserLoginAlert";
import { useForm } from "react-hook-form";
import { checkoutSchema } from "@/models/Schemas/Setup";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { checkDiscountCode } from "@/actions";
import { discount } from "@prisma/client";

const ManageCart = ({ userData }: { userData: UserFetched | null }) => {
  const {
    products,
    deleteProduct,
    SideBarOpen,
    setSideBarOpen,
    delteAllProducts,
    setquantity,
  } = useCart();
  const searchParams = useSearchParams();
  const [fetching, setIsFetching] = useState(false);
  const [discount, setDiscount] = useState<discount | null>(null);
  const router = useRouter();

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    setIsFetching(false);
    if (success === "true") {
      toast.success("Success purchase ✅", {
        duration: 10000,
        dismissible: true,
      });
      setTimeout(() => {
        delteAllProducts();
        setSideBarOpen(false);
        router.push("/orders");
      }, 500);
      const current = qs.parse(searchParams.toString());
      let query = { ...current, success: null };
      const url = qs.stringifyUrl(
        { url: window.location.href, query },
        { skipNull: true }
      );
      router.push(url, { scroll: false });
    }
    if (canceled === "true") {
      toast.error("Canceled purchase");
    }
  }, [searchParams]);

  const total = (withDis: boolean) => {
    let tot = 0;
    products &&
      products.forEach((e: any) => {
        tot += Number(e.product.price) * e.quantity;
      });

    return discount && withDis ? tot - (tot * discount.amount) / 100 : tot;
  };

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      address: "",
      email: "",
      name: "",
      phoneNumber: "",
      discountCode: "",
    },
  });

  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof checkoutSchema>) => {
      setIsFetching(true);
      const res = axios.post(`${apiLink}/checkout`, {
        productsData: products.map((e: productType) => ({
          productId: e.product.id,
          quantity: e.quantity,
        })),
        ownerId: userData?.id || "",

        userDetails: {
          ...data,
        },
      });
      res
        .then((e) => {
          setIsFetching(false);
          window.location.href = e.data.url;
        })
        .catch((e) => {
          setIsFetching(false);
          toast.error(e.message);
        });
    }
  );

  return (
    <div>
      <Sheet
        onOpenChange={(e) => e === false && setSideBarOpen(e)}
        open={SideBarOpen}
      >
        <SheetTrigger asChild onClick={() => setSideBarOpen(!SideBarOpen)}>
          <Button className="flexcenter gap-6 text-xl">
            <ShoppingBag /> {products.length}
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"right"}
          className="bg-neutral-200 pt-0  w-[90dvw] z-[9999] 
          h-screen overflow-y-scroll xl:w-[50dvw] !max-w-[1000px]"
        >
          <SheetClose
            className="fixed h-[50px] !max-w-[1000px]  xl:w-[50dvw] w-[90dvw] top-0 right-0 
            flex justify-end backdrop-blur-sm py-2 px-1 4 z-30"
            onClick={() => setSideBarOpen(false)}
          >
            <Button className="text-sm" size={"sm"}>
              close
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
          <div className="mt-[50px] space-y-2">
            <Heading
              icon={<ShoppingBasketIcon className="text-main w-8 p-0 h-8" />}
              description="manage your cart"
              title="Cart Items"
              className="text-main "
            />
            <div className="flex w-full justify-end">
              <Button
                size={"sm"}
                variant={"destructive"}
                disabled={fetching}
                onClick={() => delteAllProducts()}
                className="py-4 relative  gap-4 text-xl "
              >
                {" "}
                <Trash2 />
                Empty All
              </Button>
            </div>

            <div className="flex gap-6 flex-col max-lg:flex-wrap">
              {products.length > 0 ? (
                <>
                  <div className=" space-y-4 w-full border-neutral-300 border-[2px] bg-neutral-100 rounded-lg p-4  overflow-scroll">
                    {products.map(
                      (e: { product: product; quantity: number }, i) => (
                        <>
                          {" "}
                          <Card
                            key={e.product.id}
                            className="w-full relative flex flex-col"
                          >
                            <div className="flex w-full">
                              <div className="group basis-1/3 max-w-[100px] min-w-[100px] rounded-xl relative">
                                <Image
                                  alt={e.product.id}
                                  className="object-contain rounded-xl"
                                  src={e.product.images[0].url}
                                  fill
                                />
                              </div>

                              <CardHeader className="basis-2/3 py-0">
                                <Link href={`/product/${e.product.id}`}>
                                  {" "}
                                  <CardTitle>{e.product.name}</CardTitle>
                                  <CardTitle className="!my-2">
                                    {formatedPrice(e.product.price)}
                                  </CardTitle>
                                  <CardDescription className="text-lg font-semibold desc max-md:text-sm">
                                    {e.product.description}
                                  </CardDescription>{" "}
                                </Link>
                                <div className="text-lg pl-6 pb-6 font-semibold flex items-center gap-6 r desc max-md:text-sm">
                                  <Button
                                    size={"sm"}
                                    onClick={() => setquantity(e.product.id, 1)}
                                    className="bg-green-500"
                                  >
                                    <PlusCircle />
                                  </Button>
                                  <Button
                                    size={"sm"}
                                    onClick={() =>
                                      setquantity(e.product.id, -1)
                                    }
                                    className="bg-red-500"
                                  >
                                    <Minus />
                                  </Button>
                                  <div>
                                    <Button
                                      className="text-xl border-[1px] border-neutral-300"
                                      variant={"outline"}
                                    >
                                      {e.quantity}
                                    </Button>
                                  </div>
                                </div>
                              </CardHeader>
                            </div>
                            <Button
                              className="absolute top-2 py-0 px-4 right-2 z-30"
                              onClick={() => deleteProduct(e.product)}
                            >
                              <X className="max-md:h-4 z-30 max-md:w-4 md-h-6 md:h-6" />
                            </Button>
                          </Card>
                          {products.length !== i + 1 && (
                            <Separator className="bg-neutral-300" />
                          )}
                        </>
                      )
                    )}
                  </div>
                  <Separator className="bg-neutral-400" />
                  <div
                    className="space-y-4 bg-neutral-100 border-neutral-300 border-[2px] rounded-lg  max-lg:space-y-2   p-6
                    text-2xl font-bold w-full "
                  >
                    {
                      products.length > 0 ? (
                        <>
                          <h3>Order Summary</h3>
                          <div className="flex items-center justify-between">
                            Order Price :
                            <p>{formatedPrice(total(false) || 0)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            Discount :
                            <p>
                              {formatedPrice(
                                (discount &&
                                  (discount?.amount / 100) * total(false)) ||
                                  0
                              )}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            Total Price :
                            <p>{formatedPrice(total(true) || 0)}</p>
                          </div>
                          <Form {...form}>
                            <form
                              onSubmit={onSubmit}
                              className="space-y-4  w-full"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Name</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="border-neutral-300 border-[1px] "
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Email</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="border-neutral-300 border-[1px] "
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="phoneNumber"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Phone Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="border-neutral-300 border-[1px] "
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />{" "}
                                <FormField
                                  control={form.control}
                                  name="address"
                                  render={({ field }) => (
                                    <FormItem className="w-full">
                                      <FormLabel>Your full address</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="border-neutral-300 border-[1px] "
                                          {...field}
                                        />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />{" "}
                                {!!userData?.id ? (
                                  <div className="col-span-2">
                                    <FormField
                                      control={form.control}
                                      name="discountCode"
                                      render={({ field }) => (
                                        <FormItem className="w-full">
                                          <FormLabel>Discount Code</FormLabel>
                                          <FormControl className="flex ">
                                            <div className="flex">
                                              <Input
                                                className="border-neutral-300 border-[1px] "
                                                {...field}
                                              />
                                              {discount?.id ? (
                                                <Button
                                                  type="button"
                                                  disabled={fetching}
                                                  className={` transition-all bg-red-600`}
                                                  onClick={() => {
                                                    setDiscount(null);
                                                    form.setValue(
                                                      "discountCode",
                                                      "",
                                                      {
                                                        shouldDirty: true,
                                                        shouldTouch: true,
                                                      }
                                                    );
                                                  }}
                                                >
                                                  <X />
                                                </Button>
                                              ) : (
                                                <Button
                                                  type="button"
                                                  disabled={
                                                    !field?.value || fetching
                                                  }
                                                  className={` transition-all ${
                                                    !field?.value &&
                                                    "!opacity-0"
                                                  }  ${
                                                    discount?.id &&
                                                    "bg-green-400"
                                                  }`}
                                                  onClick={async () => {
                                                    setIsFetching(true);
                                                    const operation =
                                                      checkDiscountCode(
                                                        userData?.id,
                                                        form.watch(
                                                          "discountCode"
                                                        ) || ""
                                                      );

                                                    operation.then(
                                                      (e: {
                                                        message: string;
                                                        discount: discount | null;
                                                      }) => {
                                                        setIsFetching(false);
                                                        setDiscount(e.discount);
                                                        console.log(e.discount);
                                                        e.discount?.id
                                                          ? toast.success(
                                                              e.message,
                                                              { invert: true }
                                                            )
                                                          : toast.error(
                                                              e.message
                                                            );
                                                      }
                                                    );
                                                  }}
                                                >
                                                  apply
                                                </Button>
                                              )}
                                            </div>
                                          </FormControl>
                                        </FormItem>
                                      )}
                                    />
                                  </div>
                                ) : null}
                              </div>
                              <Button
                                disabled={fetching}
                                className="w-full py-6 relative flexcenter gap-4 text-2xl rounded-3xl"
                              >
                                {fetching && (
                                  <Loader2
                                    className={`animate-spin transition-all h-[20px] ${
                                      fetching && "!w-[20px]"
                                    }`}
                                  />
                                )}
                                Checkout
                              </Button>
                            </form>
                          </Form>
                        </>
                      ) : null
                      // <UserLoginAlert />
                    }
                  </div>
                </>
              ) : (
                <p className="text-2xl">No Items Yet</p>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ManageCart;
