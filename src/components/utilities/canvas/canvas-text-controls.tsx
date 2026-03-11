import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ColorPicker from '@/components/ui/color-picker';
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useUnmount } from '@/hooks/use-unmount';
import type Konva from 'konva';
import type { TextConfig } from 'konva/lib/shapes/Text';
import { debounce } from 'lodash';
import { ALargeSmallIcon, BoldIcon, ItalicIcon, TypeIcon, UnderlineIcon } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';

interface CanvasTextControlsProps {
    hasImage: boolean;
    onAddText: () => void;
    onUpdateText: (id: string, attributes: TextConfig) => void;
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
    const inputRef = useRef<HTMLInputElement>(null);

    const selectedText = textElements.find((el) => el.id() === selectedId);
    const selectedFontStyle = selectedText?.fontStyle() ?? 'normal';
    const selectedTextDecoration = selectedText?.textDecoration() ?? '';
    const selectedStyleValues = [
        ...(selectedFontStyle.includes('bold') ? ['bold'] : []),
        ...(selectedFontStyle.includes('italic') ? ['italic'] : []),
        ...(selectedTextDecoration.includes('underline') ? ['underline'] : []),
    ];
    const selectedTextColor = selectedText?.fill() as string | undefined;

    const debouncedTextUpdate = useMemo(
        () =>
            debounce((newValue: string) => {
                if (!selectedId) return;

                if (newValue.trim() === '') onDeleteText(selectedId);
                else onUpdateText(selectedId, { text: newValue });
            }, 300),
        [selectedId, onUpdateText, onDeleteText],
    );

    const handleChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            debouncedTextUpdate(event.target.value);
        },
        [debouncedTextUpdate],
    );

    const debouncedFontSizeUpdate = useMemo(
        () =>
            debounce((size: number) => {
                if (!selectedId) return;

                const clamped = Math.max(16, Math.min(200, size));
                onUpdateText(selectedId, { fontSize: clamped });
            }, 300),
        [selectedId, onUpdateText],
    );

    const updateFontSize = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            e.stopPropagation();
            const value = Number.parseInt(e.target.value, 10);
            if (Number.isNaN(value)) return;
            debouncedFontSizeUpdate(value);
        },
        [debouncedFontSizeUpdate],
    );

    const updateTextStyle = useCallback(
        (styles: string[]) => {
            if (!selectedId) return;

            const hasBold = styles.includes('bold');
            const hasItalic = styles.includes('italic');
            const hasUnderline = styles.includes('underline');

            let fontStyle: TextConfig['fontStyle'] = 'normal';
            if (hasBold && hasItalic) fontStyle = 'bold italic';
            else if (hasBold) fontStyle = 'bold';
            else if (hasItalic) fontStyle = 'italic';

            onUpdateText(selectedId, {
                fontStyle,
                textDecoration: hasUnderline ? 'underline' : '',
            });
        },
        [selectedId, onUpdateText],
    );

    useEffect(() => {
        if (selectedText && inputRef.current) inputRef.current.value = selectedText.text();
    }, [selectedText]);

    useUnmount(() => debouncedTextUpdate.cancel());
    useUnmount(() => debouncedFontSizeUpdate.cancel());

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

                    <CardContent className="flex flex-col gap-4">
                        {/* CONTENT */}
                        <InputGroup>
                            <InputGroupAddon align="inline-start">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InputGroupButton size="icon-xs" variant="ghost">
                                            <TypeIcon aria-hidden />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Text content</p>
                                    </TooltipContent>
                                </Tooltip>
                            </InputGroupAddon>
                            <InputGroupInput
                                key={selectedId}
                                id="text-content"
                                ref={inputRef}
                                defaultValue={selectedText?.text()}
                                onChange={handleChange}
                                placeholder="Enter text content"
                            />
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton
                                    variant="destructive"
                                    onClick={() => onDeleteText(selectedId)}
                                    aria-label="Delete text element"
                                >
                                    Delete
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>

                        <div className="flex flex-wrap items-center gap-2">
                            {/* FONT SIZE */}
                            <InputGroup className="w-auto">
                                <InputGroupAddon>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <InputGroupButton size="icon-xs" variant="ghost">
                                                <ALargeSmallIcon aria-hidden />
                                            </InputGroupButton>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Font size</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </InputGroupAddon>
                                <InputGroupInput
                                    key={`font-size-${selectedId}`}
                                    type="number"
                                    min={16}
                                    max={200}
                                    defaultValue={selectedText?.fontSize() ?? 16}
                                    onChange={updateFontSize}
                                />
                            </InputGroup>

                            {/* TEXT STYLE */}
                            <ToggleGroup
                                variant="outline"
                                type="multiple"
                                value={selectedStyleValues}
                                onValueChange={updateTextStyle}
                            >
                                <ToggleGroupItem value="bold" aria-label="Toggle bold" title="Bold">
                                    <BoldIcon aria-hidden />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="italic" aria-label="Toggle italic" title="Italic">
                                    <ItalicIcon aria-hidden />
                                </ToggleGroupItem>
                                <ToggleGroupItem value="underline" aria-label="Toggle underline" title="Underline">
                                    <UnderlineIcon aria-hidden />
                                </ToggleGroupItem>
                            </ToggleGroup>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <ColorPicker
                                        value={selectedTextColor ?? '#ffffff'}
                                        onChange={(color) => onUpdateText(selectedId, { fill: color })}
                                    />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Text color</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>
            )}
        </Fragment>
    );
}
