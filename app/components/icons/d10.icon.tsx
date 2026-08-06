import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D10Icon = memo(
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
                viewBox="0 0 18742 18742"
            >
                <path
                    d="M9370.293 657.563 701.817 9350.909l8668.47 8693.346 8668.46-8687.901L9370.293 657.569z"
                    style={{ fill: backgroundFill }}
                />
                <path
                    d="M9370.287 7357.101 4829.185 9978.92 701.827 9375.773M9370.287 7357.101l4541.102 2621.819 4127.358-603.147M9370.287 880.838v6476.274"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.5,
                        strokeWidth: '445.68px',
                    }}
                />
                <path
                    d="m13911.394 9978.915-4541.102 8065.334L4829.19 9978.915"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.5,
                        strokeWidth: '445.68px',
                    }}
                />
                <path
                    d="m9370.287 657.563-8668.47 8668.47 8668.47 8668.47 8668.47-8668.47z"
                    style={{
                        fill: 'none',
                        stroke: mainStrokeColor,
                        strokeWidth: '668.55px',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                    }}
                />
                <path
                    d="m9370.287 11344.716 4541.102-2621.819 4127.358 603.147M9370.287 11344.716 4829.185 8722.897 701.827 9326.044M9370.287 17820.979v-6476.274"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '668.55px' }}
                />
                <path
                    d="M4829.181 8722.902 9370.283 657.568l4541.102 8065.334"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '668.55px' }}
                />
            </svg>
        );
    },
);

export default D10Icon;
