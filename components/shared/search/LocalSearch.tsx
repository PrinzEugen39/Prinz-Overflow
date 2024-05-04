"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

type TLocalSearch = {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
};

const LocalSearch = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses = "",
}: TLocalSearch) => {
  return (
    <div
      className={`background-light850_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-lg px-4 ${otherClasses}`}
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
        className="paragraph-regular no-focus placeholder background-light850_darkgradient border-none shadow-none outline-none"
        value={""}
        onChange={() => {}}
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
