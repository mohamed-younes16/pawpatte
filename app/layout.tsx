import { ThemeProvider } from "@/components/ui/theme-provider";

import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { Urbanist } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getCurrentUser from "@/actions/getCurrentUser";
import { getDiscountEligible } from "@/actions";
import { DiscountDialog } from "@/components/modals/Discount";
import { discount } from "@prisma/client";
import CliComp from "@/providers/modalProvider";

const font = Urbanist({ subsets: ["latin"] });
export const apiLink = process.env.NEXT_PUBLIC_API_URL;
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

  const isEligible: { message: string; discount: discount; isUsed: boolean } =
    (await getDiscountEligible(user?.id || "")) || null;
  const discount = isEligible.discount;
  const displayDiscount = !!(user && !isEligible.isUsed);
  return (
    <html suppressHydrationWarning lang="en" className={`${font.className} `}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          storageKey="admin-theme"
        >
          <div
            suppressHydrationWarning
            className="  min-h-screen 
            dark:bg-[url(/assets/magicdark.svg)]
             transition-all 
     pb-0 bg-[ul(/assets/b1.png)]
     bg-white
       bg-fixed max-sm:pb-[110px]   
     pt-[100px]    
  "
          >
            <Analytics />
            <Toaster richColors position="top-center" />
            <NavBar displayDiscount={displayDiscount} userData={user} />
            <CliComp>
              {displayDiscount ? (
                <DiscountDialog user={user} discount={discount} />
              ) : null}
            </CliComp>

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
