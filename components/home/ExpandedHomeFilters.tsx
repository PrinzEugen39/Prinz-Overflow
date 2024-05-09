"use client";
import { HomePageFilters } from "@/constants/filters";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/utils";

const ExpandedHomeFilters = () => {
  // const active = "newest";
  const router = useRouter();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");

  function handleFilterClick(filter: string) {
    if (active === filter) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(filter);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filter.toLowerCase(),
      });      

      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="mt-10 flex-wrap gap-3 md:flex hidden ">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => handleFilterClick(filter.value)}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? "bg-primary-100 text-primary-500"
              : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-200"
          }`}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default ExpandedHomeFilters;
