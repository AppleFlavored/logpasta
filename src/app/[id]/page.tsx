import { prisma } from "@/server/db";
import { Suspense, useState } from "react";
import { MdLink } from 'react-icons/md';
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

    return (
        <Suspense fallback={<ViewerLoading />}>
            <div className="container mx-auto mt-16">
                <div className="flex items-center">
                    <h1 className="text-2xl flex-grow flex items-center">
                        Minecraft Server
                        <span className="text-sm bg-[hsl(209,18%,20%)] text-[#546778] rounded ml-2">{document.id}</span>
                    </h1>
                    <p>Uploaded {document.createdAt.toLocaleString()}</p>
                </div>
                <textarea readOnly className="bg-[#1b2028] w-full mt-8 outline-none resize-none font-mono text-sm">
                    {document.source}
                </textarea>
            </div>
        </Suspense>
    );
}