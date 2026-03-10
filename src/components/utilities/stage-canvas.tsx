import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import CanvasText from '@/components/utilities/canvas/canvas-text';
import type { StageSize } from '@/hooks/use-canvas';
import type Konva from 'konva';
import { ImageOffIcon } from 'lucide-react';
import type { RefObject } from 'react';
import { Image as KonvaImage, Layer, Stage } from 'react-konva';

interface StageCanvasProps {
    image: HTMLImageElement | null;
    textElements: Konva.Text[];
    stageSize: StageSize;
    onSelectText: (id: string) => void;
    stageRef: RefObject<Konva.Stage | null>;
    layerRef: RefObject<Konva.Layer | null>;
}

export default function StageCanvas({
    image,
    textElements,
    stageSize,
    onSelectText,
    stageRef,
    layerRef,
}: Readonly<StageCanvasProps>) {
    if (!image) {
        return (
            <Empty
                style={{ width: stageSize.width, height: stageSize.height }}
                className="border border-dashed bg-muted/30"
            >
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <ImageOffIcon aria-hidden />
                    </EmptyMedia>
                    <EmptyTitle>No Image Loaded</EmptyTitle>
                    <EmptyDescription>Please upload an image to start creating your meme.</EmptyDescription>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div
            className="overflow-hidden rounded-md border border-dashed"
            style={{ width: stageSize.width, height: stageSize.height }}
        >
            <Stage width={stageSize.width} height={stageSize.height} ref={stageRef}>
                <Layer ref={layerRef}>
                    <KonvaImage image={image} width={stageSize.width} height={stageSize.height} />

                    {textElements.map((el) => (
                        <CanvasText
                            key={el.id()}
                            props={el}
                            onSelect={() => onSelectText(el.id())}
                            stageRef={stageRef}
                            layerRef={layerRef}
                        />
                    ))}
                </Layer>
            </Stage>
        </div>
    );
}
