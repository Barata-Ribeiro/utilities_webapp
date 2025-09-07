"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type ChangeEvent, useId, useState } from "react"

export default function IsWhatPercentOfCalc() {
    const [percentValue, setPercentValue] = useState("")
    const [ofValue, setOfValue] = useState("")
    const [result, setResult] = useState<number | null>(null)

    const componentName = IsWhatPercentOfCalc.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()

    const percentValueId = useId()
    const ofValueId = useId()
    const resultId = useId()

    function handleCalculation(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value) && value !== "" && value !== "-") return
        const normalized = value.replace(/,/g, ".")
        let num = parseFloat(normalized)
        if (isNaN(num)) num = 0

        switch (name) {
            case "percentValue": {
                setPercentValue(value)
                if (ofValue === "" || ofValue === "-") {
                    setResult(null)
                    return
                }
                const ofNum = parseFloat(ofValue.replace(/,/g, "."))
                if (isNaN(ofNum) || ofNum === 0) {
                    setResult(null)
                    return
                }
                const res = (num * 100) / ofNum
                setResult(res)
                break
            }
            case "ofValue": {
                setOfValue(value)
                if (percentValue === "" || percentValue === "-") {
                    setResult(null)
                    return
                }
                const percentNum = parseFloat(percentValue.replace(/,/g, "."))
                if (isNaN(percentNum) || num === 0) {
                    setResult(null)
                    return
                }
                const res = (percentNum * 100) / num
                setResult(res)
                break
            }
            default:
                break
        }
    }

    function reset() {
        setPercentValue("")
        setOfValue("")
        setResult(null)
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>X is what percent of Y?</CardTitle>
                <CardDescription>Calculate what percent X is of Y.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={percentValueId}>(X) is what percent</Label>
                    <Input
                        id={percentValueId}
                        name="percentValue"
                        placeholder="e.g. 60"
                        inputMode="decimal"
                        aria-label="Percent value"
                        aria-invalid={percentValue === "-" ? "true" : undefined}
                        aria-describedby="percent-help"
                        value={percentValue}
                        onChange={handleCalculation}
                    />
                    <p id="percent-help" className="sr-only">
                        Enter the percent value without the percent sign, for example twenty should be 20.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={ofValueId}>Of (Y)</Label>
                    <Input
                        id={ofValueId}
                        name="ofValue"
                        inputMode="decimal"
                        placeholder="e.g. 10"
                        value={ofValue}
                        aria-invalid={ofValue === "-" ? "true" : undefined}
                        aria-describedby="of-help"
                        aria-label="Base value"
                        onChange={handleCalculation}
                    />
                    <p id="of-help" className="sr-only">
                        Enter the base value to find what percent X is of Y.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={resultId}>Result (p)</Label>
                    <Input
                        id={resultId}
                        name="result"
                        placeholder="Result"
                        aria-readonly="true"
                        aria-label="Calculation result"
                        aria-describedby={`${componentName}-formula`}
                        className="font-bold"
                        defaultValue={result ?? ""}
                        readOnly
                    />
                </div>

                <Button variant="outline" onClick={reset} aria-label="Reset calculator">
                    Reset
                </Button>
            </CardContent>

            <CardFooter className="border-t pt-4">
                {!result ? (
                    <p id={`${componentName}-formula`} className="text-muted-foreground text-sm font-medium">
                        p = (x ⋅ 100) / y
                    </p>
                ) : (
                    <p id={`${componentName}-formula`} className="text-muted-foreground text-sm font-medium">
                        {result} = ({percentValue.replace(/,/g, ".")} ⋅ 100) / {ofValue.replace(/,/g, ".")}
                    </p>
                )}
                <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    {result !== null ? `Result is ${result}` : "No result"}
                </div>
            </CardFooter>
        </Card>
    )
}
