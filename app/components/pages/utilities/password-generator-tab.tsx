import { HashIcon, LightbulbIcon, RotateCcwKeyIcon } from 'lucide-react';
import MemorablePassword from '~/components/pages/utilities/pass-generators/memorable-password';
import PasswordGenerator from '~/components/pages/utilities/pass-generators/password-generator';
import PinGenerator from '~/components/pages/utilities/pass-generators/pin-generator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function PasswordGeneratorTab() {
    return (
        <Tabs defaultValue="password" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
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
