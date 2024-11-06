"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { SetupSchema } from "@/models/Schemas/Setup";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useEffect, useState } from "react";

const ProfileForm = ({ userData }: { userData: UserFetched | null }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof SetupSchema>>({
    resolver: zodResolver(SetupSchema),
    defaultValues: {
      name: userData?.name || "",
      address: userData?.address || "",
      phoneNumber: userData?.phoneNumber || "",
    },
    mode: "all",
  });
  const { register } = form;

  const [isSubmitting, setIsSub] = useState(false);

  useEffect(() => {
    setIsSub(form.formState.isSubmitting);
  }, [form.formState]);

  const onSubmit = async (values: z.infer<typeof SetupSchema>) => {
    try {
      toast.loading("Uploading...", { dismissible: false });
      const response = await axios.post(`/api/authentication`, values);
      toast.dismiss();
      toast.success(response.data.message);
      window.location.reload();
      router.refresh();
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          disabled={isSubmitting}
          render={() => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="   ">Name</FormLabel>

              <FormControl className="">
                <Input
                  className="account-form_input"
                  type="text"
                  {...register("name")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          disabled={isSubmitting}
          render={() => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="    ">Adress</FormLabel>

              <FormControl className="">
                <Input
                  className="account-form_input"
                  type="text"
                  {...register("address")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          disabled={isSubmitting}
          render={() => (
            <FormItem className=" flex flex-col   ">
              <FormLabel className="    ">Phone Number</FormLabel>

              <FormControl className="">
                <Input
                  className="account-form_input"
                  type="number"
                  {...register("phoneNumber")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isDirty && (
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${
              isSubmitting ? "  bg-zinc-500" : ""
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
      </form>
    </Form>
  );
};

export default ProfileForm;
