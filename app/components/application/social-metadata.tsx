import { Fragment } from 'react/jsx-runtime';

type OpenGraphMetadata = {
    title: string;
    description: string;
    url: string;
    site_name?: string;
    locale?: string;
    type?: string;
};

type TwitterMetadata = {
    card?: string;
    creator?: string;
    title: string;
    description: string;
};

type Props = {
    openGraph: OpenGraphMetadata;
    twitter: TwitterMetadata;
};

export default function SocialMetadata({ openGraph, twitter }: Readonly<Props>) {
    const openGraphMetadata = {
        title: openGraph.title,
        description: openGraph.description,
        url: openGraph.url,
        site_name: openGraph.site_name ?? openGraph.title,
        locale: openGraph.locale ?? 'en-US',
        type: openGraph.type ?? 'website',
    };

    const twitterMetadata = {
        card: twitter.card ?? 'summary',
        creator: twitter.creator ?? 'unknown',
        title: twitter.title,
        description: twitter.description,
    };

    return (
        <Fragment>
            {Object.entries(openGraphMetadata).map(([key, value]) => (
                <meta key={`og-${key}`} property={`og:${key}`} content={value} />
            ))}
            {Object.entries(twitterMetadata).map(([key, value]) => (
                <meta key={`twitter-${key}`} name={`twitter:${key}`} content={value} />
            ))}
        </Fragment>
    );
}
