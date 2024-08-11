import { GetTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTags from "../shared/RenderTags";

interface ICommunityCardProps {
  user: {
    _id: string;
    name: string;
    clerkId: string;
    username: string;
    picture: string;
  };
}

const CommunityCard = async ({ user }: ICommunityCardProps) => {
  const interactedTags = await GetTopInteractedTags({ userId: user._id });
  
  return (
    <div className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px] active:scale-95 transition ease-in-out">
      <Link
        href={`/profile/${user.clerkId}`}
        className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8"
      >
        <Image
          src={user.picture}
          alt={"user pfp"}
          width={240}
          height={240}
          className="rounded-full object-cover size-32"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name !== "null" ? user.name : user.username}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">@{user.username}</p>
        </div>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTags key={tag.id} id={tag.id} tagName={tag.tagName} isLink={false} />
              ))}
            </div>
          ) : (
            <Badge>No tags yet</Badge>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CommunityCard;
