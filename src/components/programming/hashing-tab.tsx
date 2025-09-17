import ShaEncrypt from "@/components/programming/hashing/sha-hashing"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HashingTab() {
    return (
        <Tabs defaultValue="sha-hashing" className="mx-auto w-full max-w-lg">
            <TabsList className="flex h-auto flex-wrap items-center justify-start space-y-1">
                <TabsTrigger value="sha-hashing">SHA Hashing</TabsTrigger>
            </TabsList>

            <TabsContent value="sha-hashing">
                <ShaEncrypt />
            </TabsContent>
        </Tabs>
    )
}
