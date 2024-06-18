"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ResultFilter from "./ResultFilter";

const GlobalResults = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [noClick, setNoClick] = useState(false);

  const [result, setResult] = useState([
    {
      type: "question",
      id: "1",
      title: "How to use React?",
    },
    {
      type: "tag",
      id: "2",
      title: "javascript",
    },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    async function fetchResult() {
      setResult([]);
      setIsLoading(true);
      setNoClick(true);

      try {
        setTimeout(() => {
          setResult([
            {
              type: "question",
              id: "1",
              title: "How to use React?",
            },
            {
              type: "tag",
              id: "2",
              title: "javascript",
            },
          ]);
          setIsLoading(false);
          setNoClick(false);
        }, 250);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    if (global) {
      fetchResult();
    }
  }, [global, type]);

  function renderLink(type: string, id: string) {
    return "/";
  }

  return (
    <div className="absolute top-full z-10 w-full mt-3 background-light800_dark300 rounded-lg shadow-sm dark:shadow-none">
      <ResultFilter noClick={noClick}/>

      <div className="border-b border-light-700/85 dark:border-light-400/50"></div>

      <div>
        <p className="paragraph-semibold text-dark-400 dark:text-light-900 px-4 pt-2.5">
          Top Match
        </p>

        {isLoading && (
          <div className="flex flex-col gap-2 justify-center items-center pb-10">
            <div className="loader"></div>
            <p className="paragraph-regular text-dark-300 dark:text-light-900">
              Searching for data...
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="flex flex-col pt-2 pb-4">
            {result.length > 0 ? (
              result.map((item, i) => (
                <Link
                  href={renderLink("type", "id")}
                  key={item.type + item.id + i}
                  className="flex px-4 py-2.5 w-full cursor-pointer items-start gap-3 hover:bg-light-700/50 dark:hover:bg-light-700/10"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    alt="tags"
                    width={18}
                    height={18}
                    className="invert-colors mt-1 object-contain"
                  />
                  <div className="flex flex-col">
                    <p className="body-medium text-dark200_light800 line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-light400_light500 mt-1 small-medium capitalize font-bold">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="self-center pb-10 px-4">
                <p className="paragraph-regular text-dark-300 dark:text-light-900">
                  No results found D:
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalResults;
