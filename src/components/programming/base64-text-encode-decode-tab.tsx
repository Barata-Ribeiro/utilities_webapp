import Base64TextDecode from '@/components/programming/base64-text-handlers/base64-text-decode';
import Base64TextEncode from '@/components/programming/base64-text-handlers/base64-text-encode';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BrainIcon, NewspaperIcon } from 'lucide-react';

export default function Base64TextEncodeDecodeTab() {
    return (
        <Tabs defaultValue="base64-text-encode" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto flex-wrap items-center justify-start space-y-1">
                <TabsTrigger value="base64-text-encode" className="inline-flex items-center gap-x-2">
                    <NewspaperIcon aria-hidden size={16} />
                    Text Encode
                </TabsTrigger>
                <TabsTrigger value="base64-text-decode" className="inline-flex items-center gap-x-2">
                    <BrainIcon aria-hidden size={16} />
                    Text Decode
                </TabsTrigger>
            </TabsList>

            <TabsContent value="base64-text-encode">
                <Base64TextEncode />
            </TabsContent>

            <TabsContent value="base64-text-decode">
                <Base64TextDecode />
            </TabsContent>
        </Tabs>
    );
}
