import UploadContainer from '@/components/UploadContainer';
import { MdShare, MdTroubleshoot, MdLock } from 'react-icons/md';

export default function Home() {
    return (
        <>
            <div className="container mx-auto max-w-3xl mt-16">
                <h1></h1>
                <UploadContainer />
            </div>
            <div className="container mx-auto grid grid-cols-3 gap-16 max-w-4xl mt-16">
                <div className="text-center">
                    <h1 className="font-bold text-2xl flex items-center justify-center gap-x-2 mb-2"><MdShare />Share</h1>
                    <p>Let others view your Minecraft logs with the click of a link.</p>
                </div>
                <div className="text-center">
                    <h1 className="font-bold text-2xl flex items-center justify-center gap-x-2 mb-2"><MdTroubleshoot />Troubleshoot</h1>
                    <p>LogPasta will automatically scan your logs and give solutions to known problems.</p>
                </div>
                <div className="text-center">
                    <h1 className="font-bold text-2xl flex items-center justify-center gap-x-2 mb-2"><MdLock />Stay Private</h1>
                    <p>IP addresses, usernames, and UUIDs will be removed the moment you upload your logs.</p>
                </div>
            </div>
        </>
    );
}
