"use client";
import { GlobalSearchFilter } from "@/constants/filters";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const ResultFilter = ({ noClick }: { noClick: boolean }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const [active, setActive] = useState(type || "");

  function handleTypeClick(type: string) {
    if (active === type) {
      setActive("");
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else if (!noClick) {
      setActive(type);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "type",
        value: type.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  }

  return (
    <div className="flex items-center gap-5 px-4 py-2">
      <p className="body-medium text-dark400_light900">Type:</p>
      <div className="flex gap-3">
        {GlobalSearchFilter.map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={`light-border-2 small-medium rounded-2xl dark:text-light-800 px-4 py-2
              ${
                active === filter.value
                  ? "bg-primary-500 text-light-900"
                  : "hover:text-primary-500 bg-light-700/50 dark:hover:text-primary-500 dark:bg-light-400/50"
              }
              `}
            onClick={() => handleTypeClick(filter.value)}
          >
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ResultFilter;
