import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('/about', 'routes/about.tsx'),
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
        route('/text-hashing', 'routes/programming/text-hashing.tsx'),
    ]),
    route('/theme', 'routes/theme.tsx'),
    route('/sidebar', 'routes/sidebar.tsx'),
] satisfies RouteConfig;
