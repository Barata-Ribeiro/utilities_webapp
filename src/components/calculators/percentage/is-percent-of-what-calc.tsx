"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { type ChangeEvent, useId, useState } from "react"

export default function IsPercentOfWhatCalc() {
    const [value, setValue] = useState("")
    const [percentOf, setPercentOf] = useState("")
    const [result, setResult] = useState<number | null>(null)

    const componentName = IsPercentOfWhatCalc.name.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()

    const valueId = useId()
    const percentOfId = useId()
    const resultId = useId()

    function reset() {
        setValue("")
        setPercentOf("")
        setResult(null)
    }

    function handleCalculation(event: ChangeEvent<HTMLInputElement>) {
        const { name, value: raw } = event.target

        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(raw) && raw !== "" && raw !== "-") return
        const normalized = raw.replace(/,/g, ".")
        let inputNum = parseFloat(normalized)
        if (isNaN(inputNum)) inputNum = 0

        switch (name) {
            case "value": {
                setValue(raw)
                if (percentOf === "" || percentOf === "-") {
                    setResult(null)
                    return
                }
                const percentNum = parseFloat(percentOf.replace(/,/g, "."))
                if (isNaN(percentNum) || percentNum === 0) {
                    setResult(null)
                    return
                }
                const res = (inputNum * 100) / percentNum
                setResult(Number(res.toFixed(2)))
                break
            }
            case "percentOf": {
                setPercentOf(raw)
                if (raw === "" || raw === "-") {
                    setResult(null)
                    return
                }
                const percentNum = parseFloat(raw.replace(/,/g, "."))
                if (isNaN(percentNum) || percentNum === 0) {
                    setResult(null)
                    return
                }
                const valueNum = parseFloat(value.replace(/,/g, "."))
                if (isNaN(valueNum)) {
                    setResult(null)
                    return
                }
                const res = (valueNum * 100) / percentNum
                setResult(Number(res.toFixed(2)))
                break
            }
            default:
                break
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>X is p percent of what?</CardTitle>
                <CardDescription>Find out what number Y is, if X is p percent of Y.</CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor={valueId}>(X) is</Label>
                    <Input
                        id={valueId}
                        name="value"
                        placeholder="e.g. 50"
                        inputMode="decimal"
                        aria-label="Value"
                        aria-invalid={value === "-" ? "true" : undefined}
                        aria-describedby="value-help"
                        value={value}
                        onChange={handleCalculation}
                    />
                    <p id="value-help" className="sr-only">
                        Enter the value to find what percent of Y it is.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={percentOfId}>p% of what?</Label>
                    <Input
                        id={percentOfId}
                        name="percentOf"
                        inputMode="decimal"
                        placeholder="e.g. 30"
                        aria-invalid={percentOf === "-" ? "true" : undefined}
                        aria-describedby="of-help"
                        value={percentOf}
                        aria-label="Percent of value"
                        onChange={handleCalculation}
                    />
                    <p id="of-help" className="sr-only">
                        Enter the percent value without the percent sign, for example thirty should be 30.
                    </p>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor={resultId}>Result (Y)</Label>
                    <Input
                        id={resultId}
                        name="result"
                        placeholder="Result"
                        aria-readonly="true"
                        aria-label="Calculation result"
                        aria-describedby={`${componentName}-formula`}
                        className="font-bold"
                        value={result !== null ? String(Number(result.toFixed(2))) : ""}
                        readOnly
                    />
                </div>

                <Button variant="outline" onClick={reset} aria-label="Reset calculator">
                    Reset
                </Button>
            </CardContent>

            <CardFooter className="border-t pt-4">
                {result === null ? (
                    <p id={`${componentName}-formula`} className="text-muted-foreground text-sm font-medium">
                        y = (x ⋅ 100) / p
                    </p>
                ) : (
                    <p id={`${componentName}-formula`} className="text-muted-foreground text-sm font-medium">
                        {result} = ({value.replace(/,/g, ".")} ⋅ 100) / {percentOf.replace(/,/g, ".")}
                    </p>
                )}
                <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
                    {result !== null ? `Result is ${result}` : "No result"}
                </div>
            </CardFooter>
        </Card>
    )
}
