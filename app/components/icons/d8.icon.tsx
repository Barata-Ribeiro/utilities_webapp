import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D8Icon = memo(
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
                viewBox="0 0 2979 3306"
            >
                <path
                    d="M1489.117 62.5 62.5 772.14v1741.586l1426.617 729.385 1426.617-709.638V772.14"
                    style={{ fill: backgroundFill }}
                />
                <path
                    d="M1489.118 3243.112 62.501 772.137h2853.233z"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.5,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="M1489.118 62.5 62.501 2533.475h2853.233zM1489.117 62.5 62.5 772.137M2915.734 2533.474l-1426.617 709.637M62.5 2533.474l1426.617 709.637M1489.118 62.5l1426.617 709.637M62.5 2533.474V772.141M2915.734 2533.474V772.141"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
            </svg>
        );
    },
);

export default D8Icon;
