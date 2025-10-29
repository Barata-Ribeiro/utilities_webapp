'use client';

import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

export default function CharCounter() {
    const [content, setContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [wordCount, setWordCount] = useState(0);
    const [lineCount, setLineCount] = useState(0);
    const [paragraphCount, setParagraphCount] = useState(0);

    useEffect(() => {
        function handleCharCount() {
            let words;
            const isLatin = content.replace(/\s+/g, '').match(/([^\x00-\x7F\u2013\u2014])+/gi);

            if (isLatin) words = content.match(/[\p{L}\p{N}]+/gu);
            else {
                words = content
                    .replace(/[;!:—/]/g, ' ')
                    .replace(/\.\s+/g, ' ')
                    .replace(/[^a-zA-Z\d\s&:,]/g, '')
                    .replace(/,(\D)/g, ' $1')
                    .match(/\S+/g);
            }

            setCharCount(content.replace(/\n/g, '').length);
            setWordCount(words ? words.length : 0);
            setLineCount(content.split(/\r\n|\r|\n/).length - (content === '' ? 1 : 0));

            const paragraphs = content.split(/\r\n|\r|\n/).filter((p) => p.trim() !== '');
            setParagraphCount(paragraphs.length);
        }

        handleCharCount();
    }, [content]);

    return (
        <div className="grid gap-4">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                    <div className="flex min-w-[96px] flex-col items-start rounded-md bg-muted/40 p-3">
                        <span className="text-xs text-muted-foreground">Characters</span>
                        <span className="text-lg font-medium">{charCount}</span>
                    </div>

                    <div className="flex min-w-[96px] flex-col items-start rounded-md bg-muted/40 p-3">
                        <span className="text-xs text-muted-foreground">Words</span>
                        <span className="text-lg font-medium">{wordCount}</span>
                    </div>

                    <div className="flex min-w-[96px] flex-col items-start rounded-md bg-muted/40 p-3">
                        <span className="text-xs text-muted-foreground">Lines</span>
                        <span className="text-lg font-medium">{lineCount}</span>
                    </div>

                    <div className="flex min-w-[96px] flex-col items-start rounded-md bg-muted/40 p-3">
                        <span className="text-xs text-muted-foreground">Paragraphs</span>
                        <span className="text-lg font-medium">{paragraphCount}</span>
                    </div>
                </div>
            </header>

            <Textarea
                placeholder="Type or paste your text here..."
                className="h-48 resize-none rounded-md border border-border p-3 focus:ring-2 focus:ring-ring/60 focus:outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
}
