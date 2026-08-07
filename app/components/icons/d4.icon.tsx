import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D4Icon = memo(
    ({
        backgroundFill = '#3a5ba0',
        mainStrokeColor = '#f7c873',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        shadowStrokeColor = '#6f73aa',
        ...props
    }: Readonly<Props>) => {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                style={{
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    strokeMiterlimit: 10,
                }}
                viewBox="0 0 3433 2989"
            >
                <path d="M1716.227 148.294 62.5 2926.313h3307.454z" style={{ fill: backgroundFill }} />
                <path
                    d="M63.171 2926.104h3306.112m-1653.054-954.817 1457.862 842.071 195.192 112.746.671.208L1717.262 62.5l-.029 155.675-.337 1753.325m-.667-.213L287.8 2796.358 63.171 2926.104l-.671.208L1715.192 62.5l.367 1909"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
            </svg>
        );
    },
);

export default D4Icon;
