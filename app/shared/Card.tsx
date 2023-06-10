import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
type Props = {
  className?: string;
  imageHeight: string;
  isSmallCard?: boolean;
  isLongForm?: boolean;
  post: Post;
};

const Card = ({
  className,
  imageHeight,
  post,
  isSmallCard = false,
  isLongForm = false,
}: Props) => {
  const { id, title, author, createdAt, img, snippet } = post || {};
  const date = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" } as any;
  const formatedDate = date.toLocaleDateString("en-us", options);
  return (
    <div className={className}>
      <Link
        className="basis-full hover:opacity-70"
        href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}
      >
        <div className={`relative w-auto mb-3 ${imageHeight}`}>
          <Image
            fill={true}
            style={{ objectFit: "cover" }}
            alt={post?.title}
            src={post?.img}
            sizes="(max-width:480px) 100vw,
          (max-width:768px) 75vw,
          (max-width:1060px) 50vw,
          33vw
          "
          />
        </div>
      </Link>
      <div className="basis-full">
        <Link href={`${process.env.NEXT_PUBLIC_URL}/post/${post?.id}`}>
          <h4
            className={`font-bold text-black hover:text-accent-green
            ${isSmallCard ? "text-base" : "text-lg"}
            ${isSmallCard ? "line-clamp-2" : ""}
          `}
          >
            {title}
          </h4>
        </Link>

        <div className={`${isSmallCard ? "my-2" : "flex my-3"} gap-3`}>
          <h5 className="font-semibold text-xs text-black">{author}</h5>
          <h6 className=" text-xs text-black">{formatedDate}</h6>
        </div>
        <p
          className={` text-black ${
            isLongForm ? "line-clamp-5" : "line-clamp-3"
          }`}
        >
          {snippet}
        </p>
      </div>
    </div>
  );
};

export default Card;
