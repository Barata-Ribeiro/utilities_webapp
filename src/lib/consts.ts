export const URLS = {
    utilities: [
        { title: "Char. Counter", url: "/utilities/character-counter" },
        { title: "Lorem Ipsum Generator", url: "/utilities/lorem-ipsum" },
        { title: "Pass. Generator", url: "/utilities/password-generator" },
        { title: "Roman Converter", url: "/utilities/roman-converter" },
        { title: "URL Slug Generator", url: "/utilities/url-slug-generator" },
        { title: "QR Code Generator", url: "/utilities/qrcode-generator" },
    ],

    converters: [
        { title: "Temperature", url: "/converters/temperature" },
        { title: "Length", url: "/converters/length" },
        { title: "Mass", url: "/converters/mass" },
        { title: "Speed", url: "/converters/speed" },
        { title: "Time", url: "/converters/time" },
        { title: "Bytes", url: "/converters/bytes" },
    ],

    calculators: [
        { title: "General", url: "/calculators/general" },
        { title: "BMI", url: "/calculators/bmi" },
        { title: "Percentage", url: "/calculators/percentage" },
        { title: "Rule of Three", url: "/calculators/rule-of-three" },
        { title: "Dates", url: "/calculators/dates" },
    ],
} as const

export type NavCategory = keyof typeof URLS
export type NavItem = (typeof URLS)[NavCategory][number]
