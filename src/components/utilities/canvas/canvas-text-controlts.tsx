import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type Konva from 'konva';
import { debounce } from 'lodash';
import { TypeIcon } from 'lucide-react';
import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';

interface CanvasTextControlsProps {
    hasImage: boolean;
    onAddText: () => void;
    onUpdateText: (id: string, text: string) => void;
    onDeleteText: (id: string) => void;
    selectedId: string | null;
    textElements: Konva.Text[];
}

export default function CanvasTextControls({
    hasImage,
    onAddText,
    onUpdateText,
    onDeleteText,
    selectedId,
    textElements,
}: Readonly<CanvasTextControlsProps>) {
    const selectedText = textElements.find((el) => el.id() === selectedId);
    const inputRef = useRef<HTMLInputElement>(null);

    const deboudedUpdate = useMemo(
        () =>
            debounce((newValue: string) => {
                if (!selectedId) return;

                if (newValue.trim() === '') onDeleteText(selectedId);
                else onUpdateText(selectedId, newValue);
            }, 300),
        [selectedId, onUpdateText, onDeleteText],
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
            deboudedUpdate(event.target.value);
        },
        [deboudedUpdate],
    );

    useLayoutEffect(() => {
        if (inputRef.current) inputRef.current.value = selectedText?.text() ?? '';
    }, [selectedText]);

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TypeIcon aria-hidden size={16} />
                        Add Text
                    </CardTitle>
                    <CardDescription>
                        Add text elements to your canvas. You can select and edit them on the stage.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button className="w-full" onClick={onAddText} disabled={!hasImage}>
                        Add Text
                    </Button>
                </CardContent>
            </Card>

            {selectedId && selectedText && (
                <Card>
                    <CardHeader>
                        <CardTitle>Text Tools</CardTitle>
                        <CardDescription>
                            Edit the selected text element. You can change its content, font size, color, and more.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Field>
                            <Label htmlFor="text-content">Content</Label>
                            <Input
                                id="text-content"
                                ref={inputRef}
                                defaultValue={selectedText?.text()}
                                onChange={handleChange}
                                placeholder="Enter text content"
                            />
                        </Field>
                    </CardContent>
                </Card>
            )}
        </Fragment>
    );
}
