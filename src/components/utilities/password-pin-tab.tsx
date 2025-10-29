import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemorablePassword from '@/components/utilities/password-generators/memorable-password';
import PasswordGenerator from '@/components/utilities/password-generators/password-generator';
import PinGenerator from '@/components/utilities/password-generators/pin-generator';
import { HashIcon, LightbulbIcon, RotateCcwKeyIcon } from 'lucide-react';

export default function PasswordPinTab() {
    return (
        <Tabs defaultValue="password" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto flex-wrap items-center justify-start space-y-1">
                <TabsTrigger value="password">
                    <RotateCcwKeyIcon aria-hidden size={16} />
                    Password
                </TabsTrigger>
                <TabsTrigger value="memorable-password">
                    <LightbulbIcon aria-hidden size={16} />
                    Memorable
                </TabsTrigger>
                <TabsTrigger value="pin">
                    <HashIcon aria-hidden size={16} />
                    PIN
                </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
                <PasswordGenerator />
            </TabsContent>

            <TabsContent value="memorable-password">
                <MemorablePassword />
            </TabsContent>

            <TabsContent value="pin">
                <PinGenerator />
            </TabsContent>
        </Tabs>
    );
}
