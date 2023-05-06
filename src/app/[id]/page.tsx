import { prisma } from "@/server/db";

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
        <div>
            <p className="text-[#3f4d5a]">{document.id}</p>
            <p className="text-[#3f4d5a]">{document.createdAt.toString()}</p>
            <textarea readOnly className="bg-[#1b2028] w-full mt-16">
                {document.source}
            </textarea>
        </div>
    );
}