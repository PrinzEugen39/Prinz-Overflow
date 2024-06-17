"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { formUrlQuery } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";

interface ICustomPagination {
  currentPage: number;
  totalPages: number;
  isNext?: boolean;
}

const CustomPagination = ({
  currentPage,
  totalPages,
  isNext,
}: ICustomPagination) => {
  const isPrev = currentPage > 1;
  const router = useRouter();
  const searchParams = useSearchParams();

  function handlePrev() {
    if (isPrev) {
      // console.log("Prev");
      const prevPage = currentPage - 1;

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: prevPage.toString(),
      });

      // console.log("prev", newUrl);
      router.push(newUrl);
    }
  }

  function handleNext() {
    if (isNext) {
      // console.log("Next");
      const nextPage = currentPage + 1;

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "page",
        value: nextPage.toString(),
      });

      // console.log("next", newUrl);
      router.push(newUrl);
    }
  }

  return (
    <Pagination className="select-none">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`card-wrapper w-28 mx-auto
              ${
                isPrev
                  ? "cursor-pointer hover:bg-light-800 dark:hover:bg-dark-300"
                  : "cursor-default opacity-85"
              }
            `}
            onClick={handlePrev}
          />
        </PaginationItem>
        {currentPage >= 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {[...Array(totalPages)].map((_, i) => {
          const countPage = i + 1;
          if (countPage === currentPage) {
            return (
              <PaginationItem key={countPage}>
                <PaginationLink className="bg-primary-500 text-white font-semibold">
                  {countPage}
                </PaginationLink>
              </PaginationItem>
            );
          }
          if (countPage > currentPage - 2 && countPage < currentPage + 2) {
            return (
              <PaginationItem key={countPage}>
                <PaginationLink className="card-wrapper">
                  {countPage}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return null;
        })}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="">
          <PaginationNext
            className={`card-wrapper w-28 mx-auto  ${
              isNext
                ? "cursor-pointer hover:bg-light-800 dark:hover:bg-dark-300"
                : "cursor-default opacity-85"
            }`}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
