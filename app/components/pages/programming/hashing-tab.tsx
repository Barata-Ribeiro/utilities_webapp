import MdHashing from '~/components/pages/programming/hashing/md-hashing';
import ShaEncrypt from '~/components/pages/programming/hashing/sha-hashing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

export default function HashingTab() {
    return (
        <Tabs defaultValue="sha-hashing" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto! flex-wrap items-center justify-start gap-1">
                <TabsTrigger value="sha-hashing">SHA Hashing</TabsTrigger>
                <TabsTrigger value="md-hashing">MD Hashing</TabsTrigger>
            </TabsList>

            <TabsContent value="sha-hashing">
                <ShaEncrypt />
            </TabsContent>

            <TabsContent value="md-hashing">
                <MdHashing />
            </TabsContent>
        </Tabs>
    );
}
