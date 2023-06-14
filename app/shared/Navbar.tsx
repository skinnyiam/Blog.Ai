import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div>
      <div className="flex justify-between p-3">
        <Link href="/" className="flex justify-center items-center">
          <h1 className="font-medium cursor-pointer text-xl flex justify-center items-center">
            Blog<span className="text-teal-700 ">.Ai</span>
          </h1>
        </Link>

        <div>
          <button
            type="button"
            className="text-white bg-teal-700 border border-gray-300 focus:outline-none hover:bg-teal-800 transition ease-in-out duration-300  focus:ring-gray-200 font-medium rounded-lg text-md px-5 py-2.5 mr-2 mb-2 "
          >
            Sign In
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
