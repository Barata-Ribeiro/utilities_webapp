"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PasswordGenerator from "@/components/utilities/password-generator"
import PinGenerator from "@/components/utilities/pin-generator"
import { HashIcon, RotateCcwKeyIcon } from "lucide-react"

export default function PasswordPinTab() {
    return (
        <Tabs defaultValue="password" className="mx-auto w-full max-w-lg">
            <TabsList>
                <TabsTrigger value="password">
                    <RotateCcwKeyIcon aria-hidden size={16} />
                    Password
                </TabsTrigger>
                <TabsTrigger value="pin">
                    <HashIcon aria-hidden size={16} />
                    PIN
                </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
                <PasswordGenerator />
            </TabsContent>

            <TabsContent value="pin">
                <PinGenerator />
            </TabsContent>
        </Tabs>
    )
}
