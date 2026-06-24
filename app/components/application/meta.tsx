import { memo } from 'react';

type Props = {
    title: string;
    description: string;
    keywords?: string[];
};

const Meta = memo(({ title, description, keywords }: Readonly<Props>) => {
    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords.join(', ')} />}
        </>
    );
});

export { Meta };
