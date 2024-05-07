"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavContent() {
  const pathname = usePathname();
  // console.log("pathname", pathname);

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <SheetClose asChild key={link.route}>
            <Link
              href={link.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-normal gap-4 bg-transparent p-3 active:scale-95 transition ease-in-out`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
}

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="hamburger"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="background-light900_dark200 border-none">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={"/assets/images/site-logo.svg"}
            alt="site logo"
            width={23}
            height={23}
          />

          <p className="ml-2 h2-bold text-dark100_light900 dark:text-light-900 font-spaceGrotesk">
            Prinz <span className="text-primary-500">Overflow</span>
          </p>
        </Link>

        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href={"/sign-in"}>
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href={"/sign-up"}>
                  <Button className="text-dark400_light900 small-medium light-border-2 btn-tertiary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
