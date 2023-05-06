import { prisma } from "@/server/db";
import { Suspense, useState } from "react";
import ViewerLoading from "./loading";

type PageParams = {
    id: string,
}

async function getDocument(documentId: string) {
    const document = await prisma.textDocument.findUnique({ where: { id: documentId } });
    if (!document) {
        throw new Error('Could not find document.');
    }
    return document;
}

export default async function ViewerPage(
    { params }: { params: PageParams }
) {
    const document = await getDocument(params.id);
    const expirationDate = new Date(document.createdAt.setDate(document.createdAt.getDay() + 30));

    return (
        <Suspense fallback={<ViewerLoading />}>
            <div className="container mx-auto mt-16">
                <div className="flex items-center">
                    <h1 className="text-2xl flex-grow flex items-center">
                        Minecraft Server Log
                        <span className="text-sm bg-[hsl(209,18%,20%)] text-[#546778] rounded ml-2">{document.id}</span>
                    </h1>
                    <p>Uploaded {document.createdAt.toLocaleString()}</p>
                </div>
                <pre className="mt-8 font-mono text-sm whitespace-pre-wrap">
                    <code>
                        {document.source}
                    </code>
                </pre>
                {/* <textarea readOnly className="bg-[#1b2028] w-full h-96 mt-8 outline-none resize-none font-mono text-sm" value= /> */}
            </div>
            <footer className="flex flex-col items-center mt-16 border-t border-t-[#232930] py-2 text-[#3f4d5a]">
                <p className="text-sm">This log will be saved for 30 days since upload.</p>
                <p className="text-sm">(Expires: {expirationDate.toLocaleString()})</p>
            </footer>
        </Suspense>
    );
}