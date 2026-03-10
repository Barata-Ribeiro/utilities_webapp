import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RotateCcwIcon, UploadIcon } from 'lucide-react';
import { useRef } from 'react';

interface CanvasUploadProps {
    onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
}

export default function CanvasUpload({ onImageUpload, onReset }: Readonly<CanvasUploadProps>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleReset = () => {
        onReset();
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <UploadIcon aria-hidden size={16} />
                    Upload Image
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Field orientation="responsive">
                    <Label htmlFor="file-upload">Choose Image (JPG/PNG)</Label>
                    <Input
                        type="file"
                        id="file-upload"
                        ref={fileInputRef}
                        accept="image/jpeg,image/png"
                        className="mt-1"
                        onChange={onImageUpload}
                    />
                </Field>
                <Button onClick={handleReset} variant="outline" className="w-full gap-2">
                    <RotateCcwIcon aria-hidden size={16} />
                    Reset Canvas
                </Button>
            </CardContent>
        </Card>
    );
}
