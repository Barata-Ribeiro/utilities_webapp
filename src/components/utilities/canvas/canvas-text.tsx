import type Konva from 'konva';
import type { KonvaEventObject, Node } from 'konva/lib/Node';
import { Line } from 'konva/lib/shapes/Line';
import type { TextConfig } from 'konva/lib/shapes/Text';
import { useCallback } from 'react';
import { Text } from 'react-konva';

const GUIDELINE_OFFSET = 5;

type Snap = 'start' | 'center' | 'end';
interface SnappingEdges {
    vertical: {
        guide: number;
        offset: number;
        snap: Snap;
    }[];
    horizontal: {
        guide: number;
        offset: number;
        snap: Snap;
    }[];
}

interface CanvasTextProps {
    props: Node<TextConfig>;
    onSelect: () => void;
    stageRef: React.RefObject<Konva.Stage | null>;
    layerRef: React.RefObject<Konva.Layer | null>;
}

export default function CanvasText({ props, onSelect }: Readonly<CanvasTextProps>) {
    const attrs = props.getAttrs();

    const getLineGuideStops = (skipShape: Konva.Shape) => {
        const stage = skipShape.getStage();
        if (!stage) return { vertical: [], horizontal: [] };

        const vertical = [0, stage.width() / 2, stage.width()];
        const horizontal = [0, stage.height() / 2, stage.height()];

        stage.find('.text-node').forEach((guideItem) => {
            if (guideItem === skipShape) {
                return;
            }
            const box = guideItem.getClientRect();
            vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
            horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
        });

        return {
            vertical,
            horizontal,
        };
    };

    const getObjectSnappingEdges = useCallback((node: Konva.Shape): SnappingEdges => {
        const box = node.getClientRect();
        const absPos = node.absolutePosition();

        return {
            vertical: [
                {
                    guide: Math.round(box.x),
                    offset: Math.round(absPos.x - box.x),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.x + box.width / 2),
                    offset: Math.round(absPos.x - box.x - box.width / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.x + box.width),
                    offset: Math.round(absPos.x - box.x - box.width),
                    snap: 'end',
                },
            ],
            horizontal: [
                {
                    guide: Math.round(box.y),
                    offset: Math.round(absPos.y - box.y),
                    snap: 'start',
                },
                {
                    guide: Math.round(box.y + box.height / 2),
                    offset: Math.round(absPos.y - box.y - box.height / 2),
                    snap: 'center',
                },
                {
                    guide: Math.round(box.y + box.height),
                    offset: Math.round(absPos.y - box.y - box.height),
                    snap: 'end',
                },
            ],
        };
    }, []);

    const getGuides = useCallback(
        (
            lineGuideStops: ReturnType<typeof getLineGuideStops>,
            itemBounds: ReturnType<typeof getObjectSnappingEdges>,
        ) => {
            const resultV: {
                lineGuide: number;
                diff: number;
                snap: Snap;
                offset: number;
            }[] = [];

            const resultH: {
                lineGuide: number;
                diff: number;
                snap: Snap;
                offset: number;
            }[] = [];

            lineGuideStops.vertical.forEach((lineGuide) => {
                itemBounds.vertical.forEach((itemBound) => {
                    const diff = Math.abs(lineGuide - itemBound.guide);
                    if (diff < GUIDELINE_OFFSET) {
                        resultV.push({
                            lineGuide: lineGuide,
                            diff: diff,
                            snap: itemBound.snap,
                            offset: itemBound.offset,
                        });
                    }
                });
            });

            lineGuideStops.horizontal.forEach((lineGuide) => {
                itemBounds.horizontal.forEach((itemBound) => {
                    const diff = Math.abs(lineGuide - itemBound.guide);
                    if (diff < GUIDELINE_OFFSET) {
                        resultH.push({
                            lineGuide: lineGuide,
                            diff: diff,
                            snap: itemBound.snap,
                            offset: itemBound.offset,
                        });
                    }
                });
            });

            const guides: {
                lineGuide: number;
                offset: number;
                orientation: 'V' | 'H';
                snap: 'start' | 'center' | 'end';
            }[] = [];

            const minV = resultV.toSorted((a, b) => a.diff - b.diff)[0];
            const minH = resultH.toSorted((a, b) => a.diff - b.diff)[0];

            if (minV) {
                guides.push({
                    lineGuide: minV.lineGuide,
                    offset: minV.offset,
                    orientation: 'V',
                    snap: minV.snap,
                });
            }

            if (minH) {
                guides.push({
                    lineGuide: minH.lineGuide,
                    offset: minH.offset,
                    orientation: 'H',
                    snap: minH.snap,
                });
            }

            return guides;
        },
        [],
    );

    const drawGuides = useCallback((guides: ReturnType<typeof getGuides>, layer: Konva.Layer) => {
        guides.forEach((lg) => {
            if (lg.orientation === 'H') {
                const line = new Line({
                    points: [-6000, 0, 6000, 0],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layer.add(line);
                line.absolutePosition({
                    x: 0,
                    y: lg.lineGuide,
                });
            } else if (lg.orientation === 'V') {
                const line = new Line({
                    points: [0, -6000, 0, 6000],
                    stroke: 'rgb(0, 161, 255)',
                    strokeWidth: 1,
                    name: 'guid-line',
                    dash: [4, 6],
                });
                layer.add(line);
                line.absolutePosition({
                    x: lg.lineGuide,
                    y: 0,
                });
            }
        });
    }, []);

    const handleOnDragMove = useCallback(
        (e: Konva.KonvaEventObject<DragEvent>) => {
            const layer = e.target.getLayer();
            if (!layer) return;

            layer.find('.guid-line').forEach((l) => l.destroy());

            const lineGuideStops = getLineGuideStops(e.target as Konva.Shape);
            const itemBounds = getObjectSnappingEdges(e.target as Konva.Shape);

            const guides = getGuides(lineGuideStops, itemBounds);

            if (!guides.length) return;

            drawGuides(guides, layer);

            const absPos = e.target.absolutePosition();
            guides.forEach((lg) => {
                switch (lg.orientation) {
                    case 'V': {
                        absPos.x = lg.lineGuide + lg.offset;
                        break;
                    }
                    case 'H': {
                        absPos.y = lg.lineGuide + lg.offset;
                        break;
                    }
                }
            });
            e.target.absolutePosition(absPos);
        },
        [drawGuides, getGuides, getObjectSnappingEdges],
    );

    const handleOnDragEnd = useCallback(
        (evt: KonvaEventObject<DragEvent, Node<TextConfig>>): void => {
            const { x, y } = evt.target.attrs;
            const layer = evt.target.getLayer();

            layer?.find('.guid-line').forEach((l) => l.destroy());
            props.setAttrs({ x, y });
        },
        [props],
    );

    return (
        <Text
            draggable
            {...attrs}
            name="text-node"
            onClick={onSelect}
            onDragMove={handleOnDragMove}
            onDragEnd={handleOnDragEnd}
        />
    );
}
