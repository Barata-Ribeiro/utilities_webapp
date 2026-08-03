import { memo } from 'react';

type Icon = {
    rel?: string;
    src: string;
    sizes: string;
    type: string;
};

const PwaMetadata = memo(() => {
    const icons: Icon[] = [
        {
            rel: 'apple-touch-icon',
            src: '/icons/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
        },
        {
            src: '/icons/apple-touch-icon-180x180.png',
            sizes: '180x180',
            type: 'image/png',
        },
        { src: '/icons/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icons/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icons/pwa-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: '/icons/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ];

    return (
        <>
            <meta name="theme-color" content="#e64919" />
            {icons.map((icon) => (
                <link key={icon.src} rel={icon.rel ?? 'icon'} href={icon.src} sizes={icon.sizes} type={icon.type} />
            ))}
            <link rel="manifest" href="/manifest.json" />
        </>
    );
});

export default PwaMetadata;
