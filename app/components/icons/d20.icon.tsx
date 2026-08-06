import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D20Icon = memo(
    ({
        backgroundFill = '#3a5ba0',
        mainStrokeColor = '#f7c873',
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
                viewBox="0 0 2805 3247"
            >
                <path
                    d="M1411.167 57.01 62.501 863.8v1492.21l1339.683 761 1306.983-791 32.699-1462.21"
                    style={{ fill: backgroundFill }}
                />
                <path
                    d="m1402.182 3184.197-669.842-1160.2h1339.683z"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.2,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="M1402.182 863.8 732.34 2024h1339.683z"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.2,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="M732.342 2023.998 62.5 863.798h1339.683z"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.2,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="m2072.023 2023.998-669.842-1160.2h1339.683l-669.842 1160.2Z"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.2,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="M62.501 2382.897V863.801M2741.865 2382.897V863.801M1402.182 62.5 732.34 1222.7h1339.683z"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
                <path
                    d="m1402.182 2382.897-669.842-1160.2h1339.683z"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
                <path
                    d="M732.342 1222.698 62.5 2382.898h1339.683z"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
                <path
                    d="m2072.023 1222.698-669.842 1160.2h1339.683l-669.842-1160.2ZM732.342 1222.698 62.5 863.802M2072.023 1222.698l669.842-358.896M1402.182 2382.897v801.3M1402.182 62.5l1339.683 801.3M62.501 863.8 1402.184 62.5M1402.182 3184.197l1339.683-801.3M62.501 2382.897l1339.683 801.3"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
            </svg>
        );
    },
);

export default D20Icon;
