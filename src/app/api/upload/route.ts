import { prisma } from '@/server/db';
import { NextResponse } from 'next/server';

const IPV4_REGEX = /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/g;
const IPV6_REGEX = /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/g;

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

    const source = (await file.text())
        .replaceAll(IPV4_REGEX, '#.#.#.#')
        .replaceAll(IPV6_REGEX, '#:#:#:#:#:#:#:#')
        .replaceAll(/\/home\/.*\//g, '/home/********/');
    const document = await prisma.textDocument.create({
        data: { source },
    });

    return NextResponse.json({
        uploadId: document.id
    }, { status: 200 });
}