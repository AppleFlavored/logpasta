'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { ImSpinner2 } from 'react-icons/im';

export default function UploadContainer() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    const handleDrop = async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
            throw new Error('File upload error.');
        }

        const formData = new FormData();
        formData.append('file', acceptedFiles[0], acceptedFiles[0].name);

        setLoading(true);
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
            .then(res => res.json())
            .catch(_ => {
                setLoading(false);
                throw new Error('File upload failed.');
            });

        router.push(`/${res.uploadId}`)
    }

    return (
        <>
            { isLoading ? 
                <div className="flex items-center justify-center border-2 border-[#3571fe] border-dashed rounded h-48">
                    <ImSpinner2 className="w-8 h-8 fill-[#3571fe] animate-spin" />
                </div>
            :
                <Dropzone onDrop={handleDrop} maxFiles={1} maxSize={5e+6}>
                    {({getRootProps, getInputProps}) => (
                        <div className="border-2 border-[#2a333c] border-dashed rounded h-48 select-none" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="flex flex-col justify-center items-center w-full h-full text-[#3f4d5a]">
                                <h2 className="text-xl font-semibold">Drag and Drop</h2>
                                <div className="inline-flex items-center justify-center w-full">
                                    <hr className="w-64 h-px my-4 bg-[#272f37] border-0" />
                                    <span className="absolute px-3 -translate-x-1/2 bg-[#1b2028] left-1/2">or</span>
                                </div>
                                <p>Click to select a .log file</p>
                            </div>
                        </div>
                    )}
                </Dropzone>
            }
        </>
    );
}