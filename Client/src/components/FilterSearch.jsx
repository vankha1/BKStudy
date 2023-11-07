import Image from 'next/image';

const FilterSearch = () => {
    return (
        <div className='relative border-t border-solid border-black flex-between'>
            <div className='w-20 border border-solid border-black px-2 py-1 flex-between rounded-lg mt-4'>
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
            <div className='w-[65rem] border border-solid border-black px-2 py-1 flex-between rounded-lg mt-4'>
                Tìm kiếm
            </div>
        </div>
    )
}

export default FilterSearch