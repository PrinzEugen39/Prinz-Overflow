import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Filter from "./Filter";
import ParseHTML from "./ParseHTML";

interface IAnswerProps {
  authorId: string;
  questionId: string;
  totalAnswers: number;
  page?: number;
  pageSize?: number;
  filter?: string;
}

const AllAnswers = async ({
  authorId,
  questionId,
  totalAnswers,
}: IAnswerProps) => {
  const result = await getAnswers({ id: questionId });

  return (
    <div className="mt-11">
      <div className="flex justify-between items-center">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {result?.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 sm:flex-1">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    height={18}
                    width={18}
                    alt="profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.name}{" "}
                    </p>
                    <p className="small-regular mt-0.5 line-clamp-1 text-light400_light-500 ml-1">
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>

                <div className="flex justify-end">VOTING</div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
