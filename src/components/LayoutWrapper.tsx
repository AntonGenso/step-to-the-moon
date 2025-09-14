"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/header/header";
import Footer from "@/src/components/footer/footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/login");

  const hideFooter = 
    pathname.startsWith("/profile");

  return (
    <>
      {!hideLayout && <Header />}
      <main>{children}</main>
      {!hideLayout || hideFooter && <Footer />}
    </>
  );
}
