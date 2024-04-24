import Image from "next/image";
import Link from "next/link";
import React from "react";
type TMetric = {
  imgUrl: string;
  value: number | string;
  alt: string;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
};

const Metric = ({
  imgUrl,
  value,
  alt,
  title,
  textStyles,
  href,
  isAuthor,
}: TMetric) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={`${href ? "rounded-full object-fill" : "object-contain "}`}
      />

      <p
        className={`flex items-center gap-1 ${textStyles} ${
          isAuthor && "text-dark400_light700"
        }`}
      >
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor && "max-sm:hidden"
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
