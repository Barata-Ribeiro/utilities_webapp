"use client"

import ButtonClipboard from "@/components/button-clipboard"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone"
import Image from "next/image"
import { Fragment, useState } from "react"

export default function ImageToBase64() {
    const [files, setFiles] = useState<File[] | undefined>()
    const [error, setError] = useState<Error | null>(null)
    const [base64, setBase64] = useState<string | null>(null)

    const options = [
        "Raw Base64",
        "Data URL",
        "CSS Background",
        "Markdown Image",
        "HTML Image Tag",
        "HTML Hyperlink",
        "HTML Download Link",
        "HTML Favicon",
    ]

    const handleDrop = (files: File[]) => {
        setFiles(files)

        if (files.length > 0) {
            const reader = new FileReader()
            reader.onload = e => {
                if (typeof e.target?.result === "string") setBase64(e.target?.result)
            }
            reader.readAsDataURL(files[0])
        }
    }

    return (
        <Fragment>
            <Dropzone
                className="max-w-4xl"
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                minSize={1024}
                accept={{
                    "image/png": [".png"],
                    "image/jpeg": [".jpg", ".jpeg"],
                    "image/webp": [".webp"],
                }}
                onDrop={handleDrop}
                onError={(error: Error) => setError(error)}
                src={files}>
                <DropzoneEmptyState />
                <DropzoneContent>
                    {base64 && (
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <div className="relative h-24 overflow-hidden rounded-md border max-sm:w-full sm:size-24">
                                <Image alt="Preview" className="flex-1 object-cover" quality={25} src={base64} fill />
                            </div>

                            <div className="flex-1">
                                {files && files.length > 0 && (
                                    <div className="text-sm">
                                        <div className="font-medium">
                                            {(files[0] as File & { path?: string }).path ?? files[0].name}
                                        </div>
                                        <div className="text-muted-foreground">Type: {files[0].type ?? "unknown"}</div>
                                        <div className="text-muted-foreground">
                                            Size: {(files[0].size / 1024).toFixed(1)} KB
                                        </div>
                                        {(files[0] as File & { relativePath?: string }).relativePath && (
                                            <div className="text-muted-foreground">
                                                Relative: {(files[0] as File & { relativePath?: string }).relativePath}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DropzoneContent>
            </Dropzone>

            {error && (
                <div
                    role="alert"
                    className="mt-4 w-full max-w-xl rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                    <h3 className="font-semibold">Upload error</h3>
                    <p>{error.message}</p>
                </div>
            )}

            {files && files.length > 0 && base64 && (
                <ul className="mt-4 w-full max-w-xl space-y-4">
                    {options.map((option, idx) => {
                        const reducedBase64 = base64.substring(0, 50).concat("...")
                        const key = option.toLowerCase().replaceAll(/\s+/g, "-").concat("-").concat(idx.toString())

                        let value = ""
                        let copyValue = ""
                        switch (option) {
                            case "Raw Base64":
                                value = reducedBase64.split(",")[1]
                                copyValue = base64.split(",")[1]
                                break
                            case "Data URL":
                                value = reducedBase64
                                copyValue = base64
                                break
                            case "CSS Background":
                                value = `background-image: url('${reducedBase64}');`
                                copyValue = `background-image: url('${base64}');`
                                break
                            case "Markdown Image":
                                value = `![Image](${reducedBase64})`
                                copyValue = `![Image](${base64})`
                                break
                            case "HTML Image Tag":
                                value = `<img src="${reducedBase64}" alt="Image" />`
                                copyValue = `<img src="${base64}" alt="Image" />`
                                break
                            case "HTML Hyperlink":
                                value = `<a href="${reducedBase64}">Link</a>`
                                copyValue = `<a href="${base64}">Link</a>`
                                break
                            case "HTML Download Link":
                                value = `<a href="${reducedBase64}" download>Download</a>`
                                copyValue = `<a href="${base64}" download>Download</a>`
                                break
                            case "HTML Favicon":
                                value = `<link rel="shortcut icon" href="${reducedBase64}" />`
                                copyValue = `<link rel="shortcut icon" href="${base64}" />`
                                break
                        }

                        return (
                            <li key={key} className="grid gap-2">
                                <Label>{option} (preview)</Label>
                                <div className="inline-flex items-center gap-x-2">
                                    <Input disabled readOnly aria-readonly defaultValue={value} />
                                    <ButtonClipboard size="icon" variant="secondary" content={copyValue} />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            )}
        </Fragment>
    )
}
