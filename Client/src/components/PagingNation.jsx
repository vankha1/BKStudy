import React from 'react'

const PagingNation = ({ pagingInfo, setPagingInfo }) => {
    return (
        <div className='flex-between'>
            {
                pagingInfo.curPage == 1 ? (
                    <>
                        {
                            pagingInfo.maxPage == 1 ? (
                                <div className='py-1 px-2 mx-1 bg-blue-700 text-white rounded-md hover:cursor-pointer'>
                                    {pagingInfo.curPage}
                                </div>
                            ) : (
                                <div className="flex-between">
                                    <div className='flex-between'>
                                        <div className='py-1 px-2 mx-1 bg-blue-700 text-white rounded-md hover:cursor-pointer'>
                                            {pagingInfo.curPage}
                                        </div>
                                        <div
                                            className={pagingInfo.curPage + 1 > pagingInfo.maxPage ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                            onClick={() => {
                                                setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage + 1 })
                                            }}
                                        >
                                            {pagingInfo.curPage + 1}
                                        </div>
                                        <div
                                            className={pagingInfo.curPage + 2 > pagingInfo.maxPage ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                            onClick={() => {
                                                setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage + 2 })
                                            }}
                                        >
                                            {pagingInfo.curPage + 2}
                                        </div>
                                        <div className={pagingInfo.curPage + 2 >= pagingInfo.maxPage ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}>
                                            ...
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            pagingInfo.curPage == pagingInfo.maxPage ? (
                                <div className='flex-between'>
                                    <div className={pagingInfo.curPage - 2 <= 1 ? 'hidden' : 'py-1 px-2 mx-1'}>
                                        ...
                                    </div>
                                    <div
                                        className={pagingInfo.curPage - 2 <= 0 ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                        onClick={() => {
                                            setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage - 2 })
                                        }}
                                    >
                                        {pagingInfo.curPage - 2}
                                    </div>
                                    <div
                                        className={pagingInfo.curPage - 1 <= 0 ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                        onClick={() => {
                                            setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage - 1 })
                                        }}
                                    >
                                        {pagingInfo.curPage - 1}
                                    </div>
                                    <div className='py-1 px-2 mx-1 bg-blue-700 text-white rounded-md hover:cursor-pointer'>
                                        {pagingInfo.curPage}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {
                                        pagingInfo.curPage == pagingInfo.maxPage - 1 ? (
                                            <div className='flex-between'>
                                                <div className={pagingInfo.curPage - 1 <= 1 ? 'hidden' : 'py-1 px-2 mx-1'}>
                                                    ...
                                                </div>
                                                <div
                                                    className={pagingInfo.curPage - 1 <= 0 ? 'hidden' : 'py-1 px-2 mx-2 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                                    onClick={() => {
                                                        setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage - 1 })
                                                    }}
                                                >
                                                    {pagingInfo.curPage - 1}
                                                </div>
                                                <div className='py-1 px-2 mx-1 bg-blue-700 text-white rounded-md hover:cursor-pointer'>
                                                    {pagingInfo.curPage}
                                                </div>
                                                <div
                                                    className={pagingInfo.curPage + 1 > pagingInfo.maxPage ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                                    onClick={() => {
                                                        setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage + 1 })
                                                    }}
                                                >
                                                    {pagingInfo.curPage + 1}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='flex-between'>
                                                <div className={pagingInfo.curPage - 1 <= 1 ? 'hidden' : 'py-1 px-2 mx-1'}>
                                                    ...
                                                </div>
                                                <div
                                                    className={pagingInfo.curPage - 1 <= 0 ? 'hidden' : 'py-1 px-2 mx-2 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                                    onClick={() => {
                                                        setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage - 1 })
                                                    }}
                                                >
                                                    {pagingInfo.curPage - 1}
                                                </div>
                                                <div className='py-1 px-2 mx-1 bg-blue-700 text-white rounded-md hover:cursor-pointer'>
                                                    {pagingInfo.curPage}
                                                </div>
                                                <div
                                                    className={pagingInfo.curPage + 1 > pagingInfo.maxPage ? 'hidden' : 'py-1 px-2 mx-1 text-black hover:opacity-70 rounded-md hover:cursor-pointer'}
                                                    onClick={() => {
                                                        setPagingInfo({ ...pagingInfo, curPage: pagingInfo.curPage + 1 })
                                                    }}
                                                >
                                                    {pagingInfo.curPage + 1}
                                                </div>
                                                <div className={pagingInfo.curPage + 1 > pagingInfo.maxPage ? 'hidden' : 'py-1 px-2 mx-1'}>
                                                    ...
                                                </div>
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default PagingNation