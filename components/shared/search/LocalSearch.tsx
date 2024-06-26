"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type TLocalSearch = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses = "",
}: TLocalSearch) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "");

  // console.log(pathName, route);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });

        router.push(newUrl, { scroll: false });
      } else {
        if (pathName === route) {
          // console.log("removing search");

          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["search"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathName, router, searchParams, query]);

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-lg px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        type="text"
        placeholder={placeholder}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none text-dark-300 dark:text-light-900"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {iconPosition === "right" && (
        <Image
          src={imgSrc}
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
