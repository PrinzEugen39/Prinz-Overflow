"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IFilterOptions } from "@/types";

import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

type TFilter = {
  filters: IFilterOptions[];
  constainerClasses?: string;
  otherClasses?: string;
};

const Filter = ({ filters, constainerClasses, otherClasses }: TFilter) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paramFilter = searchParams.get("filter");

  function handleFilterClick(filter: string) {
    // console.log(filter);

    // if (active === filter) {
    //   setActive("");
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "filter",
      value: filter.toLowerCase(),
    });
    // console.log(newUrl);
    

    router.push(newUrl, { scroll: false });
  }
  return (
    <div className={`relative ${constainerClasses}`}>
      <Select
        onValueChange={(value) => handleFilterClick(value)}
        defaultValue={paramFilter || undefined}
        
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5 ring-0 focus:ring-0`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light850_dark300 text-dark500_light700 ">
          <SelectGroup>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
