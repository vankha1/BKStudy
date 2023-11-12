import Image from "next/image";

const FilterSearch = ({ title }) => {
  return (
    <div className="flex flex-col my-5">
      <div className="text-xl font-bold top-0 left-0 mb-2">{title}</div>
      <div className="relative border-t border-solid border-black flex-between">
        <div className="w-20 border border-solid border-black px-2 py-1 flex-between rounded-lg mt-4">
          All
          <Image
            className=""
            src="/assets/icons/downward.svg"
            alt="Profile Picture"
            width={20}
            height={20}
            priority
          />
        </div>
        <div className="w-[65rem] border border-solid border-black px-2 py-1 flex-between rounded-lg mt-4">
          Tìm kiếm
        </div>
      </div>
    </div>
  );
};

export default FilterSearch;
