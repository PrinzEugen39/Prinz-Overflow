import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ObjectId } from "mongodb";

type TRenderTags = {
  id: ObjectId | number;
  tagName: string;
  totalQuestion?: number;
  showCount?: boolean;
};

const RenderTags = ({ id, tagName, totalQuestion, showCount }: TRenderTags) => {
  return (
    <Link href={`/tags/${id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {tagName}
      </Badge>
      {showCount ? (
        <p className="small-medium text-dark500_light700">{totalQuestion}</p>
      ) : null}
    </Link>
  );
};

export default RenderTags;
