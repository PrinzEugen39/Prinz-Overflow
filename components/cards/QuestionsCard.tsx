import { formatNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import EditDeleteComponent from "../shared/EditDeleteComponent";
import Metric from "../shared/Metric";
import RenderTags from "../shared/RenderTags";

export type TQuestion = {
  _id: string;
  title: string;
  content?: string;
  tags: {
    _id: number;
    name: string;
  }[];
  author: {
    clerkId: any;
    _id: number;
    name: string;
    picture: string;
  };
  upvotes: number[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
};

const QuestionsCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  createdAt,
  answers,
  clerkId,
}: TQuestion) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  // console.log(author);

  return (
    <div className="card-wrapper p-9 sm:px-11 rounded-xl active:scale-[0.98] transition ease-in-out">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/questions/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-2 overflow-hidden flex-1">
              {title}
            </h3>
          </Link>
        </div>
        {/* if signed in add edit delet action */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteComponent type="question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} id={tag._id} tagName={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          value={author.name}
          alt="user"
          title={`- asked ${getTimestamp(createdAt)}`}
          textStyles="text-dark400_light700 body-medium"
          href={`/profile/${author.clerkId}`}
          isAuthor
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          value={formatNumber(upvotes.length)}
          alt="upvotes"
          title="Upvotes"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          value={formatNumber(answers.length)}
          alt="message"
          title="Answers"
          textStyles="text-dark400_light800 small-medium"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          value={formatNumber(views)}
          alt="upvotes"
          title="Views"
          textStyles="text-dark400_light800 small-medium"
        />
      </div>
    </div>
  );
};

export default QuestionsCard;
