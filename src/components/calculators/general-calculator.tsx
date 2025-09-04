"use client"

import { cn } from "@/lib/utils"
import { evaluate, round } from "mathjs"
import { useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"

export default function GeneralCalculator() {
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const resultRef = useRef<HTMLDivElement>(null)

    const formStyles = cn`mx-auto my-0 grid max-w-7xl grid-cols-[1fr_auto] overflow-hidden rounded-md`
    const areaStyles = cn`bg-accent text-accent-foreground m-0 resize-none border-0 p-4 font-mono text-lg leading-6 text-balance outline-none focus:ring-0 focus-visible:ring-0`

    function isNumber(value: unknown) {
        if (typeof value === "number") return !Number.isNaN(value) && Number.isFinite(value)
        return false
    }

    function isBalanced(value: string) {
        const stack: string[] = []
        let balanced = true
        Array.from(value).forEach(char => {
            if (char === "(") stack.push(char)
            else if (char === ")") {
                if (stack.length === 0) {
                    balanced = false
                    return
                }
                stack.pop()
            }
        })

        return balanced && stack.length === 0
    }

    function roundNumber(value: number) {
        return round(value * 1000) / 1000
    }

    function handleCalculation() {
        if (!textAreaRef.current || !resultRef.current) return
        const validExpr = /^(\s*\(*\s*-?\d+(?:\.\d+)?\s*\)*\s*[+\-*/^]\s*)*\s*\(*\s*-?\d+(?:\.\d+)?\s*\)*\s*$/
        const calculator = textAreaRef.current
        const result = resultRef.current

        const lines = calculator.value.split(/\r?\n/).map(line => {
            const l = line.trim()
            if (l === "") return NaN
            if (!validExpr.test(l) || !isBalanced(l)) return NaN

            try {
                return evaluate(l)
            } catch (err: unknown) {
                if (err instanceof Error) console.error(`Failed to evaluate line "${l}": ${err.message}`)
                console.error(`Failed to evaluate line "${l}": ${err}`)
                return NaN
            }
        })

        const rows = lines.map(l => (isNumber(l) ? "<div>" + roundNumber(l) + "</div>" : "<div>---</div>")).join("")
        result.innerHTML = "<div>" + rows + "</div>"

        const total = roundNumber(lines.filter(isNumber).reduce((acc, cur) => acc + cur, 0))

        resultRef.current.innerHTML += `<div class="self-end" id="total">${total}</div>`

        localStorage.setItem("calculator", calculator.value)
    }

    useEffect(() => {
        if (!textAreaRef.current) return

        const saved = localStorage.getItem("calculator")

        if (saved && saved.trim() !== "") {
            textAreaRef.current.value = saved
            handleCalculation()
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <form className={formStyles}>
            <textarea
                ref={textAreaRef}
                className={twMerge(areaStyles, "!resize-none")}
                id="calculator-textarea"
                placeholder="Calculate here..."
                onChange={handleCalculation}
                rows={10}
                aria-placeholder="Calculate here..."></textarea>
            <div
                ref={resultRef}
                id="result"
                className={twMerge(areaStyles, "grid text-right")}
                role="status"
                aria-live="polite"></div>
        </form>
    )
}
