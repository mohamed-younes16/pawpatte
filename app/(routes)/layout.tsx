import { ReactNode } from "react";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import { Separator } from "@/components/ui/separator";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <Separator className=" my-16 bg-neutral-600" />
      <Footer />
    </>
  );
}
