import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D00Icon = memo(
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
                viewBox="0 0 2734 3113"
            >
                <path
                    d="M1366.47 62.5 74.047 1267.174 62.5 1847.676l1304.379 1202.725 1304.379-1202.725v-576.197"
                    style={{ fill: backgroundFill }}
                />
                <path
                    d="m432.768 1431.428 935.837 1620.921 935.842-1620.921M2302.625 1432.933l-935.837-290.413M430.947 1432.933l935.837-290.413M2304.132 1431.428l358.721-164.254M432.768 1431.428 74.047 1267.174M1366.786 1105.402V65.956"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.5,
                        strokeWidth: '83.33px',
                    }}
                />
                <path
                    d="M2302.31 1683.424 1366.473 62.503 430.631 1683.424M432.453 1681.917l935.838 290.417M2304.132 1681.917l-935.837 290.417M430.947 1683.424 72.226 1847.678M2302.31 1683.424l358.721 164.254M1368.292 2009.45v1039.446M2661.031 1847.676 1366.785 3050.401M72.225 1847.676l1294.562 1202.725M62.5 1270.629 1366.471 62.504M2671.258 1271.479 1366.471 62.5M72.225 1847.676 62.5 1270.63M2661.532 1848.527l9.725-577.046"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '125px' }}
                />
            </svg>
        );
    },
);

export default D00Icon;
