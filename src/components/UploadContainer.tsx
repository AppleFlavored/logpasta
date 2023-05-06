'use client';

import { DragEvent, useRef } from 'react';

export default function UploadContainer() {
    const filesRef = useRef<FileList>();
    
    const handleDrop = (event: DragEvent) => {
        event.preventDefault();

        const files = event.dataTransfer.files;
        filesRef.current = files;
        for (let i = 0; i < files.length; i++) {
            console.log(files.item(i)?.type);
        }

        handleChange();
    }

    const handleChange = () => {
        alert('upload');
    }

    return (
        <form onDrop={handleDrop} className="border-2 border-[#2a333c] border-dashed rounded h-48 select-none">
            <input
                type="file"
                id="fileInput"
                accept="text/*"
                className="bg-[#272f37] text-[#798086] rounded p-2 opacity-0 w-0 h-0 absolute"
                onChange={handleChange}
                />
            <label htmlFor="fileInput" className="flex flex-col justify-center items-center w-full h-full text-[#3f4d5a]">
                <h2 className="text-xl font-semibold">Drag and Drop</h2>
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-64 h-px my-4 bg-[#272f37] border-0" />
                    <span className="absolute px-3 -translate-x-1/2 bg-[#1b2028] left-1/2">or</span>
                </div>
                <p>Click to select a .log file</p>
            </label>
        </form>
    );
}