import React from 'react';
import Image from 'next/image';

const LoadingState = ({ title, width = 20, height = 20 }) => {
    return (
        <div className="flex-center flex-row w-full">
            <Image
                src='/assets/icons/loading_icon.svg'
                width={width}
                height={height}
                alt="loading icon"
                className="animate-spin mr-2"
            />
            <p className="font-bold text-2xl text-center">{title}</p>
        </div>
    )
}

export default LoadingState