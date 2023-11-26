'use client';
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const RenderLessons =
    ({
        course,
        setCourse,
        courseId,
        handleAddNewChapter,
        handleDeleteChapter,
        prevChapterName,
        handleEditChapter,
        courseName,
    }) => {
        const [displayChapter, setDisplayChapter] = useState([]);
        const [isAddChapter, setIsAddChapter] = useState(false);
        const [newChapter, setNewChapter] = useState('');
        const [isEditChapter, setIsEditChapter] = useState([]);

        useEffect(() => {
            const initialOldNameArray = new Array(course.length).fill('');
            const initialDisplayArray = new Array(course.length).fill(false);
            const initialEditArray = new Array(course.length).fill(false);
            displayChapter ? setDisplayChapter([...displayChapter, false]) : setDisplayChapter(initialDisplayArray);
            isEditChapter ? setIsEditChapter([...isEditChapter, false]) : setIsEditChapter(initialEditArray);
        }, []);

        const handleToggleClick = (index) => {
            const newData = [...displayChapter];
            newData[index] = !newData[index];
            setDisplayChapter(newData);
        }

        const handleEditTitleChapter = (index) => {
            const newData = [...isEditChapter];
            newData[index] = true;
            setIsEditChapter(newData);
        }

        const handleSaveTitleChapter = (index) => {
            const newData = [...isEditChapter];
            newData[index] = false;
            setIsEditChapter(newData);
        }

        const handleIsAddChapter = () => {
            setIsAddChapter(true);
        }

        const handleNewSaveChapter = () => {
            setIsAddChapter(false);
            setNewChapter('');
        }

        const handleInputChange = (value) => {
            setNewChapter(value);
        };

        const handleEditNewName = (value, index) => {
            const newData = [...course];
            newData[index].name = value;
            setCourse(newData);
        }

        const handleCancelEditChapter = (index) => {
            const newData = [...course];
            const editTitleChapter = [...isEditChapter];

            newData[index] = prevChapterName[index];
            setCourse(newData);
            editTitleChapter[index] = false;
            setIsEditChapter(editTitleChapter);
        }

        const handleSaveEditChapter = (index) => {
            const editTitleChapter = [...isEditChapter];
            editTitleChapter[index] = false;
            setIsEditChapter(editTitleChapter);
            handleEditChapter(index);
        }
        console.log(course)
        return (
            <div className='w-full'>
                <div className='w-full mt-8'>
                    <button className='float-right medium-blue-button' onClick={handleIsAddChapter}>Thêm chương mới</button>
                    <div className="opacity-0">!!!</div>
                </div>
                <div className='mt-12'>
                    {
                        course && course.map((chapter, indexChapter) => (
                            <div key={indexChapter} className='w-full'>
                                <div className="w-full flex-between">
                                    <div className='w-7/8 flex mb-4 cursor-pointer'>
                                        <Image
                                            className={displayChapter[indexChapter] ? 'rotate-right-action' : 'rotate-left-action'}
                                            src='/assets/icons/downward.svg'
                                            alt="Downward"
                                            width={30}
                                            height={30}
                                            priority
                                            onClick={() => handleToggleClick(indexChapter)}
                                        />
                                        {
                                            isEditChapter && isEditChapter[indexChapter] ? (
                                                <input
                                                    type='text'
                                                    className='w-[40rem] text-xl font-medium border border-solid border-gray-300 p-1'
                                                    value={chapter.name}
                                                    onChange={(e) => handleEditNewName(e.target.value, indexChapter)}
                                                />
                                            ) : (
                                                <h3 className='text-xl font-medium p-1'>{chapter.name}</h3>
                                            )
                                        }
                                    </div>
                                    <div className='w-1/8 flex'>
                                        {
                                            isEditChapter && isEditChapter[indexChapter] ? (
                                                <>
                                                    <Image
                                                        className="mr-4 hover:cursor-pointer"
                                                        src='/assets/icons/complete_icon.svg'
                                                        alt="Downward"
                                                        width={18}
                                                        height={18}
                                                        priority
                                                        onClick={() => handleSaveEditChapter(indexChapter)}
                                                    />
                                                    <Image
                                                        className=" hover:cursor-pointer"
                                                        src='/assets/icons/cancel_icon.svg'
                                                        alt="Downward"
                                                        width={18}
                                                        height={18}
                                                        priority
                                                        onClick={() => handleCancelEditChapter(indexChapter)}
                                                    />
                                                </>
                                            ) : (
                                                <>
                                                    <Image
                                                        className="mr-4 hover:cursor-pointer"
                                                        src='/assets/icons/edit_icon.svg'
                                                        alt="Edit"
                                                        width={18}
                                                        height={18}
                                                        priority
                                                        onClick={() => handleEditTitleChapter(indexChapter)}
                                                    />
                                                    <Image
                                                        className=" hover:cursor-pointer"
                                                        src='/assets/icons/delete_icon.svg'
                                                        alt="Delete"
                                                        width={18}
                                                        height={18}
                                                        priority
                                                        onClick={() => handleDeleteChapter(indexChapter)}
                                                    />
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className={displayChapter[indexChapter] ? 'hidden-action' : ''}>
                                    <Link href={{ pathname: `/add-lessons/${courseId}`, query: { course: courseName, chapter: indexChapter } }} className="flex-center small-blue-button mb-4 ml-4">
                                        Thêm bài học
                                    </Link>
                                    {
                                        chapter && chapter.lessons && chapter.lessons.map((item, index) => (
                                            <Link key={index} href={{ pathname: `/edit-lesson/${courseId}/${item._id}`, query: { course: courseName } }} className='w-full flex mb-8 rounded-lg p-2 border border-solid border-grayflex-between hover:bg-gray-100'>
                                                <div className='flex'>
                                                    <Image
                                                        className=""
                                                        src={`/assets/images/${item.lessonId.videoURL ? 'video' : 'file'}.png`}
                                                        alt="FileType Picture"
                                                        width={70}
                                                        height={70}
                                                        priority
                                                    />
                                                    <h2 className='font-medium text-xl pl-4 mt-2'>{item.lessonId.title}</h2>
                                                    <h2 className='font-medium text-xl pl-4 mt-2'>{item._id}</h2>
                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <>
                        {
                            isAddChapter ? (
                                <div className="w-full flex-between">
                                    <div className='w-3/4 flex mb-4 cursor-pointer'>
                                        <Image
                                            className='rotate-left-action'
                                            src='/assets/icons/downward.svg'
                                            alt="Downward"
                                            width={30}
                                            height={30}
                                            priority
                                        />
                                        <input
                                            type='text'
                                            className='w-[600px] text-xl font-medium border px-1'
                                            value={newChapter}
                                            onChange={(e) => handleInputChange(e.target.value)}
                                        />
                                    </div>
                                    <div className='w-1/4 flex'>
                                        <button className="flex-center small-gray-button mb-4 ml-4" onClick={handleNewSaveChapter}>Hủy</button>
                                        <button className="flex-center small-blue-button mb-4 ml-4" onClick={() => handleAddNewChapter(newChapter, handleNewSaveChapter)}>Xác nhận</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                </>
                            )
                        }
                    </>
                </div>
            </div>
        )
    }

export default RenderLessons
