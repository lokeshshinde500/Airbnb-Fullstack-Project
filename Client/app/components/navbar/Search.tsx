"use client";

import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <>
      <div className="border-[1px] w-full md:w-auto shadow-sm hover:shadow-md py-2 rounded-full transition cursor-pointer">
        <div className="flex flex-row justify-between items-center">
          <div className="text-sm font-semibold px-6">Any place</div>
          <div className="sm:block hidden text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
            any week
          </div>
          <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
            <div className="hidden sm:block ">Add guess</div>
            <div className="p-2 bg-rose-500 rounded-full text-white">
              <BiSearch size={18} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
