'use client';

import { MdSearchOff } from 'react-icons/md';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="container mx-auto max-w-3xl mt-16">
            <div className="flex items-center rounded border border-red-400 gap-4 p-4">
                <MdSearchOff className="w-10 h-10 fill-red-400" />
                <div className="flex-grow">
                    <p className='font-semibold text-red-400'>This log file does not exist!</p>
                    Make sure the URL is correct or ask the uploader for a new link.
                </div>
                <a href="/" className='rounded bg-red-400 p-2'>Go Back</a>
            </div>
        </div>
    );
}