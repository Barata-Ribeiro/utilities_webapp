import { ImageResponse } from 'next/og';

export const SIZE = {
    width: 512,
    height: 512,
};

export const contentType = 'image/png';

export default function AppleIcon() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" clip-rule="evenodd" viewBox="0 0 482 482"><path fill="#e64919" d="M481.8822 120.4702v240.942c0 66.489-53.981 120.47-120.47 120.47h-240.942c-66.489 0-120.47-53.981-120.47-120.47v-240.942c0-66.489 53.981-120.47 120.47-120.47h240.942c66.489 0 120.47 53.981 120.47 120.47Z"/><circle cx="256" cy="256" r="194" fill="#ed7c5a" transform="translate(-17.69798 -17.69798) scale(1.01031)"/><path fill="none" stroke="#fafafa" stroke-width="34.8" d="m223.5392 210.8498-69.6-120.582M223.5392 271.0538l-69.6 120.582M240.9392 414.9518v-34.8M240.9392 66.9518v34.8M275.7392 240.9518h139.2M327.9392 391.6358l-17.4-30.102M327.9392 90.2678l-17.4 30.102M66.9392 240.9518h34.8M391.6232 327.9518l-30.102-17.4M391.6232 153.9518l-30.102 17.4M90.2552 327.9518l30.102-17.4M90.2552 153.9518l30.102 17.4"/><circle cx="12" cy="12" r="2" fill="none" stroke="#fafafa" stroke-width="2" transform="matrix(17.4 0 0 17.4 32.1392 32.1518)"/><circle cx="12" cy="12" r="8" fill="none" stroke="#fafafa" stroke-width="2" transform="matrix(17.4 0 0 17.4 32.1392 32.1518)"/></svg>`;

    return new ImageResponse(
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={`data:image/svg+xml,${encodeURIComponent(svg)}`}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
            }}
            width={SIZE.width}
            height={SIZE.height}
            alt="apple-touch-icon"
        />,
        { ...SIZE },
    );
}
