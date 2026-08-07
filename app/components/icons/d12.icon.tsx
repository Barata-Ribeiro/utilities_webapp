import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D12Icon = memo(
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
                viewBox="0 0 3466 3223"
            >
                <path
                    d="M1151.96 64.104 726.139 259.597l-642 1105-15 403 624.488 1144.516 458.333 228.484 1160.908 15 428.271-243.484 657-1075.404 15-487.112L2771.204 312.22 2312.868 64.104"
                    style={{ fill: backgroundFill }}
                />
                <path
                    d="m1734.627 1611.362 871.887 503.387M1734.627 1611.362 862.74 2114.749M1734.627 604.591v1006.771M1734.627 604.591l-1041-293.975M1734.627 604.591l1041-293.975M857.748 2119.291l294.212 1040.933M857.748 2119.291 62.502 1386.016M2607.907 2118.386l-294.213 1040.933M2607.907 2118.386l795.246-733.275"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.5,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="m1734.627 1611.362 871.887-503.387M1734.627 1611.362 862.74 1107.975M1734.627 2618.134V1611.363M1734.627 2618.134l-1041 293.979M1734.627 2618.134l1041 293.979M857.748 1103.435 1151.96 62.502M857.748 1103.435 62.502 1836.71M2607.907 1104.34 2313.694 63.407M2607.907 1104.34l795.246 733.275M62.502 1836.709v-450.692M1151.96 62.5 693.627 310.612M693.625 310.615 62.5 1386.015M3402.328 1838.315v-450.692M2312.87 64.106l458.333 248.112M2771.205 312.22l631.125 1075.404M62.502 1836.709l631.125 1075.404M1151.96 62.5l1160.908 1.604M2775.628 2912.111l626.7-1073.796M693.625 2912.111l458.333 248.112M2775.628 2912.111l-461.933 247.208M1151.96 3160.225l1161.733-.904"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
            </svg>
        );
    },
);

export default D12Icon;
