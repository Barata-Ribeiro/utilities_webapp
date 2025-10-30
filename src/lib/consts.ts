export const URLS = {
    utilities: [
        { title: 'Char. Counter', url: '/utilities/character-counter' },
        { title: 'Lorem Ipsum Generator', url: '/utilities/lorem-ipsum' },
        { title: 'Pass. Generator', url: '/utilities/password-generator' },
        { title: 'QR Code Generator', url: '/utilities/qrcode-generator' },
        { title: 'Roman Converter', url: '/utilities/roman-converter' },
        { title: 'Text To Speech', url: '/utilities/text-to-speech' },
        { title: 'URL Slug Generator', url: '/utilities/url-slug-generator' },
    ],

    converters: [
        { title: 'Bytes', url: '/converters/bytes' },
        { title: 'Length', url: '/converters/length' },
        { title: 'Mass', url: '/converters/mass' },
        { title: 'Speed', url: '/converters/speed' },
        { title: 'Temperature', url: '/converters/temperature' },
        { title: 'Time', url: '/converters/time' },
    ],

    calculators: [
        { title: 'BMI', url: '/calculators/bmi' },
        { title: 'Dates', url: '/calculators/dates' },
        { title: 'GCF and LCM', url: '/calculators/gcf-and-lcm' },
        { title: 'General', url: '/calculators/general' },
        { title: 'Percentage', url: '/calculators/percentage' },
        { title: 'Rule of Three', url: '/calculators/rule-of-three' },
    ],

    programming: [
        { title: 'Base64 Text Encode/Decode', url: '/programming/base64-text-encode-decode' },
        { title: 'Base64 to Image', url: '/programming/base64-to-image' },
        { title: 'Image to Base64', url: '/programming/image-to-base64' },
        { title: 'Text Hashing', url: '/programming/text-hashing' },
    ],
} as const;

export type NavCategory = keyof typeof URLS;
export type NavItem = (typeof URLS)[NavCategory][number];
