"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { abs } from "mathjs"
import { type ChangeEvent, useState } from "react"

export default function Bytes() {
    const [bytes, setBytes] = useState({
        byte: "",
        kilobyte: "",
        megabyte: "",
        gigabyte: "",
        terabyte: "",
        petabyte: "",
    })

    const scales = {
        byte: 1,
        kilobyte: 1e3,
        megabyte: 1e6,
        gigabyte: 1e9,
        terabyte: 1e12,
        petabyte: 1e15,
    } as const

    function handleChange(event: ChangeEvent<HTMLInputElement>, unit: keyof typeof bytes) {
        const value = event.target.value
        if (!/^-?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(value) && value !== "" && value !== "-") return

        const usesComma = value.includes(",")
        const normalized = value.replace(/,/g, ".")

        let num = parseFloat(normalized)
        if (isNaN(num)) num = 0

        const isValueEmpty = value === "" || value === "-"

        const fmt = (n: number) => {
            if (!isFinite(n)) return "∞"
            if (n === 0) return "0"

            const absolute = abs(n)
            if (absolute < 1e-6) {
                const out = n.toExponential(6).replace(/\+/, "")
                const trimmed = out.replace(/(\.\d*?[1-9])0+e/, "$1e").replace(/\.0+e/, "e")
                return usesComma ? trimmed.replace(".", ",") : trimmed
            }

            const out = n.toFixed(6).replace(/\.?0+$/, "")
            return usesComma ? out.replace(".", ",") : out
        }

        const unitIndex = Object.keys(bytes).indexOf(unit)
        if (unitIndex === -1) return // Safety check

        const newBytes: Record<string, string> = {}

        Object.keys(bytes).forEach(key => {
            if (key === unit) newBytes[key] = value
            else {
                const factor = scales[unit] / scales[key as keyof typeof scales]
                newBytes[key] = isValueEmpty ? "" : fmt(num * factor)
            }
        })

        setBytes(prev => ({
            ...prev,
            ...newBytes,
        }))
    }

    return (
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 last:row-span-full sm:grid-cols-2 md:grid-cols-3">
            {Object.keys(bytes).map(unit => (
                <div className="space-y-4" key={unit}>
                    <Label htmlFor={unit}>
                        {(() => {
                            switch (unit) {
                                case "byte":
                                    return "Bytes (B)"
                                case "kilobyte":
                                    return "Kilobytes (KB)"
                                case "megabyte":
                                    return "Megabytes (MB)"
                                case "gigabyte":
                                    return "Gigabytes (GB)"
                                case "terabyte":
                                    return "Terabytes (TB)"
                                case "petabyte":
                                    return "Petabytes (PB)"
                                default:
                                    return unit
                            }
                        })()}
                    </Label>
                    <Input
                        type="text"
                        id={unit}
                        name={unit}
                        value={bytes[unit as keyof typeof bytes]}
                        onChange={e => handleChange(e, unit as keyof typeof bytes)}
                        placeholder="0"
                        inputMode="decimal"
                        autoComplete="off"
                    />
                </div>
            ))}
        </div>
    )
}
