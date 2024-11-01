"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldCheck, X } from "lucide-react";
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
import { Button } from "./ui/button";
import { toast } from "sonner";
import { GuaranteeSchema } from "@/models/Schemas/Setup";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";

const Guarantee = () => {
  const form = useForm({
    resolver: zodResolver(GuaranteeSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      productName: "",

      serialNumber: "",
      issueDescription: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success(
      <p>We've received your guarantee request. We'll get back to you soon.</p>
    );
    form.reset();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flexcenter gap-1">
          <ShieldCheck />
          guarantee
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-neutral-200 h-screen overflow-scroll">
        <AlertDialogCancel className="p-0 absolute w-10 h-10 top- right-0 ">
            <X  className="rounded-full w-6 h-6 "/>
          </AlertDialogCancel> <AlertDialogHeader className=" relative">
       
          <AlertDialogTitle className="text-2xl font-bold text-center mb-6">
            {" "}
            Product Guarantee Form
          </AlertDialogTitle>

          <AlertDialogDescription>
            fill this form correctly with your information to recieve your
            guarantee
          </AlertDialogDescription>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full mx-auto  "
            >
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Personal Information</h2>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex " className="font-semibold flex ">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="your name here" {...field} />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex ">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@mail.com"
                          {...field}
                        />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex ">Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+33 234 567 8901"
                          {...field}
                        />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex ">Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your address" {...field} />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />
              </div>
              <Separator className="w-full bg-neutral-400" />
              {/* Product Information Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Product Information</h2>
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex ">Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product Name" {...field} />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex ">Serial Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Serial Number" {...field} />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="issueDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-semibold flex ">Issue Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the issue"
                          {...field}
                          className="h-32"
                        />
                      </FormControl>
                      
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-green-600">
                Submit Guarantee Request
              </Button>
            </form>
          </Form>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="p-0">
            <Button variant={"destructive"} className="w-full"> cancel</Button>
          </AlertDialogCancel>

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Guarantee;