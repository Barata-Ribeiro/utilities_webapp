import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('/about', 'routes/about.tsx'),
    route('/theme', 'routes/theme.tsx'),
    route('/sidebar', 'routes/sidebar.tsx'),
] satisfies RouteConfig;
