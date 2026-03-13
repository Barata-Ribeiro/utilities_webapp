'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CanvasExport from '@/components/utilities/canvas/canvas-export';
import CanvasTextControls from '@/components/utilities/canvas/canvas-text-controls';
import CanvasUpload from '@/components/utilities/canvas/canvas-upload';
import StageCanvas from '@/components/utilities/canvas/stage-canvas';
import { useCanvas } from '@/hooks/use-canvas';

export default function MemeGenerator() {
    const {
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
    } = useCanvas();

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Controls Panel */}
            <div className="space-y-4 lg:col-span-1">
                {/* Upload */}
                <CanvasUpload onImageUpload={handleImageUpload} onReset={resetCanvas} />

                {/* Text Controls */}
                <CanvasTextControls
                    hasImage={!!image}
                    onAddText={addTextElement}
                    onUpdateText={updateTextElement}
                    onDeleteText={deleteTextElement}
                    selectedId={selectedElementId}
                    textElements={textElements}
                />

                {/* Export Image */}
                <CanvasExport hasImage={!!image} onExport={exportCanvasAsImage} />
            </div>

            {/* Canvas Area */}
            <div className="lg:col-span-2">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Interactive Stage</CardTitle>
                        <CardDescription>
                            This is where the uploaded image and text elements will be displayed. You can select text
                            elements to edit their properties.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <StageCanvas
                            image={image}
                            textElements={textElements}
                            stageSize={stageSize}
                            onSelectText={setSelectedElementId}
                            stageRef={stageRef}
                            layerRef={layerRef}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
