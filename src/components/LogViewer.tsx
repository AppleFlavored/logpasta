'use client';

import { useMemo } from 'react';

type LogViewerProps = {
    source: string;
};

interface LineProps extends React.HTMLAttributes<HTMLElement> {
    [key: string]: any;
}

const getLineColor = (severity: string) => {
    switch (severity) {
        case 'INFO': return '#acb6bf';
        case 'WARN': return '#f2b179';
        case 'ERROR': return '#ce526d';
    }
}

const getLineStyleProps = (severity: string | undefined): LineProps => {
    return {
        style: {
            color: getLineColor(severity || 'INFO'),
        },
    };
}

function useLineStyles(source: string) {
    return useMemo(() => {
        let lastSeverity: string | undefined;
        const elements = source.split('\n').map((line, i) => {
            const timeMatch = line.match(/^\[.*\]/);
            const severityMatch = line.match(/\[.+\/([A-Z]+)\]:/);

            if (!timeMatch || !severityMatch) {
                return <span key={i} {...getLineStyleProps(lastSeverity)}>{line}</span>;
            }
            
            return <span key={i} {...getLineStyleProps(lastSeverity = severityMatch[1])}>{line}</span>;
        });

        return elements;
    }, [source]);
}

export default function LogViewer({ source }: LogViewerProps) {
    const lines = useLineStyles(source);

    return (
        <pre className="mt-8 font-mono text-sm whitespace-pre-wrap">
            <code>
                {lines}
            </code>
        </pre>
    );
}