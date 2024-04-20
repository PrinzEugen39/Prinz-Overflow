import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type TRenderTagsProps = {
  id: number;
  tagName: string;
  totalQuestion: number;
  showCount?: boolean;
};

const RenderTags = ({
  id,
  tagName,
  totalQuestion,
  showCount,
}: TRenderTagsProps) => {
  return (
    <Link href={`/tags/${id}`} className="flex justify-between gap-2">
      <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase">
        {tagName}
      </Badge>

      {showCount && (
        <p className="small-medium text-dark500_light700">{totalQuestion}</p>
      )}
    </Link>
  );
};

export default RenderTags;
