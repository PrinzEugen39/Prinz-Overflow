import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface StatsProps {
  totalQuestion: number;
  totalAnswer: number;
}

const Stats: React.FC<StatsProps> = ({ totalQuestion, totalAnswer }) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900">STATS</h4>

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalQuestion)}
            </p>
            <p className="body-medium text-dark400_light700">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatNumber(totalAnswer)}
            </p>
            <p className="body-medium text-dark400_light700">Anwers</p>
          </div>
        </div>

        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={3}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={22}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={13}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

interface IStatsCard {
  imgUrl: string;
  value: number;
  title: string;
}

function StatsCard({ imgUrl, title, value }: IStatsCard) {
  return (
    <div className="light-border background-light900_dark300 flex flex-wrap items-center justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} width={40} height={50} alt="icon" />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="body-medium text-dark400_light700">{title}</p>
      </div>
    </div>
  );
}

export default Stats;
