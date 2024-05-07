import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const intervals = [
    { key: "year", seconds: 31536000 },
    { key: "month", seconds: 2592000 },
    { key: "week", seconds: 604800 },
    { key: "day", seconds: 86400 },
    { key: "hour", seconds: 3600 },
    { key: "minute", seconds: 60 },
  ];

  // Find the largest interval that applies
  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.key}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

/*
1 Function Signature: The function getTimestamp takes a createdAt argument of type Date and returns a string representing the elapsed time.
2 Current Time: It starts by getting the current time using new Date().
3 Seconds Difference: It calculates the difference between the current time and the provided createdAt time in seconds using Math.floor((now.getTime() - createdAt.getTime()) / 1000).
4 Time Intervals: An array named intervals is defined. This array contains objects with two properties: key representing the time unit (year, month, week, etc.) and seconds representing the number of seconds in that unit.
5 Iterating Intervals: The function loops through the intervals array. Inside the loop:
  - It calculates the number of units (count) that have elapsed by dividing the total seconds by the seconds per unit (interval.seconds).
  - If count is greater than 0, it means that this specific time unit applies.
  - The function returns a formatted string indicating the count and the corresponding time unit (e.g., "5 days ago"). The plural form of the unit is added conditionally (e.g., "days" vs "day").
6 Just Now: If none of the intervals apply (less than a minute ago), the function returns "just now".
7 This function provides a human-readable representation of the elapsed time since the provided createdAt date.
*/

export const formatNumber = (number: number): string => {
  const suffixes = ["", "K", "M", "B", "T", "P", "E"];

  const absNumber = Math.abs(number);

  if (absNumber < 1000) {
    return number.toString();
  }

  const exponent = Math.floor(Math.log10(absNumber) / 3) | 0; // Math.floor(log10(absNumber) / 3) rounded to nearest integer
  const scaledNumber = number / Math.pow(1000, exponent);

  return scaledNumber.toFixed(1) + suffixes[exponent];
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => delete currentUrl[key]);

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
