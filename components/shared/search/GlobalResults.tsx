"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const GlobalResults = () => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    async function fetchResult() {
      setResult([]);
      setIsLoading(true);

      try {
        // fetch data everywhere
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    }
  }, [global, type]);

  return (
    <div className="absolute top-full z-10 w-full mt-3 background-light800_dark300 rounded-lg shadow-sm dark:shadow-none">
      <p className="paragraph-regular text-dark-400 dark:text-light-900 px-4 py-2">
        Filters will be displayed here
      </p>

      <div className="border-b border-light-700/85 dark:border-light-400/50"></div>

      <div className="space-y-5">
        <p className="paragraph-semibold text-dark-400 dark:text-light-900 px-4 py-2">
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
          <div className="flex flex-col py-2 px-4">
            {result.length > 0 ? (
              result.map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <p className="paragraph-regular text-dark-300 dark:text-light-900">
                    asd
                  </p>
                </div>
              ))
            ) : (
              <div className="self-center pb-10">
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
