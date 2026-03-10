import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DownloadIcon } from 'lucide-react';

interface ExportControlsProps {
    hasImage: boolean;
    onExport: () => void;
}
export default function CanvasExport({ hasImage, onExport }: Readonly<ExportControlsProps>) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <DownloadIcon aria-hidden size={16} />
                    Export
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={onExport} disabled={!hasImage} className="w-full">
                    Download PNG
                </Button>
            </CardContent>
        </Card>
    );
}
