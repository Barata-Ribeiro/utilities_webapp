import type { SVGAttributes } from 'react';
import { memo } from 'react';

type Props = {
    backgroundFill?: string;
    mainStrokeColor?: string;
    shadowStrokeColor?: string;
} & SVGAttributes<SVGElement>;

const D6Icon = memo(
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
                viewBox="0 0 16571 18321"
            >
                <path
                    d="M8285.367 506.854 786.748 4774.397v8711.648l7498.619 4327.108 7498.619-4327.108V4831.796"
                    style={{ fill: backgroundFill }}
                />
                <path
                    d="m8281.553 9158.909-7494.81 4327.136M8281.553 9158.909l7494.81 4327.136M8281.553 504.654v8654.255"
                    style={{
                        fill: 'none',
                        fillRule: 'nonzero',
                        stroke: shadowStrokeColor,
                        strokeOpacity: 0.5,
                        strokeWidth: '459.33px',
                    }}
                />
                <path
                    d="M15776.363 4831.784s7.623 8543.068 7.623 8598.67M786.749 13428.657V4774.402M8281.553 9158.909l7494.81-4327.114M8281.553 9158.909 786.743 4774.397M8281.553 17813.158V9158.903M8281.553 17813.158l-7494.81-4327.114M15783.98 13486.034l-7502.433 4327.114M8281.553 504.654l7494.81 4327.136M8281.553 504.654 786.743 4774.397"
                    style={{ fill: 'none', fillRule: 'nonzero', stroke: mainStrokeColor, strokeWidth: '689.02px' }}
                />
            </svg>
        );
    },
);

export default D6Icon;
