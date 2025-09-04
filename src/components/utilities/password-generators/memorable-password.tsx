"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useCallback, useEffect, useRef, useState } from "react"

function charClass(ch: string) {
    if (/^[A-Za-z]$/.test(ch)) return ""
    return "text-primary"
}

export default function MemorablePassword() {
    const [password, setPassword] = useState<string | null>(null)
    const [passSize, setPassSize] = useState(3)
    const [firstLetterUppercase, setFirstLetterUppercase] = useState(true)
    const [useFullWords, setUseFullWords] = useState(true)
    const savedWord = useRef<string[] | null>(null)

    const shuffle = (arr: string[]) => {
        const a = arr.slice()
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
        }
        return a
    }

    const generateMemorablePassword = useCallback(
        async (size: number, firstLetterUppercase: boolean, useFullWords: boolean) => {
            if (!savedWord.current) {
                const res = await fetch("/words.json")
                if (!res.ok) {
                    alert("Failed to fetch word list")
                    return
                }
                savedWord.current = await res.json()
            }

            const pool = savedWord.current!
            const candidates = shuffle(pool).slice(0, size)

            const selectedWords = candidates.map(word => {
                let w = word
                const maxLen = w.length

                if (!useFullWords && maxLen > 3) {
                    const take = 3 + Math.floor(Math.random() * (maxLen - 3 + 1))
                    w = w.slice(0, take)
                }
                if (firstLetterUppercase) w = w.replace(/^\w/, c => c.toUpperCase())

                return w
            })

            setPassword(selectedWords.join("-"))
        },
        [],
    )

    const copyToClipboard = async () => {
        try {
            if (!password) return
            await navigator.clipboard.writeText(password)
        } catch {
            console.warn("Failed copying Password to clipboard")
        }
    }

    useEffect(() => {
        void generateMemorablePassword(passSize, firstLetterUppercase, useFullWords)
    }, [firstLetterUppercase, generateMemorablePassword, passSize, useFullWords])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Memorable Password Generator</CardTitle>
                <CardDescription>
                    This generator creates passwords using a combination of common words, making them easier to remember
                    while still being secure. Adjust the number of words to increase or decrease the password length.
                </CardDescription>
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
                        min={3}
                        max={15}
                        step={1}
                    />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                    <div className="inline-flex items-center justify-between gap-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Label htmlFor="first-letter-uppercase" className="text-sm font-medium">
                            First Letter Uppercase?
                        </Label>
                        <Switch
                            id="first-letter-uppercase"
                            checked={firstLetterUppercase}
                            onCheckedChange={checked => setFirstLetterUppercase(checked)}
                        />
                    </div>

                    <div className="inline-flex items-center justify-between gap-x-2 rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Label htmlFor="use-full-words" className="text-sm font-medium">
                            Use Full Words?
                        </Label>
                        <Switch
                            id="use-full-words"
                            checked={useFullWords}
                            onCheckedChange={checked => setUseFullWords(checked)}
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
                <div className="flex-1">
                    <Button
                        onClick={() => generateMemorablePassword(passSize, firstLetterUppercase, useFullWords)}
                        aria-label="Generate Password">
                        Generate
                    </Button>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={copyToClipboard}
                        disabled={!password}
                        aria-label="Copy Password to clipboard">
                        Copy
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
