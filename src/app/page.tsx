import UploadContainer from '@/components/UploadContainer';
import { MdShare, MdTroubleshoot, MdLock } from 'react-icons/md';

export default function Home() {
    return (
        <>
            <div className="container mx-auto max-w-3xl mt-16">
                <UploadContainer />
                <p className="text-center text-[#3f4d5a] text-sm mt-2">(Max file size: 5 MB)</p>
            </div>
            <div className="container mx-auto grid grid-cols-2 gap-16 max-w-4xl mt-16">
                <div className="text-center">
                    <h1 className="font-bold text-2xl flex items-center justify-center gap-x-2 mb-2"><MdShare />Share</h1>
                    <p>Let others view your Minecraft logs with the click of a link. Private information like IP addresses is censored.</p>
                </div>
                <div className="text-center">
                    <h1 className="font-bold text-2xl flex items-center justify-center gap-x-2 mb-2"><MdTroubleshoot />Troubleshoot</h1>
                    <p>LogPasta will automatically scan your logs and give solutions to known problems.</p>
                </div>
            </div>
        </>
    );
}
