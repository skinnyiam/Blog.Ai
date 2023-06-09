import Link from "next/link";
import React from "react";
type TrendingCardProps = {
  className?: string;
};
const TrendingCard = ({ className }: TrendingCardProps) => {
  return (
    <Link
      className={`${className} hover:opacity-80 relative w-fit transition ease-in-out duration-300 rounded-lg block border border-gray-300`}
      href="/"
    >
      <img src="img.jpg" className="z-0 relative rounded-lg w-96 h-96" />
      <div className="z-1 absolute  top-0 left-0 "></div>
      <div className="absolute z-2 bottom-0 left-0 px-5 py-3">
        <h1 className=" text-white bg-teal-700 rounded-md flex justify-start items-center px-2 py-1">
          category
        </h1>
        <h1 className=" bg-teal-700 font-semibold text-white mt-2 rounded-md flex justify-start  px-3">
          text
        </h1>
      </div>
    </Link>
  );
};
type Props = {};

const Trending = (props: Props) => {
  return (
    <div>
      <div>
        <h1 className="text-teal-700 font-semibold text-2xl w-fit border border-gray-300 rounded-lg  px-5 py-2.5 mr-2 mb-2 flex gap-2">
          Trending Blogs{" "}
          <span className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </span>
        </h1>
      </div>
      <div className="p-4 flex flex-wrap gap-7">
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
        <TrendingCard />
      </div>
    </div>
  );
};

export default Trending;
