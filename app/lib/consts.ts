import D00Icon from '~/components/icons/d00.icon';
import D10Icon from '~/components/icons/d10.icon';
import D12Icon from '~/components/icons/d12.icon';
import D20Icon from '~/components/icons/d20.icon';
import D4Icon from '~/components/icons/d4.icon';
import D6Icon from '~/components/icons/d6.icon';
import D8Icon from '~/components/icons/d8.icon';

// Navigation URLs
export const URLS = {
    utilities: [
        { title: 'Char. Counter', url: '/utilities/character-counter' },
        { title: 'Dice Roller', url: '/utilities/dice-roller' },
        { title: 'Lorem Ipsum Generator', url: '/utilities/lorem-ipsum' },
        { title: 'Meme Generator', url: '/utilities/meme-generator' },
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

// Dice Constants
export const DICE = [
    {
        label: 'D4',
        sides: 4,
        vector: D4Icon,
    },
    {
        label: 'D6',
        sides: 6,
        vector: D6Icon,
    },
    {
        label: 'D8',
        sides: 8,
        vector: D8Icon,
    },
    {
        label: 'D10',
        sides: 10,
        vector: D10Icon,
    },
    {
        label: 'D12',
        sides: 12,
        vector: D12Icon,
    },
    {
        label: 'D20',
        sides: 20,
        vector: D20Icon,
    },
    {
        label: 'D100',
        sides: 100,
        vector: D00Icon,
    },
] as const;

// App Constants
export const APP_NAME = 'Utilities Webapp';
export const APP_DEFAULT_TITLE = 'Utilities Webapp';
export const APP_DESCRIPTION = `Welcome to Utilities Webapp, your go-to platform for a variety of handy tools and utilities designed to make your life easier. Whether you need to perform quick calculations, convert units, or access other useful functionalities, we've got you covered.`;
export const APP_KEYWORDS = [
    'utilities',
    'webapp',
    'tools',
    'calculators',
    'converters',
    'productivity',
    'time management',
    'data analysis',
    'online tools',
    'handy utilities',
    'digital tools',
];
export const APP_URL = import.meta.env['VITE_APP_URL'] ?? 'https://utilities-webapp.vercel.app/';
