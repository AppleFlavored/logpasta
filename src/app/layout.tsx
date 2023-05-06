import './globals.css';
import { Poppins } from 'next/font/google';
import { BsGithub } from 'react-icons/bs';

export const metadata = {
    title: 'LogPasta',
    description: 'Share and troubleshoot Minecraft server logs!',
}

const poppins = Poppins({ subsets: ['latin'], weight: [ '400', '500', '600' ] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <nav className="flex items-center gap-4 w-full h-16 border-b border-b-[#232930] px-4">
                    LogPasta
                    <span className="flex-grow" />
                    <a href="/" className="bg-[#3571fe] p-2 border-b-2 border-b-[#034bc8] rounded ">New Upload</a>
                    <a href="https://github.com/AppleFlavored/logpasta"><BsGithub className="w-7 h-7" /></a>
                </nav>
                {children}
            </body>
        </html>
    );
}
