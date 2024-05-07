import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTags from "./RenderTags";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getHotTags } from "@/lib/actions/tag.action";

export default async function RightSidebar() {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getHotTags();

  return (
    <div className="background-light900_dark200 light-border sticky top-0 right-0 flex flex-col h-screen overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px] custom-scrollbar">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      </div>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question: any) => (
          <Link
            href={`/questions/${question._id}`}
            key={question._id}
            className="flex cursor-pointer items-center justify-between gap-5 group"
          >
            <p className="body-medium text-dark500_light700 line-clamp-1 group-hover:underline">
              {question.title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="arrow-right"
              width={20}
              height={20}
              className="invert-colors group-hover:scale-125 group-active:scale-100 transition ease-in-out"
            />
          </Link>
        ))}
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag: any) => (
            <RenderTags
              key={tag._id}
              tagName={tag.name}
              totalQuestion={tag.totalQuestion}
              id={tag._id}
              showCount
            />
          ))}
        </div>
      </div>
    </div>
  );
}
