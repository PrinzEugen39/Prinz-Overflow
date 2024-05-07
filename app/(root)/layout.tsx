/* eslint-disable eqeqeq */
"use client";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const route = usePathname();
  const [bgcolor, setBgColor] = useState("");
  // console.log(bgcolor);

  useEffect(() => {
    if (route == "/") {
      setBgColor("background-light800_dark100");
    } else if (route.startsWith("/question")) {
      setBgColor("background-light850_dark100");
    } else if (route.startsWith("/profile")) {
      setBgColor("background-light850_dark100");
    } else if (route == "/ask-question") {
      setBgColor("background-light850_dark100");
    } else {
      setBgColor("background-light800_dark100");
    }
  }, [route]);

  return (
    <main className={`${bgcolor} relative`}>
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl relative">{children}</div>
        </section>
        <RightSidebar />
      </div>

      {/* Toaster */}
    </main>
  );
}
