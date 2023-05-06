import { prisma } from '@/server/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const formData = await request.formData();
    if (!formData.has('file')) {
        return NextResponse.json({ error: 'Invalid upload request.' }, { status: 400 });
    }

    const file = formData.get('file') as File;
    if (file.size > 5e+6) {
        // Max file size: 5 MB (or 5e+6 bytes)
        return NextResponse.json({ error: 'File upload is too big!' }, { status: 400 });
    }

    const source = await file.text();
    const document = await prisma.textDocument.create({
        data: { source },
    });

    return NextResponse.json({
        uploadId: document.id
    }, { status: 200 });
}