"use client";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface IVotes {
  itemId: string;
  upvotes: number;
  downvotes: number;
}

const NotLoggedInVotes = ({ itemId, upvotes, downvotes }: IVotes) => {
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: undefined,
    });

    // alert("viewed question");
  }, [itemId, path, router]);

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={"/assets/icons/upvoted.svg"}
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={"/assets/icons/downvoted.svg"}
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedInVotes;
