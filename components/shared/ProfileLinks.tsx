import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProfileLinks {
  imgUrl: string;
  href?: string;
  text: string;
}

const ProfileLinks = ({ imgUrl, href, text }: IProfileLinks) => {
  return (
    <div className="flex-center gap-1">
      <Image src={imgUrl} width={20} height={20} alt="icon" />
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="text-blue-500 paragraph-medium"
        ></Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700">{text}</p>
      )}
    </div>
  );
};

export default ProfileLinks;
