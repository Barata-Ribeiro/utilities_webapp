import { type RouteConfig, index, prefix, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('/about', 'routes/about.tsx'),
    ...prefix('/converters', [index('routes/converters/index.tsx'), route('/bytes', 'routes/converters/bytes.tsx')]),
    route('/theme', 'routes/theme.tsx'),
    route('/sidebar', 'routes/sidebar.tsx'),
] satisfies RouteConfig;
