"use client"

import ButtonClipboard from "@/components/button-clipboard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useState } from "react"

const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz"
const NUMBER_CHARS = "0123456789"
const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{}|;:,.<>?/`~"

function generateRandomPassword(size: number, numbers: boolean, symbols: boolean) {
    let charSet = UPPERCASE_CHARS + LOWERCASE_CHARS
    if (numbers) charSet += NUMBER_CHARS
    if (symbols) charSet += SYMBOL_CHARS

    if (charSet.length === 0) return null

    const bytes = new Uint8Array(size)
    if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
        crypto.getRandomValues(bytes)
    } else {
        for (let i = 0; i < size; i++) bytes[i] = Math.floor(Math.random() * 256)
    }

    return Array.from(bytes)
        .map(b => charSet[b % charSet.length])
        .join("")
}

function charClass(ch: string) {
    if (/\d/.test(ch)) return cn`text-blue-500 dark:text-blue-400`
    if (/^[A-Za-z]$/.test(ch)) return ""
    return cn`text-primary`
}

export default function PasswordGenerator() {
    const [password, setPassword] = useState<string | null>(null)
    const [passSize, setPassSize] = useState(8)
    const [hasNumbers, setHasNumbers] = useState(true)
    const [hasSymbols, setHasSymbols] = useState(true)

    const generatePassword = useCallback((size: number, numbers: boolean, symbols: boolean) => {
        setPassword(generateRandomPassword(size, numbers, symbols))
    }, [])

    useEffect(() => {
        generatePassword(passSize, hasNumbers, hasSymbols)
    }, [generatePassword, hasNumbers, hasSymbols, passSize])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Password Generator</CardTitle>
                <CardDescription>Generate secure passwords for enhanced security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="pin-size" className="text-sm font-medium">
                        Password Length: {passSize}
                    </label>
                    <Slider
                        id="pin-size"
                        value={[passSize]}
                        onValueChange={value => setPassSize(value[0])}
                        min={8}
                        max={128}
                        step={1}
                    />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="inline-flex items-center justify-between gap-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Label htmlFor="has-numbers" className="text-sm font-medium">
                            Has Numbers
                        </Label>
                        <Switch
                            id="has-numbers"
                            checked={hasNumbers}
                            onCheckedChange={checked => setHasNumbers(checked)}
                        />
                    </div>

                    <div className="inline-flex items-center justify-between gap-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Label htmlFor="has-symbols" className="text-sm font-medium">
                            Has Symbols
                        </Label>
                        <Switch
                            id="has-symbols"
                            checked={hasSymbols}
                            onCheckedChange={checked => setHasSymbols(checked)}
                        />
                    </div>
                </div>

                <div className="flex w-full flex-col items-center rounded-md border p-4">
                    <p className="mb-2 max-w-full text-center font-mono text-2xl tracking-widest break-all">
                        {password
                            ? Array.from(password).map((ch, i) => (
                                  <span key={i} className={`${charClass(ch)} inline-block`} aria-hidden={false}>
                                      {ch}
                                  </span>
                              ))
                            : "••••••••"}
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex w-full items-center justify-between gap-2">
                <Button
                    type="button"
                    onClick={() => generatePassword(passSize, hasNumbers, hasSymbols)}
                    aria-label="Generate Password">
                    Refresh
                </Button>

                <ButtonClipboard size="default" variant="outline" content={password} />
            </CardFooter>
        </Card>
    )
}
