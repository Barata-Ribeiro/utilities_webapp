'use client';

import { calculateStageSize, loadImageFromFile } from '@/lib/utils';
import type Konva from 'konva';
import { Text, TextConfig } from 'konva/lib/shapes/Text';
import { ChangeEvent, useCallback, useRef, useState } from 'react';

export interface StageSize {
    width: number;
    height: number;
}

export const useCanvas = () => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [stageSize, setStageSize] = useState<StageSize>({ width: 600, height: 400 });
    const [textElements, setTextElements] = useState<Konva.Text[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const layerRef = useRef<Konva.Layer>(null);

    const handleImageUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const img = await loadImageFromFile(file);
            const newStageSize = calculateStageSize(img);
            setStageSize(newStageSize);
            setImage(img);
            setTextElements([]);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const addTextElement = useCallback(() => {
        const newText = new Text({
            id: `text-${Date.now()}`,
            name: 'object',
            text: 'New Text',
            x: stageSize.width / 2,
            y: stageSize.height / 2,
            fontSize: 40,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 2,
            fontFamily: 'Impact',
            fontStyle: 'normal',
            align: 'center',
        });

        setTextElements((prev) => [...prev, newText]);
        setSelectedElementId(newText.id());
    }, [stageSize]);

    const updateTextElement = useCallback((id: string, attributes: TextConfig) => {
        setTextElements((prev) =>
            prev.map((text) => {
                if (text.id() === id) text.setAttrs(attributes);
                return text;
            }),
        );
    }, []);

    const deleteTextElement = useCallback(
        (id: string) => {
            setTextElements((prev) => prev.filter((text) => text.id() !== id));
            if (selectedElementId === id) setSelectedElementId(null);
        },
        [selectedElementId],
    );

    const resetCanvas = useCallback(() => {
        setImage(null);
        setTextElements([]);
        setSelectedElementId(null);
        setStageSize({ width: 600, height: 400 });
    }, []);

    const exportCanvasAsImage = useCallback(async () => {
        if (!stageRef.current) return;

        await new Promise((resolve) => setTimeout(resolve, 150)); // Ensure all updates are rendered

        const uri = stageRef.current.toDataURL({
            pixelRatio: 2,
            mimeType: 'image/png',
        });

        const link = document.createElement('a');
        link.download = `image-${Date.now()}.png`;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        link.remove();
    }, []);

    return {
        image,
        textElements,
        selectedElementId,
        stageSize,
        stageRef,
        layerRef,
        setSelectedElementId,
        handleImageUpload,
        addTextElement,
        updateTextElement,
        deleteTextElement,
        resetCanvas,
        exportCanvasAsImage,
    };
};
