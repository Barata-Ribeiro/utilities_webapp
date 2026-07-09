import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('/about', 'routes/about.tsx'),
    ...prefix('/calculators', [
        index('routes/calculators/index.tsx'),
        route('/bmi', 'routes/calculators/bmi.tsx'),
        route('/dates', 'routes/calculators/dates.tsx'),
        route('/gcf-and-lcm', 'routes/calculators/gcf-and-lcm.tsx'),
        route('/general', 'routes/calculators/general.tsx'),
        route('/percentage', 'routes/calculators/percentage.tsx'),
        route('/rule-of-three', 'routes/calculators/rule-of-three.tsx'),
    ]),
    ...prefix('/converters', [
        index('routes/converters/index.tsx'),
        route('/bytes', 'routes/converters/bytes.tsx'),
        route('/length', 'routes/converters/length.tsx'),
        route('/mass', 'routes/converters/mass.tsx'),
        route('/speed', 'routes/converters/speed.tsx'),
        route('/temperature', 'routes/converters/temperature.tsx'),
        route('/time', 'routes/converters/time.tsx'),
    ]),
    ...prefix('/programming', [
        index('routes/programming/index.tsx'),
        route('/base64-text-encode-decode', 'routes/programming/base64-text-encode-decode.tsx'),
        route('/base64-to-image', 'routes/programming/base64-to-image.tsx'),
        route('/image-to-base64', 'routes/programming/image-to-base64.tsx'),
        route('/text-hashing', 'routes/programming/text-hashing.tsx'),
    ]),
    ...prefix('/utilities', [index('routes/utilities/index.tsx')]),
    route('/theme', 'routes/theme.tsx'),
    route('/sidebar', 'routes/sidebar.tsx'),
] satisfies RouteConfig;
