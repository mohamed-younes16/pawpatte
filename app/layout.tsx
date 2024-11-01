import { ThemeProvider } from "@/components/ui/theme-provider";

import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import "./globals.css";
import { Toaster } from "sonner";
import { Urbanist } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import getCurrentUser from "@/actions/getCurrentUser";

const font = Urbanist({ subsets: ["latin"] });
export const apiLink = process.env.NEXT_PUBLIC_API_URL;
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();

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
     pb-0 bg-[url(/assets/b1.png)]
       bg-fixed max-sm:pb-[110px]   
    
     pt-[100px] 
    
  "
          >
            <Analytics />
            <Toaster richColors position="top-center" />
            <NavBar userData={user} />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
