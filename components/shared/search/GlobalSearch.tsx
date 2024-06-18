"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ResultList from "./ResultList";

export default function GlobalSearch() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("global");

  const [search, setSearch] = useState(query || "");
  const [isOpen, setIsOpen] = useState(false);

  // console.log(pathName, route);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          // console.log("removing search");

          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathName, router, searchParams, query]);

  return (
    <div className="relative w-full max-w-[540px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] items-center gap-1 rounded-xl px-4 grow">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
          onFocus={() => {
            if (search !== "" && !isOpen) {
              setIsOpen(true);
            }
          }}
          // onBlur={() => setIsOpen(false)}
          className="paragraph-regular text-dark-300 dark:text-light-900 no-focus background-light800_darkgradient placeholder border-none shadow-none outline-none"
        />
      </div>
      {isOpen && <ResultList />}
    </div>
  );
}
