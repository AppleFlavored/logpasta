'use client';

import { DragEvent, useRef } from 'react';

export default function UploadContainer() {
    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
    }

    return (
        <div
            className="flex flex-col justify-center items-center border-2 border-[#272f37] border-dashed rounded h-48 select-none"
            onDrop={handleDrop}
        >
            <h2 className="text-[#35404b] text-xl font-semibold">Drag and Drop</h2>
            <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-4 bg-[#272f37] border-0" />
                <span className="absolute px-3 text-[#35404b] -translate-x-1/2 bg-[#1b2028] left-1/2">or</span>
            </div>
            <button className="bg-[#272f37] text-[hsl(210,5%,50%)] rounded p-2">Select a File</button>
        </div>
    );
}